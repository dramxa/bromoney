<template>
  <div class="py-10">
    <div class="text-2xl font-bold text-gray-800 mb-6">
      Order history
    </div>
    <div v-if="loading" class="min-h-[30vh] flex items-center justify-center">
      <Loader :size="'40px'" />
    </div>
    <div v-else class="bg-white rounded-md border border-gray-200">
      <table class="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th scope="col" class="px-5 py-3 text-left text-xs font-medium text-gray-500">Type</th>
            <th scope="col" class="px-5 py-3 text-left text-xs font-medium text-gray-500">Date</th>
            <th scope="col" class="px-5 py-3 text-left text-xs font-medium text-gray-500">Fiat</th>
            <th scope="col" class="px-5 py-3 text-left text-xs font-medium text-gray-500">Price</th>
            <th scope="col" class="px-5 py-3 text-left text-xs font-medium text-gray-500">Crypto</th>
            <th scope="col" class="px-5 py-3 text-left text-xs font-medium text-gray-500">Agent</th>
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
              {{ calculatePrice(operation.amount, operation.amountUsd) }}
              <span class="text-[10px]">{{ operation.currency.name }}</span>
            </td>
            <td class="px-5 py-3 whitespace-nowrap text-xs text-gray-800">
              {{ operation.amountUsd }} 
              <span class="text-[10px]">USDT</span>
            </td>
            <td class="px-5 py-3 whitespace-nowrap text-xs text-gray-800 flex items-center">
              <div v-if="operation.account" class="flex items-center cursor-pointer" @click="goToOperation(operation.operationType, operation.msid)">
                <svg class="mr-2.5" width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_3608_120743)">
                    <path d="M5.33203 8C5.33203 8.26522 5.22667 8.51957 5.03914 8.70711C4.8516 8.89464 4.59725 9 4.33203 9C4.06681 9 3.81246 8.89464 3.62492 8.70711C3.43739 8.51957 3.33203 8.26522 3.33203 8C3.33203 7.73478 3.43739 7.48043 3.62492 7.29289C3.81246 7.10536 4.06681 7 4.33203 7C4.59725 7 4.8516 7.10536 5.03914 7.29289C5.22667 7.48043 5.33203 7.73478 5.33203 8ZM9.33203 8C9.33203 8.26522 9.22667 8.51957 9.03914 8.70711C8.8516 8.89464 8.59725 9 8.33203 9C8.06681 9 7.81246 8.89464 7.62492 8.70711C7.43739 8.51957 7.33203 8.26522 7.33203 8C7.33203 7.73478 7.43739 7.48043 7.62492 7.29289C7.81246 7.10536 8.06681 7 8.33203 7C8.59725 7 8.8516 7.10536 9.03914 7.29289C9.22667 7.48043 9.33203 7.73478 9.33203 8ZM12.332 9C12.5972 9 12.8516 8.89464 13.0391 8.70711C13.2267 8.51957 13.332 8.26522 13.332 8C13.332 7.73478 13.2267 7.48043 13.0391 7.29289C12.8516 7.10536 12.5972 7 12.332 7C12.0668 7 11.8125 7.10536 11.6249 7.29289C11.4374 7.48043 11.332 7.73478 11.332 8C11.332 8.26522 11.4374 8.51957 11.6249 8.70711C11.8125 8.89464 12.0668 9 12.332 9Z" fill="#3B82F6"/>
                    <path d="M2.49703 15.803L2.51703 15.799C4.34703 15.436 5.46503 14.957 5.98503 14.694C6.75062 14.8982 7.53968 15.0011 8.33203 15C12.75 15 16.332 11.866 16.332 8C16.332 4.134 12.75 1 8.33203 1C3.91403 1 0.332031 4.134 0.332031 8C0.332031 9.76 1.07503 11.37 2.30203 12.6C2.21619 13.3901 2.04038 14.1678 1.77803 14.918L1.77503 14.929C1.70047 15.1439 1.6191 15.3563 1.53103 15.566C1.45203 15.752 1.60503 15.96 1.80403 15.928C2.03569 15.8901 2.26672 15.8484 2.49703 15.803ZM3.29703 12.695C3.31104 12.5486 3.29258 12.4009 3.24297 12.2625C3.19336 12.124 3.11383 11.9982 3.01003 11.894C1.95003 10.83 1.33203 9.468 1.33203 8C1.33203 4.808 4.33603 2 8.33203 2C12.328 2 15.332 4.808 15.332 8C15.332 11.193 12.328 14 8.33203 14C7.62713 14.001 6.92514 13.9096 6.24403 13.728C6.00601 13.6642 5.75282 13.6906 5.53303 13.802C5.14603 13.998 4.29303 14.372 2.89903 14.695C3.09351 14.0421 3.22675 13.3726 3.29703 12.695Z" fill="#3B82F6"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_3608_120743">
                      <rect width="16" height="16" fill="white" transform="translate(0.332031)"/>
                    </clipPath>
                  </defs>
                </svg>
                {{ operation.account }}
              </div>
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
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import dayjs from 'dayjs'
import { useUserStore } from '@/store/User'
import { useRouter } from 'vue-router'
import Loader from '@/components/Loader.vue'

const userStore = useUserStore()
const { operations } = storeToRefs(userStore)
const router = useRouter()
const loading = ref<boolean>(false)

const calculatePrice = (amount: number, amountUsdt: number) => {
  const calculate = amount / amountUsdt
  return Math.floor(calculate * 100) / 100
}
const goToOperation = (type: string, msid: string) => {
  if (type === 'purchase') router.push(`/buy/${msid}`)
  if (type === 'sale') router.push(`/sell/${msid}`)
}
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
  loading.value = true
  await userStore.getOperations(1, 10)
  loading.value = false
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