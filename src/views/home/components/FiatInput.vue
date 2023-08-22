<template>
  <div>
    <label v-if="type == 'buy'" class="text-[15px] text-gray-700" for="pay">You recieve</label>
    <label v-if="type == 'sell'" class="text-[15px] text-gray-700" for="pay">You sell</label>
    <div class="relative">
      <input
        :value="modelValue"
        type="text"
        placeholder="0.00"
        class="h-[62px] border rounded-md w-full mt-2 mb-[5px] pl-4 outline-0 focus:border-blue-500"
        :class="error ? 'border-rose-500' : 'border-gray-200 hover:border-gray-300'"
        style="box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05)"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      >
      <div class="absolute right-6 top-7">
        <DropdownCurrency />
      </div>
    </div>
    <div v-if="buy && sell" class="text-[10px] text-gray-400">Min {{ type == 'buy' ? sell : buy }} {{ client?.currency?.name }}</div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useSettingsStore } from '@/store/Settings'
import { useUserStore } from '@/store/User'
import DropdownCurrency from '@/components/dropdown/DropdownCurrency.vue'

defineProps<{
  modelValue?: string
  error?: boolean
  type: string
}>();

defineEmits<{ (e: 'update:modelValue', payload: string): void }>()

const settingsStore = useSettingsStore()
const userStore = useUserStore()
const { buy, sell } = storeToRefs(settingsStore)
const { client } = storeToRefs(userStore)

</script>