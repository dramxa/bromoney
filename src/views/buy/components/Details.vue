<template>
  <div class="pb-5 px-[30px] space-y-5">
    <Status :status="details.status" />
    <div class="space-y-1.5">
      <div class="flex items-center justify-between px-4 py-[13px]">
        <span class="text-xs font-semibold text-gray-600 uppercase">You pay</span>
        <span class="text-xl font-semibold text-gray-800">{{ details.amount }} {{ details.currency.abbr }}</span>
      </div>
      <hr class="border-gray-200" />
      <div class="flex items-center justify-between px-4 py-[13px]">
        <span class="text-xs font-semibold text-gray-600 uppercase">Payment method</span>
        <div class="flex items-center space-x-2">
          <img class="w-6 h-6" :src="details.psystemObj.imgPath" alt="">
          <span class="font-semibold text-gray-800">{{ details.psystemObj.name }}</span>
        </div>
      </div>
      <div class="flex items-center justify-between px-4 py-[13px]">
        <span class="text-xs font-semibold text-gray-600 uppercase">Requisites</span>
        <div class="flex items-center space-x-2">
          <span class="font-semibold text-gray-800">{{ details.requisites.address }}</span>
          <svg class="cursor-pointer" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" @click="copyData(details.requisites.address)">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.0909 5.33333H7.27273C6.20163 5.33333 5.33333 6.20163 5.33333 7.27273V13.0909C5.33333 14.162 6.20163 15.0303 7.27273 15.0303H13.0909C14.162 15.0303 15.0303 14.162 15.0303 13.0909V7.27273C15.0303 6.20163 14.162 5.33333 13.0909 5.33333ZM7.27273 4.36364C5.66608 4.36364 4.36364 5.66608 4.36364 7.27273V13.0909C4.36364 14.6976 5.66608 16 7.27273 16H13.0909C14.6976 16 16 14.6976 16 13.0909V7.27273C16 5.66608 14.6976 4.36364 13.0909 4.36364H7.27273Z" fill="#3B82F6"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M2.42424 0.969697C1.62092 0.969697 0.969697 1.62092 0.969697 2.42424V9.21212C0.969697 10.0154 1.62092 10.6667 2.42424 10.6667C2.69202 10.6667 2.90909 10.8837 2.90909 11.1515C2.90909 11.4193 2.69202 11.6364 2.42424 11.6364C1.08537 11.6364 0 10.551 0 9.21212V2.42424C0 1.08537 1.08537 0 2.42424 0H9.21212C10.551 0 11.6364 1.08537 11.6364 2.42424C11.6364 2.69202 11.4193 2.90909 11.1515 2.90909C10.8837 2.90909 10.6667 2.69202 10.6667 2.42424C10.6667 1.62092 10.0154 0.969697 9.21212 0.969697H2.42424Z" fill="#3B82F6"/>
          </svg>
        </div>
      </div>
      <div class="flex items-center justify-between px-4 py-[13px]">
        <span class="text-xs font-semibold text-gray-600 uppercase">Recipient</span>
        <div class="flex items-center space-x-2">
          <span class="font-semibold text-gray-800">{{ details.requisites.name }}</span>
          <svg class="cursor-pointer" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" @click="copyData(details.requisites.name)">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.0909 5.33333H7.27273C6.20163 5.33333 5.33333 6.20163 5.33333 7.27273V13.0909C5.33333 14.162 6.20163 15.0303 7.27273 15.0303H13.0909C14.162 15.0303 15.0303 14.162 15.0303 13.0909V7.27273C15.0303 6.20163 14.162 5.33333 13.0909 5.33333ZM7.27273 4.36364C5.66608 4.36364 4.36364 5.66608 4.36364 7.27273V13.0909C4.36364 14.6976 5.66608 16 7.27273 16H13.0909C14.6976 16 16 14.6976 16 13.0909V7.27273C16 5.66608 14.6976 4.36364 13.0909 4.36364H7.27273Z" fill="#3B82F6"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M2.42424 0.969697C1.62092 0.969697 0.969697 1.62092 0.969697 2.42424V9.21212C0.969697 10.0154 1.62092 10.6667 2.42424 10.6667C2.69202 10.6667 2.90909 10.8837 2.90909 11.1515C2.90909 11.4193 2.69202 11.6364 2.42424 11.6364C1.08537 11.6364 0 10.551 0 9.21212V2.42424C0 1.08537 1.08537 0 2.42424 0H9.21212C10.551 0 11.6364 1.08537 11.6364 2.42424C11.6364 2.69202 11.4193 2.90909 11.1515 2.90909C10.8837 2.90909 10.6667 2.69202 10.6667 2.42424C10.6667 1.62092 10.0154 0.969697 9.21212 0.969697H2.42424Z" fill="#3B82F6"/>
          </svg>
        </div>
      </div>
      <hr v-if="details.requisites.comment" class="border-gray-200" />
      <div v-if="details.requisites.comment" class="space-y-4 px-4 py-[13px]">
        <div class="text-xs font-semibold text-gray-600 uppercase">Comment</div>
        <div class="text-sm text-gray-800">{{ details.requisites.comment }}</div>
      </div>
      <hr class="border-gray-200" />
    </div>
    <div class="text-lg font-semibold text-gray-800">Transfer details</div>
    <div class="space-y-2.5">
      <div class="flex items-center justify-between text-sm text-gray-500">
        <span>Order number:</span>
        <span>#{{ details.id }}</span>
      </div>
      <div class="flex items-center justify-between text-sm text-gray-500">
        <span>Order time:</span>
        <span>{{ formatDate(details.acceptedAt) }}</span>
      </div>
      <!-- <div class="flex items-center justify-between text-sm text-gray-500">
        <span>Unit Price:</span>
        <span>79.34 ₽</span>
      </div> -->
      <div class="flex items-center justify-between text-sm text-gray-500">
        <span>Amount:</span>
        <span>{{ details.amountUsd }} USDT</span>
      </div>
    </div>
    <div v-if="details.status.toLowerCase() == 'accepted'" class="text-center text-xs text-gray-600">After transferring the funds, click on the "I Paid" button</div>
    <div v-if="details.status.toLowerCase() == 'accepted'" class="flex items-center space-x-6">
      <button class="h-[46px] grow rounded border border-gray-200 hover:border-gray-300 text-gray-500 font-semibold" @click="cancelPaymentModalShow = true">Cancel</button>
      <button class="h-[46px] grow rounded bg-blue-500 hover:bg-blue-600 text-white font-semibold" @click="$emit('payed')">I Paid</button>
    </div>
    <button v-else class="h-[46px] w-full rounded border border-gray-200 hover:border-gray-300 text-gray-500 font-semibold" @click="router.push('/order-history')">Close</button>
    <CancelPaymentModal :modalOpen="cancelPaymentModalShow" @cancel="$emit('cancel')" @close-modal="cancelPaymentModalShow = false" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { copy } from 'clipboard'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'
import toast from '@/components/toast'
import Status from './Status.vue'
import CancelPaymentModal from '@/components/modals/CancelPaymentModal.vue'

defineEmits<{
  (e: 'payed'): void
  (e: 'cancel'): void
}>()

defineProps<{
  details: any
}>()

const router = useRouter()
const cancelPaymentModalShow = ref<boolean>(false)

const copyData = (data: string) => {
  copy(data)
  toast.success('Copied')
}
const formatDate = (date: string) => {
  return dayjs(date).format('DD.MM.YYYY HH:mm:ss')
}
</script>