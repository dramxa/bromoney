<template>
  <div class="w-[490px] p-[30px] bg-white border border-gray-200 rounded-[20px] text-center mx-auto mb-10 space-y-6" style="box-shadow: 0px 4px 3px rgba(0, 0, 0, 0.07), 0px 2px 2px rgba(0, 0, 0, 0.06)">
    <div class="space-y-2.5">
      <div class="flex items-center justify-center">
        <svg width=100 height=100 class="transform -rotate-90">
          <circle 
            style="transition: all .8s;"
            class="text-blue-500" cy=50 cx=50 r=40 fill=transparent stroke="currentColor" stroke-width="5" stroke-linecap="round"
            :stroke-dasharray="circumference"
            :stroke-dashoffset="circumference - percent / 100 * circumference"
          />
        </svg>
        <span class="absolute text-gray-800">{{ outputTimer() }}</span>
      </div>
      <div class="text-2xl font-bold text-gray-800">Agent search</div>
      <div class="text-sm font-medium text-gray-600">
        He will accept the money to his bank card and transfer it<br />
        to your account
      </div>
    </div>
    <div class="text-sm text-gray-400">Usually it takes no more than 1 min</div>
    <button class="h-[46px] w-full flex items-center justify-center rounded-md border border-gray-200 hover:border-gray-300 text-gray-800 text-[15px] font-semibold" @click="cancel">
      Cancel
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onUnmounted } from 'vue'
import { useSalesStore } from '@/store/Sales'
import { useRouter } from 'vue-router'
import humps from 'lodash-humps-ts'

const emit = defineEmits<{
  (e: 'no-agent'): void
  (e: 'cancel'): void
}>()

const props = defineProps<{ data: any }>()

const salesStore = useSalesStore()
const router = useRouter()
const circumference = ref<number>(2 * 22 / 7 * 40)
const percent = ref<number>(50)
const timer = ref<number>(60)
const defaultTimer = 60
const msid = ref<string>('')
let checker: number | null = null

watch(timer, (value: number) => {
  if (value > 1) {
    setTimeout(() => {
      setTimer()
    }, 1000)
  } else {
    timer.value = 0
    percent.value = 0
    emit('no-agent')
    cancel()
  }
})

const setTimer = () => {
  timer.value -= 1
  percent.value = Math.round(timer.value / defaultTimer * 100)
}
const outputTimer = () => {
  const time = timer.value
  const minutes = Math.floor(time / 60)
  const seconds = (time % 60).toString().padStart(2, "00")

  return `${minutes}:${seconds}`;
}
const cancel = () => {
  emit('cancel')
  salesStore.cancel({ msid: msid.value })
  if(checker) clearInterval(checker)
}

onMounted(async () => {
  try {
    const res = await salesStore.create(props.data)
    if (res) {
      msid.value = res.msid
      timer.value = defaultTimer
      setTimer()
      checker = setInterval(async () => {
        const check = await salesStore.getSale(msid.value)
        if (check.status == 'ACCEPTED') {
          router.push(`/sell/${msid.value}`)
        }
      }, 20000)
      window.Echo.channel(localStorage.getItem('ltoken'))
        .listen('.SaleAccepted', async (data: { payment: object }) => {
            const payment = humps(data.payment)
            if(payment.status === 'ACCEPTED') {
              if(checker) clearInterval(checker)
              router.push(`/sell/${msid.value}`)
              window.Echo.channel(localStorage.getItem('ltoken')).stopListening('.SaleAccepted')
            }
        })
    } else {
      emit('cancel')
    }
  } catch (e) {
    console.error(e)
    emit('no-agent')
    emit('cancel')
  }
  
})

onUnmounted(() => {
  if(checker) clearInterval(checker)
})
</script>