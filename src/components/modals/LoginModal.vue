<template>
  <Modal :id="'login-modal'" :modal-open="modalOpen" :maxWidth="'500px'" @close-modal="close">
    <div class="relative">
      <svg class="absolute right-5 top-5 cursor-pointer"  width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" @click="close">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M13.8179 12.0002L20.623 5.195C21.1257 4.69229 21.1257 3.87973 20.623 3.37703C20.1203 2.87432 19.3077 2.87432 18.805 3.37703L12 10.1822L5.19496 3.37703C4.69226 2.87432 3.87972 2.87432 3.37702 3.37703C2.87433 3.87973 2.87433 4.69229 3.37702 5.195L10.1821 12.0002L3.37702 18.8053C2.87433 19.308 2.87433 20.1206 3.37702 20.6233C3.62773 20.874 3.95686 21 4.28599 21C4.61512 21 4.94425 20.874 5.19496 20.6233L12 13.8181L18.805 20.6233C19.0557 20.874 19.3849 21 19.714 21C20.0431 21 20.3723 20.874 20.623 20.6233C21.1257 20.1206 21.1257 19.308 20.623 18.8053L13.8179 12.0002Z" fill="#ADB3BC"/>
      </svg>
      <KodMobiAuth
        v-if="modalOpen"
        class="border-0"
        ref="kmobiAuth"
        :base-url='baseUrl'
        :api-key='apiToken'
        @success='handleToken'
      />
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { KodMobiAuth } from "@kmobi/vue"
import { ref } from "vue"
import Modal from '@/components/Modal.vue'
import Auth from '@/services/Auth.js'

defineProps<{ modalOpen: boolean }>();

const emit = defineEmits<{ (e: 'close-modal'): void }>();

const kmobiAuth = ref<any>('')
const token = ref<string>('')
const apiToken = "05250330-216a-43c0-8304-d8efb5ba4440" // Your API token
const baseUrl = "https://api2.kod.mobi" // KodMobi API base url

const handleToken = async (tokenOBj: {token: string}) => {
  // Token for the Verify endpoint
  await Auth.getInstance().verify(tokenOBj.token)
  token.value = tokenOBj.token

  setTimeout(() => {
    close()
  }, 500)
}
const close = () => {
  emit('close-modal')
}
</script>