<template>
  <div>
    <div class="flex items-center justify-between mb-4">
      <div class="text-xl font-semibold text-gray-800">
        Order history
      </div>
      <div class="text-sm text-blue-500 cursor-pointer" @click="router.push('/order-history')">
        See all
      </div>
    </div>
    <div class="bg-white rounded-md border border-gray-200">
      <table class="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th scope="col" class="px-5 py-3 text-left text-xs font-medium text-gray-500">Type</th>
            <th scope="col" class="px-5 py-3 text-left text-xs font-medium text-gray-500">Date</th>
            <th scope="col" class="px-5 py-3 text-left text-xs font-medium text-gray-500">Fiat</th>
            <th scope="col" class="px-5 py-3 text-left text-xs font-medium text-gray-500">Crypto</th>
            <th scope="col" class="px-5 py-3 text-left text-xs font-medium text-gray-500">Status</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="operation in operations" :key="operation.id" class="hover:bg-gray-100">
            <td class="px-5 py-3 whitespace-nowrap text-sm font-medium text-gray-800">
              <svg v-if="operation.operationType === 'purchase'" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 10C20 12.6522 18.9464 15.1957 17.0711 17.0711C15.1957 18.9464 12.6522 20 10 20C7.34784 20 4.8043 18.9464 2.92893 17.0711C1.05357 15.1957 0 12.6522 0 10C0 7.34784 1.05357 4.8043 2.92893 2.92893C4.8043 1.05357 7.34784 0 10 0C12.6522 0 15.1957 1.05357 17.0711 2.92893C18.9464 4.8043 20 7.34784 20 10V10ZM10.625 5.625C10.625 5.45924 10.5592 5.30027 10.4419 5.18306C10.3247 5.06585 10.1658 5 10 5C9.83424 5 9.67527 5.06585 9.55806 5.18306C9.44085 5.30027 9.375 5.45924 9.375 5.625V9.375H5.625C5.45924 9.375 5.30027 9.44085 5.18306 9.55806C5.06585 9.67527 5 9.83424 5 10C5 10.1658 5.06585 10.3247 5.18306 10.4419C5.30027 10.5592 5.45924 10.625 5.625 10.625H9.375V14.375C9.375 14.5408 9.44085 14.6997 9.55806 14.8169C9.67527 14.9342 9.83424 15 10 15C10.1658 15 10.3247 14.9342 10.4419 14.8169C10.5592 14.6997 10.625 14.5408 10.625 14.375V10.625H14.375C14.5408 10.625 14.6997 10.5592 14.8169 10.4419C14.9342 10.3247 15 10.1658 15 10C15 9.83424 14.9342 9.67527 14.8169 9.55806C14.6997 9.44085 14.5408 9.375 14.375 9.375H10.625V5.625Z" fill="#5DD670"/>
              </svg>
              <svg v-else width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 10C20 12.6522 18.9464 15.1957 17.0711 17.0711C15.1957 18.9464 12.6522 20 10 20C7.34784 20 4.8043 18.9464 2.92893 17.0711C1.05357 15.1957 0 12.6522 0 10C0 7.34784 1.05357 4.8043 2.92893 2.92893C4.8043 1.05357 7.34784 0 10 0C12.6522 0 15.1957 1.05357 17.0711 2.92893C18.9464 4.8043 20 7.34784 20 10ZM5.625 9.375C5.45924 9.375 5.30027 9.44085 5.18306 9.55806C5.06585 9.67527 5 9.83424 5 10C5 10.1658 5.06585 10.3247 5.18306 10.4419C5.30027 10.5592 5.45924 10.625 5.625 10.625H14.375C14.5408 10.625 14.6997 10.5592 14.8169 10.4419C14.9342 10.3247 15 10.1658 15 10C15 9.83424 14.9342 9.67527 14.8169 9.55806C14.6997 9.44085 14.5408 9.375 14.375 9.375H5.625Z" fill="#ADB3BC"/>
              </svg>
            </td>
            <td class="px-5 py-3 whitespace-nowrap text-xs text-gray-800">{{ formatDate(operation.createdAt) }}</td>
            <td class="px-5 py-3 whitespace-nowrap text-xs text-gray-800">
              {{ operation.amount }}
              <span class="text-[10px]">{{ operation.currency.name }}</span>
            </td>
            <td class="px-5 py-3 whitespace-nowrap text-xs text-gray-800">
              {{ operation.amountUsd }} 
              <span class="text-[10px]">USDT</span>
            </td>
            <td class="px-5 py-3 whitespace-nowrap text-sm font-medium order-history-status">
              <div class="flex">
                <div class="status h-[18px] text-[10px] font-medium leading-none flex items-center justify-center rounded-full px-1.5" :class="operation.status.toLowerCase()">
                  {{ convertTuHumanStatus(operation.status) }}
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import dayjs from 'dayjs'
import { useUserStore } from '@/store/User'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()
const { operations } = storeToRefs(userStore)

const formatDate = (date: string) => {
  return dayjs(date).format('DD.MM.YYYY HH:mm:ss')
}
const convertTuHumanStatus = (status: string) => {
    let result = 'Undefined';
    switch (status) {
        case 'CASHED':
            result = 'На проверке';
            break;
        case 'CONFIRMED':
            result = 'Подтверждено';
            break;
        case 'CREATED':
            result = 'Поиск агента';
            break;
        case 'ACCEPTED':
            result = 'Ожидает оплаты';
            break;
        case 'REJECTED':
            result = 'Не подтверждено';
            break;
        case 'EXPIRED':
            result = 'Просрочено';
            break;
        case 'CANCELED':
            result = 'Отменено';
            break;
    }
    return result;
}

onMounted(async () => {
  await userStore.getOperations(1, 9)
})
</script>

<style>
.order-history-status .status {
  color: #007AFF;
}
.order-history-status .status.onappeal {
    color: #cf7529;
    background-color: #faeacc;
}

.order-history-status .status.confirmed {
    background-color: #eaf9f0;
    color: #32bf61;
}

.order-history-status .status.rejected {
    color: #ff3b30;
    background-color: #ffebeb;
}

.order-history-status .status.disputed {
    background-color: #e6f2ff;
}

.order-history-status .status.declined {
    color: #ff3b30;
    background-color: #ffebeb;
}

.order-history-status .status.expired {
    background-color: #818e95;
}

.order-history-status .status.canceled {
    background-color: #f3f4f5;
    color: #818E95;
}

.order-history-status .status.completed {
    background-color: #eaf9f0;
    color: #34c759;
}

.order-history-status .status.activated {
    background-color: #eaf9f0;
    color: #32bf61;
}
</style>