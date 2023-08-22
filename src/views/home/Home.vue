<template>
  <div class="pt-[60px]">
    <h1 class="text-gray-800 text-6xl font-bold text-center mb-2.5">Buy USDT in a few steps</h1>
    <h2 class="text-gray-800 text-2xl font-bold text-center mb-10">Safe. Fast. Easy</h2>
    <AgentSearch
      v-if="showAgentSearch && buyData"
      :data="buyData"
      @no-agent="noAgentsModalShow = true"
      @cancel="showAgentSearch = false"
    />
    <SellAgentSearch
      v-else-if="showSellAgentSearch && sellData"
      :data="sellData"
      @no-agent="noAgentsModalShow = true"
      @cancel="showSellAgentSearch = false"
    />
    <Form v-else @buy="buy($event)" @sell="sell($event)" @no-agent="noAgentsModalShow = true" />
    <div v-if="!showAgentSearch" class="flex items-center justify-center space-x-5 mb-[60px]">
      <img class="w-[50px] h-[31px]" src="@/assets/icons/home-page/visa.png" alt="">
      <img class="w-[40px] h-[31px]" src="@/assets/icons/home-page/mastercard.png" alt="">
      <img class="w-[100px] h-[20.69px]" src="@/assets/icons/home-page/iomoney.png" alt="">
      <img class="w-[54px] h-[16px]" src="@/assets/icons/home-page/mir.png" alt="">
      <img class="w-[61px] h-[26px]" src="@/assets/icons/home-page/apple.png" alt="">
      <img class="w-[66px] h-[26px]" src="@/assets/icons/home-page/google.png" alt="">
    </div>
    <NoAgentsModal :modal-open="noAgentsModalShow" @close-modal="noAgentsModalShow = false" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { usePaymentsStore } from '@/store/Payments'
import Form from './components/Form.vue'
import AgentSearch from './components/AgentSearch.vue'
import SellAgentSearch from './components/SellAgentSearch.vue'
import NoAgentsModal from '@/components/modals/NoAgentsModal.vue'

const paymentsStore = usePaymentsStore()
const noAgentsModalShow = ref<boolean>(false)
const showAgentSearch = ref<boolean>(false)
const showSellAgentSearch = ref<boolean>(false)
const buyData = ref<any>(null)
const sellData = ref<any>(null)

const buy = async (data: any) => {
  buyData.value = data
  const check = await paymentsStore.checkReadyToPay()
  if (check.available) {
    showAgentSearch.value = true
  }
}
const sell = async (data: any) => {
  sellData.value = data
  showSellAgentSearch.value = true
}
</script>