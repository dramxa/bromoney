<template>
  <div>
    <label class="text-[15px] text-gray-700">{{ label }}</label>
    <div class="relative">
      <input
        :value="modelValue"
        :placeholder="placeholder"
        type="text"
        class="border rounded-md w-full mt-2 pl-4 fjhsdfjhsdh"
        :class="error ? 'border-rose-500' : 'border-gray-200 hover:border-gray-300'"
        :style="{ height }"
        style="box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05)"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      >
    </div>
  </div>
</template>

<script setup lang="ts">

defineProps<{
  modelValue?: string
  label: string
  placeholder: string
  height: string
  error?: boolean
}>();

defineEmits<{ (e: 'update:modelValue', value: string): void }>();

</script>