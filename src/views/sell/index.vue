<template>
  <div v-if="details" class="my-10">
    <div class="flex space-x-5">
      <Details :details="details" @confirm="confirm" @appeal="appeal" class="grow" />
      <Chat :msid="(route.params.id as string)" />
    </div>
    <Faq />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSalesStore } from '@/store/Sales'
import humps from 'lodash-humps-ts'
import Details from './components/Details.vue'
import Chat from './components/Chat.vue'
import Faq from './components/Faq.vue'

const route = useRoute()
const router = useRouter()
const salesStore = useSalesStore()
const details = ref<any>(null)
let checker: any = null

const confirm = async () => {
  const res = await salesStore.confirm({ msid: route.params.id as string })
  if (res) {
    details.value = res
  }
}
const appeal = async () => {
  const res = await salesStore.appeal({ msid: route.params.id as string })
  if (res) {
    const check = await salesStore.getSale(route.params.id as string)
    if (check) { 
      details.value = check
    }
  }
}
const startListening = () => {
  window.Echo.channel(localStorage.getItem('ltoken'))
    .listen('.SaleCashed', async (data: { payment: object }) => {
      details.value = humps(data.payment)
    })
  window.Echo.channel(localStorage.getItem('ltoken'))
    .listen('.SaleCashed', async (data: { payment: object }) => {
      details.value = humps(data.payment)
    })
}
const stopListening = () => {
  window.Echo.channel(localStorage.getItem('ltoken')).stopListening('.SaleCashed')
  window.Echo.channel(localStorage.getItem('ltoken')).stopListening('.SaleCanceled')
}

onMounted(async () => {
  const res = await salesStore.getSale(route.params.id as string)
  if (res) {
    details.value = res
    if (res.status !== 'CONFIRMED' && res.status !== 'CANCELED') {
      startListening()
      checker = setInterval(async() => {
        const check = await salesStore.getSale(route.params.id as string)
        if (check) { 
          details.value = check
        }
      }, 10000)
    }
  } else {
    router.push('/')
  }
})

onUnmounted(() => {
  clearInterval(checker)
  stopListening()
})
</script>