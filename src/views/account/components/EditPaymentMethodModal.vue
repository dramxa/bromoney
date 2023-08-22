<template>
  <Modal :id="'edit-payment-method-modal'" :modal-open="modalOpen" :maxWidth="'531px'" @close-modal="close">
    <div class="p-10 relative">
      <svg class="absolute right-2.5 top-2.5 cursor-pointer" width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg" @click="close">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M24.1228 13.8776C24.1635 13.9182 24.1959 13.9665 24.2179 14.0196C24.24 14.0728 24.2513 14.1298 24.2513 14.1873C24.2513 14.2449 24.24 14.3018 24.2179 14.355C24.1959 14.4081 24.1635 14.4564 24.1228 14.4971L14.4978 24.1221C14.4157 24.2042 14.3042 24.2504 14.1881 24.2504C14.0719 24.2504 13.9605 24.2042 13.8783 24.1221C13.7962 24.0399 13.75 23.9285 13.75 23.8123C13.75 23.6961 13.7962 23.5847 13.8783 23.5026L23.5033 13.8776C23.5439 13.8368 23.5922 13.8045 23.6454 13.7824C23.6985 13.7604 23.7555 13.749 23.8131 13.749C23.8706 13.749 23.9276 13.7604 23.9807 13.7824C24.0339 13.8045 24.0822 13.8368 24.1228 13.8776Z" fill="#374151"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M13.8785 13.8776C13.8378 13.9182 13.8055 13.9665 13.7834 14.0196C13.7614 14.0728 13.75 14.1298 13.75 14.1873C13.75 14.2449 13.7614 14.3018 13.7834 14.355C13.8055 14.4081 13.8378 14.4564 13.8785 14.4971L23.5035 24.1221C23.5857 24.2042 23.6971 24.2504 23.8133 24.2504C23.9295 24.2504 24.0409 24.2042 24.123 24.1221C24.2052 24.0399 24.2513 23.9285 24.2513 23.8123C24.2513 23.6961 24.2052 23.5847 24.123 23.5026L14.498 13.8776C14.4574 13.8368 14.4091 13.8045 14.356 13.7824C14.3028 13.7604 14.2458 13.749 14.1883 13.749C14.1307 13.749 14.0738 13.7604 14.0206 13.7824C13.9675 13.8045 13.9192 13.8368 13.8785 13.8776Z" fill="#374151"/>
      </svg>
      <div class="space-y-5">
        <div class="text-xl font-bold text-gray-800 text-center">Edit payment method</div>
        <div>
          <DropdownPaymentMethod :default="paymentsMethod" :height="'46px'" :error="errors.paymentsMethod" @change="changePaymentMethod($event)" />
        </div>
        <BasicInput
          v-model="cardNumber"
          :label="'Card number'"
          :placeholder="'Card number'"
          :height="'46px'"
          :error="errors.cardNumber"
        />
        <BasicInput
          v-model="senderName"
          :label="'Recipient name'"
          :placeholder="'Name'"
          :height="'46px'"
          :error="errors.senderName"
        />
        <div>
          <label class="text-[15px] text-gray-700">Comment</label>
          <textarea v-model="comment" class="w-full border border-gray-200 rounded-md shadow-sm px-4 py-3.5 mt-2" placeholder="Comment.." name="" id="" rows="3"></textarea>
        </div>
      </div>
    </div>
    <div class="flex rounded-b-2xl items-center justify-end space-x-2.5 bg-gray-50 border-t border-gray-200 p-5">
      <button class="w-[80px] h-[38px] flex items-center justify-center border border-gray-200 text-gray-800 text-[15px] font-semibold rounded-md shadow-sm" @click="close">
        Cancel
      </button>
      <button class="w-[80px] h-[38px] flex items-center justify-center bg-blue-500 text-white text-[15px] font-semibold rounded-md" @click="save">
        Save
      </button>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useUserStore } from '@/store/User'
import Modal from '@/components/Modal.vue'
import DropdownPaymentMethod from './DropdownPaymentMethod.vue'
import BasicInput from '@/components/BasicInput.vue'

const props = defineProps<{ 
  modalOpen: boolean
  method: any
}>();

const emit = defineEmits<{ (e: 'close-modal'): void }>();

const userStore = useUserStore()
const paymentsMethod = ref<any>(null)
const cardNumber = ref<string>('')
const senderName = ref<string>('')
const comment = ref<string>('')
const errors = ref({
  paymentsMethod: false,
  cardNumber: false,
  senderName: false,
})

watch(() => props.method, (value: any) => {
  if (value) {
    paymentsMethod.value = value.psystem
    cardNumber.value = value.address
    senderName.value = value.name
    comment.value = value.comment
  }
})

const changePaymentMethod = (method: any) => {
  paymentsMethod.value = method
  errors.value.paymentsMethod = false
}
const save = async () => {
  if (!verify()) return
  const data = {
    psystem_id: paymentsMethod.value.id,
    name: senderName.value,
    address: cardNumber.value,
    address_type_id: 1,
    comment: comment.value,
    is_default: true
  }
  const response = await userStore.updatePaymentMethod(props.method.id, data)
  if (response) {
    userStore.getRequisites()
    close()
  }
}
const verify = () => {
  errors.value = {
    paymentsMethod: false,
    cardNumber: false,
    senderName: false,
  }
  if (!paymentsMethod.value?.id) errors.value.paymentsMethod = true
  if (!cardNumber.value?.length) errors.value.cardNumber = true
  if (!senderName.value?.length) errors.value.senderName = true

  if (errors.value.paymentsMethod || errors.value.cardNumber || errors.value.senderName) return false
  return true
}
const close = () => {
  emit('close-modal')
}

onMounted(() => {
  paymentsMethod.value = props.method.psystem
  cardNumber.value = props.method.address
  senderName.value = props.method.name
  comment.value = props.method.comment
})
</script>