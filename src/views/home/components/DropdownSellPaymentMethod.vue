<template>
  <div class="relative inline-flex w-full">
    <div class="w-full">
      <label class="text-[15px] text-gray-700">Payment method</label>
      <div
        ref="trigger"
        class="relative flex items-center justify-between border rounded-md w-full flex items-center cursor-pointer mt-2 px-4"
        :class="error ? 'border-rose-500' : 'border-gray-200 hover:border-gray-300'"
        aria-label="Select date range"
        aria-haspopup="true"
        style="box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05)"
        :style="{ height }"
        @click.prevent="dropdownOpen = !dropdownOpen"
        :aria-expanded="dropdownOpen"
      >
        <div class="flex items-center">
          <img v-if="activeMethod" class="w-5 h-5 mr-3" :src="activeMethod.psystem.imgPath" alt="">
          <span v-if="activeMethod" class="text-[15px] font-medium text-gray-600">{{ activeMethod.psystem.name }}</span>
          <span v-else class="text-[15px] font-medium text-gray-400">Select method</span>
        </div>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M1.64689 4.64592C1.69334 4.59935 1.74852 4.56241 1.80926 4.5372C1.87001 4.512 1.93513 4.49902 2.00089 4.49902C2.06666 4.49902 2.13178 4.512 2.19253 4.5372C2.25327 4.56241 2.30845 4.59935 2.35489 4.64592L8.00089 10.2929L13.6469 4.64592C13.6934 4.59943 13.7486 4.56255 13.8093 4.53739C13.87 4.51223 13.9352 4.49929 14.0009 4.49929C14.0666 4.49929 14.1317 4.51223 14.1925 4.53739C14.2532 4.56255 14.3084 4.59943 14.3549 4.64592C14.4014 4.6924 14.4383 4.74759 14.4634 4.80833C14.4886 4.86907 14.5015 4.93417 14.5015 4.99992C14.5015 5.06566 14.4886 5.13076 14.4634 5.1915C14.4383 5.25224 14.4014 5.30743 14.3549 5.35392L8.35489 11.3539C8.30845 11.4005 8.25327 11.4374 8.19253 11.4626C8.13178 11.4878 8.06666 11.5008 8.00089 11.5008C7.93513 11.5008 7.87001 11.4878 7.80926 11.4626C7.74852 11.4374 7.69334 11.4005 7.64689 11.3539L1.64689 5.35392C1.60033 5.30747 1.56339 5.2523 1.53818 5.19155C1.51297 5.13081 1.5 5.06568 1.5 4.99992C1.5 4.93415 1.51297 4.86903 1.53818 4.80828C1.56339 4.74754 1.60033 4.69236 1.64689 4.64592Z" fill="#808894"/>
        </svg>
      </div>
    </div>
    <transition
      enter-active-class="transition ease-out duration-100 transform"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-out duration-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-show="dropdownOpen" class="z-10 absolute left-0 w-full bg-white border border-gray-200 py-1.5 rounded-lg shadow-lg overflow-hidden mt-1" :class="top ? 'bottom-full translate-y-7' : 'top-full'">
        <div
          ref="dropdown"
          class="font-medium text-sm text-gray-600 max-h-[250px] overflow-auto px-2"
          @focusin="dropdownOpen = true"
          @focusout="dropdownOpen = false"
        >
          <button
            v-for="(method, index) in requisites"
            :key="`recommended-${index}`"
            class="h-[36px] flex items-center justify-between rounded w-full hover:bg-gray-50 py-2 px-3 cursor-pointer"
            :class="activeMethod && method.name === activeMethod.name && 'bg-gray-100'"
            @click="changePaymentMethod(method)"
          >
            <div class="flex items-center">
              <img class="w-5 h-5 mr-3" :src="method.psystem.imgPath" alt="" />
              <span>{{method.psystem.name}}</span>
              <div v-if="method.isDefault" class="h-[18px] min-w-[46px] flex items-center justify-center text-[10px] leading-none font-medium text-blue-500 border border-blue-200 rounded-full ml-2.5">Default</div>
            </div>
            <span class="text-gray-500 text-xs">
              ****{{ method.address.substring(method.address.length - 4) }}
            </span>
            <!-- <svg class="shrink-0 ml-2 fill-current text-blue-500" :class="{'invisible': !activeMethod || method.name != activeMethod.name}" width="12" height="9" viewBox="0 0 12 9">
              <path d="M10.28.28L3.989 6.575 1.695 4.28A1 1 0 00.28 5.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28.28z" />
            </svg> -->
          </button>
          <button
            class="h-[36px] flex items-center rounded w-full hover:bg-gray-50 py-2 px-3 cursor-pointer"
            @click="addPaymentModalShow = true"
          >
            <svg class="mr-4 text-gray-500" width="18" height="18" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M7 1.75C7.41421 1.75 7.75 2.08579 7.75 2.5V6.25L11.5 6.25C11.9142 6.25 12.25 6.58579 12.25 7C12.25 7.41421 11.9142 7.75 11.5 7.75L7.75 7.75V11.5C7.75 11.9142 7.41421 12.25 7 12.25C6.58579 12.25 6.25 11.9142 6.25 11.5V7.75001L2.5 7.75001C2.08579 7.75001 1.75 7.41422 1.75 7.00001C1.75 6.5858 2.08579 6.25001 2.5 6.25001L6.25 6.25001V2.5C6.25 2.08579 6.58579 1.75 7 1.75Z" fill="currentColor"></path></svg>
            <span class="text-xs text-gray-500">Add payment method</span>
          </button>
        </div>
      </div>
    </transition>
    <AddPaymentMethodModal :modal-open="addPaymentModalShow" @close-modal="addPaymentModalShow = false" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useDropdownEventHandler } from '@/components/dropdown/DropdownEventHandler'
import { useUserStore } from '@/store/User'
import AddPaymentMethodModal from '@/views/account/components/AddPaymentMethodModal.vue'

const props = defineProps<{
  height: string
  top?: boolean
  error?: boolean
  default?: any
}>()

const emit = defineEmits<{ (e: 'change', value: any): void }>();

const userStore = useUserStore()
const { requisites } = storeToRefs(userStore)
const activeMethod = ref<any | null>(null)
const addPaymentModalShow = ref<boolean>(false)
const dropdownOpen = ref<boolean>(false)
const trigger = ref<HTMLElement | null>(null)
const dropdown = ref<HTMLElement | null>(null)

watch(() => props.default, (value: any) => {
  if (value) {
    activeMethod.value = value
  }
})

const changePaymentMethod = (method: any) => {
  activeMethod.value = method
  dropdownOpen.value = false
  emit('change', method)
}

onMounted(async () => {
  await userStore.getRequisites()
})

useDropdownEventHandler(dropdownOpen, dropdown, trigger)
</script>