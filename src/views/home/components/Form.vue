<template>
  <div>
    <div class="w-[490px] p-[30px] relative bg-white border border-gray-200 rounded-[20px] mx-auto mb-10 space-y-6" style="box-shadow: 0px 4px 3px rgba(0, 0, 0, 0.07), 0px 2px 2px rgba(0, 0, 0, 0.06)">
      <div class="flex bg-gray-100 hover:bg-gray-200 rounded-lg transition p-1">
        <nav class="flex space-x-2 grow" aria-label="Tabs" role="tablist">
          <button type="button" class="grow hs-tab-active:bg-white hs-tab-active:text-gray-700 py-3 px-4 items-center bg-transparent text-sm hover:text-gray-700 font-medium rounded-md hover:hover:text-blue-600" :class="activeTab == 'buy' ? 'active bg-white text-blue-500' : 'text-gray-500'" @click="changeTab('buy')">
            Buy
          </button>
          <button type="button" class="grow hs-tab-active:bg-white hs-tab-active:text-gray-700 py-3 px-4 items-center bg-transparent text-sm hover:text-gray-700 font-medium rounded-md hover:hover:text-blue-600" :class="activeTab == 'sell' ? 'active bg-white text-blue-500' : 'text-gray-500'" @click="changeTab('sell')">
            Sell
          </button>
        </nav>
      </div>
      <template v-if="activeTab === 'buy'">
        <FiatInput v-model="buyAmount.fiat" :type="'sell'" :error="errors.fiat" @update:model-value="buyAmountUpdate('fiat', $event)" />
        <UsdtInput v-model="buyAmount.usdt" :type="'buy'" @update:model-value="buyAmountUpdate('usdt', $event)" />
      </template>
      <template v-if="activeTab === 'sell'">
        <UsdtInput v-model="sellAmount.usdt" :type="'sell'" :error="errors.usdt" @update:model-value="sellAmountUpdate('usdt', $event)" />
        <FiatInput v-model="sellAmount.fiat" :type="'buy'"  @update:model-value="sellAmountUpdate('fiat', $event)"/>
      </template>
      <DropdownPaymentMethod v-if="activeTab === 'buy'" :error="errors.paymentMethod" :height="'62px'" :top="true" @empty="$emit('no-agent')" @change="activePaymentMethod = $event" />
      <DropdownSellPaymentMethod v-if="activeTab === 'sell'" :error="errors.paymentMethod" :height="'62px'" :top="true" @change="activeSellPaymentMethod = $event" />
      <button
        v-if="activeTab === 'buy'"
        type="button"
        class="py-3 px-4 w-full flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 transition-all text-sm sm:p-5"
        @click="clickBuy"
      >
        Buy USDT
      </button>
      <button
        v-if="activeTab === 'sell'"
        type="button"
        class="py-3 px-4 w-full flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 transition-all text-sm sm:p-5"
        @click="clickSell"
      >
        Sell USDT
      </button>
      <div v-if="!token" class="absolute top-0 bottom-0 left-0 right-0 z-10" @click="openLoginModal" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/User'
import { useSettingsStore } from '@/store/Settings'
import UsdtInput from './UsdtInput.vue'
import FiatInput from './FiatInput.vue'
import DropdownPaymentMethod from '@/components/dropdown/DropdownPaymentMethod.vue'
import DropdownSellPaymentMethod from './DropdownSellPaymentMethod.vue'
import AuthController from '@/services/Auth'

const emit = defineEmits<{
  (e: 'no-agent'): void
  (e: 'buy', v: any): void
  (e: 'sell', v: any): void
}>()

/* data */
const activeTab = ref('buy');
const router = useRouter()
const route = useRoute()
const token = AuthController.getInstance().token
const settingsStore = useSettingsStore()
const userStore = useUserStore()
const { buy, sell } = storeToRefs(settingsStore)
const { user, client } = storeToRefs(userStore)
const activePaymentMethod = ref<any>(null)
const activeSellPaymentMethod = ref<any>(null)
const buyAmount = ref({
  fiat: '',
  usdt: '',
})
const sellAmount = ref({
  fiat: '',
  usdt: '',
})
const errors = ref({
  fiat: false,
  usdt: false,
  paymentMethod: false,
})
/* /data */

watch(route, (value) => {
  if(value.name === 'Buy' || value.name === 'Sell') {
    activeTab.value = value.name.toLocaleLowerCase()
  }
})
watch(client, (value) => {
  if(value) {
    token.value = localStorage.getItem('token')
  }
})

/* methods */
const changeTab = (type: string) => {
  activeTab.value = type
  router.push(type)
}
const openLoginModal = () => {
  userStore.openLoginModal()
}
const clickBuy = () => {
  errors.value.fiat = false
  errors.value.paymentMethod = false // @ts-ignore
  if (isNaN(parseFloat(buyAmount.value.fiat)) || parseFloat(buyAmount.value.fiat) < parseFloat(buy.value)) {
    errors.value.fiat = true
    return
  }
  if (!activePaymentMethod.value) {
    errors.value.paymentMethod = true
    return
  }
  const data = {
    amount: buyAmount.value.fiat,
    currency_id: user.value!.currency,
    psystem_id: activePaymentMethod.value.id,
  }
  emit('buy', data) 
}
const clickSell = () => {
  errors.value.usdt = false
  errors.value.paymentMethod = false
  if (isNaN(parseFloat(sellAmount.value.usdt)) || parseFloat(sellAmount.value.usdt) < 1) {
    errors.value.usdt = true
    return
  }
  if (!activeSellPaymentMethod.value) {
    errors.value.paymentMethod = true
    return
  }
  const data = {
    amount: sellAmount.value.usdt,
    requisite_id: activeSellPaymentMethod.value.id,
  }
  emit('sell', data) 
}
const buyAmountUpdate = (type: string, value: string) => {
  if (type === 'fiat') {
    if (value) { // @ts-ignore
      buyAmount.value.usdt = (Math.floor((parseFloat(value) / buy.value) * 100) / 100).toString()
    } else {
      buyAmount.value.usdt = ''
    }
  }
  if (type === 'usdt') {
    if (value) { // @ts-ignore
      buyAmount.value.fiat = (+(parseFloat(value) * buy.value).toFixed(2)).toString()
    } else {
      buyAmount.value.fiat = ''
    }
  }
}
const sellAmountUpdate = (type: string, value: string) => {
  if (type === 'fiat') {
    if (value) { // @ts-ignore
      sellAmount.value.usdt = (Math.floor((parseFloat(value) / sell.value) * 100) / 100).toString()
    } else {
      sellAmount.value.usdt = ''
    }
  }
  if (type === 'usdt') {
    if (value) { // @ts-ignore
      sellAmount.value.fiat = (+(parseFloat(value) * sell.value).toFixed(2)).toString()
    } else {
      sellAmount.value.fiat = ''
    }
  }
}
/* /methods */

onMounted(() => {
  if (route.name) {
    if (route.name === 'Sell') {
      activeTab.value = 'sell'
    }
  }
})
</script>