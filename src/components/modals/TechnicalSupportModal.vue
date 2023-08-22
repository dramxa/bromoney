<template>
  <Modal :id="'add-payment-method-modal'" :modal-open="modalOpen" :maxWidth="'531px'" @close-modal="close">
    <div class="p-10 relative">
      <svg class="absolute right-2.5 top-2.5 cursor-pointer" width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg" @click="close">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M24.1228 13.8776C24.1635 13.9182 24.1959 13.9665 24.2179 14.0196C24.24 14.0728 24.2513 14.1298 24.2513 14.1873C24.2513 14.2449 24.24 14.3018 24.2179 14.355C24.1959 14.4081 24.1635 14.4564 24.1228 14.4971L14.4978 24.1221C14.4157 24.2042 14.3042 24.2504 14.1881 24.2504C14.0719 24.2504 13.9605 24.2042 13.8783 24.1221C13.7962 24.0399 13.75 23.9285 13.75 23.8123C13.75 23.6961 13.7962 23.5847 13.8783 23.5026L23.5033 13.8776C23.5439 13.8368 23.5922 13.8045 23.6454 13.7824C23.6985 13.7604 23.7555 13.749 23.8131 13.749C23.8706 13.749 23.9276 13.7604 23.9807 13.7824C24.0339 13.8045 24.0822 13.8368 24.1228 13.8776Z" fill="#374151"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M13.8785 13.8776C13.8378 13.9182 13.8055 13.9665 13.7834 14.0196C13.7614 14.0728 13.75 14.1298 13.75 14.1873C13.75 14.2449 13.7614 14.3018 13.7834 14.355C13.8055 14.4081 13.8378 14.4564 13.8785 14.4971L23.5035 24.1221C23.5857 24.2042 23.6971 24.2504 23.8133 24.2504C23.9295 24.2504 24.0409 24.2042 24.123 24.1221C24.2052 24.0399 24.2513 23.9285 24.2513 23.8123C24.2513 23.6961 24.2052 23.5847 24.123 23.5026L14.498 13.8776C14.4574 13.8368 14.4091 13.8045 14.356 13.7824C14.3028 13.7604 14.2458 13.749 14.1883 13.749C14.1307 13.749 14.0738 13.7604 14.0206 13.7824C13.9675 13.8045 13.9192 13.8368 13.8785 13.8776Z" fill="#374151"/>
      </svg>
      <div class="space-y-5">
        <div class="text-center space-x-2.5">
          <div class="text-xl font-bold text-gray-800 text-center">Support message</div>
          <div class="font-medium text-gray-500">Please, write here your question</div>
        </div>
        <BasicInput :label="'Name'" :placeholder="'Your name'" :height="'46px'" />
        <BasicInput :label="'Email'" :placeholder="'Your email'" :height="'46px'" />
        <div>
          <label class="text-[15px] text-gray-700">Decription</label>
          <textarea class="w-full border border-gray-200 rounded-md shadow-sm px-4 py-3.5 mt-2" placeholder="Decription.." name="" id="" rows="3"></textarea>
        </div>
        <button class="w-full h-[46px] flex items-center justify-center bg-blue-500 text-white text-[15px] font-semibold rounded-md" @click="close">
          Send message
        </button>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import Modal from '@/components/Modal.vue'
import BasicInput from '@/components/BasicInput.vue'

defineProps<{ modalOpen: boolean }>();

const emit = defineEmits<{ (e: 'close-modal'): void }>();

const close = () => {
  emit('close-modal')
}
</script>