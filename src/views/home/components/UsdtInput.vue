<template>
  <div>
    <label v-if="type == 'buy'" class="text-[15px] text-gray-700" for="usdt-input">You recieve</label>
    <label v-if="type == 'sell'" class="text-[15px] text-gray-700" for="usdt-input">You sell</label>
    <div class="relative">
      <input
        id="usdt-input"
        :value="modelValue"
        type="text"
        placeholder="0.00"
        class="h-[62px] border rounded-md w-full mt-2 mb-[5px] pl-4 outline-0 focus:border-blue-500"
        :class="error ? 'border-rose-500' : 'border-gray-200 hover:border-gray-300'"
        style="box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05)"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      >
      <div class="absolute right-2.5 top-3.5 flex items-center space-x-[10px] px-4 py-3.5">
        <img class="h-5 w-5" src="@/assets/icons/currency/usdt.png" alt="">
        <div class="text-[15px] text-gray-600 font-medium">USDT</div>
      </div>
    </div>
    <div v-if="buy && sell" class="text-[10px] text-gray-400">1 USDT = {{ type == 'buy' ? buy : sell }} {{ client?.currency?.abbr }}</div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useSettingsStore } from '@/store/Settings'
import { useUserStore } from '@/store/User'

const settingsStore = useSettingsStore()
const userStore = useUserStore()
const { buy, sell } = storeToRefs(settingsStore)
const { client } = storeToRefs(userStore)

defineProps<{
  modelValue?: string
  error?: boolean
  type: string
}>();

defineEmits<{ (e: 'update:modelValue', payload: string): void }>()

</script>