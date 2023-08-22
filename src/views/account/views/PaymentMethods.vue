<template>
  <div class="bg-white rounded-[10px] border border-gray-200 py-5 px-[30px]">
    <div class="flex items-center justify-between mb-5">
      <span class="text-2xl font-bold text-gray-800">Payment methods</span>
      <button
        class="h-[38px] w-[76px] flex items-center justify-center rounded-md border border-gray-200 hover:border-gray-300"
        style="box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05)"
        @click.stop="addPaymentModalShow = true"
      >
        <svg class="mr-2" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M7 1.75C7.41421 1.75 7.75 2.08579 7.75 2.5V6.25L11.5 6.25C11.9142 6.25 12.25 6.58579 12.25 7C12.25 7.41421 11.9142 7.75 11.5 7.75L7.75 7.75V11.5C7.75 11.9142 7.41421 12.25 7 12.25C6.58579 12.25 6.25 11.9142 6.25 11.5V7.75001L2.5 7.75001C2.08579 7.75001 1.75 7.41422 1.75 7.00001C1.75 6.5858 2.08579 6.25001 2.5 6.25001L6.25 6.25001V2.5C6.25 2.08579 6.58579 1.75 7 1.75Z" fill="#3B82F6"/>
        </svg>
        <span class="text-[15px] font-semibold text-blue-500">Add</span>
      </button>
    </div>
    <div class="space-y-4">
      <div v-for="requisite in requisites" :key="requisite.id" class="rounded border border-gray-200 px-5 py-4">
        <div class="flex items-center space-x-4">
          <div class="w-[35%] flex items-center space-x-1.5">
            <img class="w-5 h-5" :src="requisite.psystem.imgPath" alt="">
            <span class="text-xs text-gray-800">{{ requisite.psystem.name }}</span>
            <!-- <div v-if="requisite.isDefault" class="h-[18px] min-w-[46px] flex items-center justify-center text-[10px] leading-none font-medium text-blue-500 border border-blue-200 rounded-full">Default</div> -->
          </div>
          <div class="w-[20%] text-xs text-gray-800">
            {{ requisite.name }}
          </div>
          <div class="w-[25%] text-xs text-gray-800">
            {{ requisite.address }}
          </div>
          <div class="w-[20%] flex items-center justify-end space-x-2.5 text-xs font-medium">
            <span class="text-blue-500 cursor-pointer" @click="edit(requisite)">Edit</span>
            <span class="text-rose-500 cursor-pointer" @click="remove(requisite)">Delete</span>
          </div>
        </div>
        <div v-if="requisite.comment" class="text-xs text-gray-800 flex justify-between mt-4">
          <span>{{ requisite.comment }}</span>
          <!-- <span class="text-xs font-medium text-blue-500 cursor-pointer">More</span> -->
        </div>
      </div>
    </div>
    <AddPaymentMethod :modal-open="addPaymentModalShow" @close-modal="addPaymentModalShow = false" />
    <EditPaymentMethod v-if="activeRequisite" :method="activeRequisite" :modal-open="editPaymentModalShow" @close-modal="editPaymentModalShow = false" />
    <DeletePaymentMethod :method="activeRequisite" :modal-open="deletePaymentModalShow" @close-modal="deletePaymentModalShow = false, activeRequisite = null" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/User'
import AddPaymentMethod from '../components/AddPaymentMethodModal.vue'
import EditPaymentMethod from '../components/EditPaymentMethodModal.vue'
import DeletePaymentMethod from '../components/DeletePaymentMethodModal.vue'

const userStore = useUserStore()
const { requisites } = storeToRefs(userStore)
const addPaymentModalShow = ref<boolean>(false)
const editPaymentModalShow = ref<boolean>(false)
const deletePaymentModalShow = ref<boolean>(false)
const activeRequisite = ref<any>(null)

const edit = (requisite: any) => {
  activeRequisite.value = requisite
  editPaymentModalShow.value = true
}
const remove = (requisite: any) => {
  activeRequisite.value = requisite
  deletePaymentModalShow.value = true
}

onMounted(async () => {
  await userStore.getRequisites()
})
</script>