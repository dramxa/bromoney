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
          <img v-if="activeMethod" class="w-5 h-5 mr-3" :src="activeMethod.imgPath" alt="">
          <span v-if="activeMethod" class="text-[15px] font-medium text-gray-600">{{ activeMethod.name }}</span>
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
          class="font-medium text-sm text-gray-600 max-h-[250px] overflow-auto"
          @focusin="dropdownOpen = true"
          @focusout="dropdownOpen = false"
        >
          <button
            v-for="(method, index) in paymentMethods"
            :key="`recommended-${index}`"
            class="h-[36px] flex items-center justify-between w-full hover:bg-gray-50 py-2 px-3 cursor-pointer"
            :class="activeMethod && method.name === activeMethod.name && 'text-blue-500'"
            @click="changePaymentMethod(method)"
          >
            <div class="flex items-center">
              <img class="w-5 h-5 mr-3" :src="method.imgPath" alt="" />
              <span>{{method.name}}</span>
            </div>
            <svg class="shrink-0 ml-2 fill-current text-blue-500" :class="{'invisible': !activeMethod || method.name != activeMethod.name}" width="12" height="9" viewBox="0 0 12 9">
              <path d="M10.28.28L3.989 6.575 1.695 4.28A1 1 0 00.28 5.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28.28z" />
            </svg>
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useSettingsStore } from '@/store/Settings'
import { useDropdownEventHandler } from '@/components/dropdown/DropdownEventHandler'

const props = defineProps<{
  height: string
  top?: boolean
  error?: boolean
  default?: any
}>()

const emit = defineEmits<{ (e: 'change', value: any): void }>();

const settingsStore = useSettingsStore()
const paymentMethods = ref<any[]>([])
const activeMethod = ref<any | null>(null)
const dropdownOpen = ref(false)
const trigger = ref(null)
const dropdown = ref(null)

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
  const psList = await settingsStore.getAllPsystems()
  paymentMethods.value = psList
  // if (props.default) activeMethod.value = props.default
})

useDropdownEventHandler(dropdownOpen, dropdown, trigger)
</script>