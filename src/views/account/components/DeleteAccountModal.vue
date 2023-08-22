<template>
  <Modal :id="'add-payment-method-modal'" :modal-open="modalOpen" :maxWidth="'400px'" @close-modal="close">
    <div class="p-10 relative">
      <svg class="absolute right-2.5 top-2.5 cursor-pointer" width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg" @click="close">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M24.1228 13.8776C24.1635 13.9182 24.1959 13.9665 24.2179 14.0196C24.24 14.0728 24.2513 14.1298 24.2513 14.1873C24.2513 14.2449 24.24 14.3018 24.2179 14.355C24.1959 14.4081 24.1635 14.4564 24.1228 14.4971L14.4978 24.1221C14.4157 24.2042 14.3042 24.2504 14.1881 24.2504C14.0719 24.2504 13.9605 24.2042 13.8783 24.1221C13.7962 24.0399 13.75 23.9285 13.75 23.8123C13.75 23.6961 13.7962 23.5847 13.8783 23.5026L23.5033 13.8776C23.5439 13.8368 23.5922 13.8045 23.6454 13.7824C23.6985 13.7604 23.7555 13.749 23.8131 13.749C23.8706 13.749 23.9276 13.7604 23.9807 13.7824C24.0339 13.8045 24.0822 13.8368 24.1228 13.8776Z" fill="#374151"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M13.8785 13.8776C13.8378 13.9182 13.8055 13.9665 13.7834 14.0196C13.7614 14.0728 13.75 14.1298 13.75 14.1873C13.75 14.2449 13.7614 14.3018 13.7834 14.355C13.8055 14.4081 13.8378 14.4564 13.8785 14.4971L23.5035 24.1221C23.5857 24.2042 23.6971 24.2504 23.8133 24.2504C23.9295 24.2504 24.0409 24.2042 24.123 24.1221C24.2052 24.0399 24.2513 23.9285 24.2513 23.8123C24.2513 23.6961 24.2052 23.5847 24.123 23.5026L14.498 13.8776C14.4574 13.8368 14.4091 13.8045 14.356 13.7824C14.3028 13.7604 14.2458 13.749 14.1883 13.749C14.1307 13.749 14.0738 13.7604 14.0206 13.7824C13.9675 13.8045 13.9192 13.8368 13.8785 13.8776Z" fill="#374151"/>
      </svg>
      <div class="space-y-5 flex flex-col items-center">
        <svg width="62" height="62" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3.5" y="3.5" width="55" height="55" rx="27.5" fill="#FFE3E6"/>
          <g clip-path="url(#clip0_3696_125590)">
            <path d="M32.5953 20.5446C32.4344 20.2644 32.2025 20.0316 31.9229 19.8697C31.6432 19.7078 31.3259 19.6226 31.0028 19.6226C30.6797 19.6226 30.3623 19.7078 30.0827 19.8697C29.8031 20.0316 29.5711 20.2644 29.4103 20.5446L18.2676 39.5035C17.525 40.7677 18.4155 42.3749 19.8601 42.3749H42.1438C43.5884 42.3749 44.4805 40.7661 43.7363 39.5035L32.5953 20.5446ZM30.9995 26.1249C31.8689 26.1249 32.5498 26.8756 32.462 27.7417L31.8933 33.4406C31.8742 33.6645 31.7717 33.873 31.6062 34.025C31.4407 34.177 31.2242 34.2613 30.9995 34.2613C30.7748 34.2613 30.5583 34.177 30.3928 34.025C30.2273 33.873 30.1249 33.6645 30.1058 33.4406L29.537 27.7417C29.5166 27.5374 29.5392 27.331 29.6034 27.1359C29.6676 26.9408 29.7719 26.7613 29.9097 26.609C30.0475 26.4566 30.2156 26.3349 30.4033 26.2515C30.591 26.1681 30.7941 26.125 30.9995 26.1249V26.1249ZM31.0028 35.8749C31.4337 35.8749 31.8471 36.0461 32.1518 36.3508C32.4566 36.6556 32.6278 37.0689 32.6278 37.4999C32.6278 37.9308 32.4566 38.3442 32.1518 38.6489C31.8471 38.9537 31.4337 39.1249 31.0028 39.1249C30.5718 39.1249 30.1585 38.9537 29.8537 38.6489C29.549 38.3442 29.3778 37.9308 29.3778 37.4999C29.3778 37.0689 29.549 36.6556 29.8537 36.3508C30.1585 36.0461 30.5718 35.8749 31.0028 35.8749Z" fill="#DC3545"/>
          </g>
          <rect x="3.5" y="3.5" width="55" height="55" rx="27.5" stroke="#FFF3F4" stroke-width="7"/>
          <defs>
            <clipPath id="clip0_3696_125590">
              <rect width="26" height="26" fill="white" transform="translate(18 18)"/>
            </clipPath>
          </defs>
        </svg>
        <div class="text-center space-y-2.5">
          <div class="text-xl font-bold text-gray-800 text-center">Delete account</div>
          <div class="font-medium text-gray-500">If you delete your account, you will not be able to restore it.</div>
        </div>
        <div class="flex items-center justify-center space-x-4">
          <button class="h-[38px] flex items-center justify-center border border-gray-200 text-gray-800 text-[15px] font-semibold rounded-md shadow-sm px-3" @click="close">
            Delete
          </button>
          <button class="h-[38px] flex items-center justify-center bg-blue-500 text-white text-[15px] font-semibold rounded-md px-3" @click="close">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import Modal from '@/components/Modal.vue'

defineProps<{ modalOpen: boolean }>();

const emit = defineEmits<{ (e: 'close-modal'): void }>();

const close = () => {
  emit('close-modal')
}
</script>