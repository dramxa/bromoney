<template>
  <div class="bg-white rounded-[10px] border border-gray-200 py-5 px-[30px]">
    <div class="text-2xl font-medium text-gray-800 mb-5">Account settings</div>
    <div v-if="client" class="flex items-center space-x-5 mb-5">
      <img class="w-[62px] h-[62px]" src="@/assets/icons/user-avatar.png" alt="">
      <div class="min-w-[140px]">
        <div class="text-xs font-semibold text-gray-500 uppercase mb-1">Name</div>
        <div class="flex items-center text-sm font-medium text-gray-800 cursor-pointer" @click.stop="changeNameModalShow = true">
          <span>{{ client.shortName || 'USER' }}</span>
          <svg class="ml-1.5" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_3643_117309)">
              <path d="M9.10935 0.109194C9.14419 0.0742713 9.18557 0.0465642 9.23113 0.0276594C9.27669 0.00875454 9.32553 -0.000976563 9.37486 -0.000976562C9.42418 -0.000976562 9.47302 0.00875454 9.51858 0.0276594C9.56414 0.0465642 9.60552 0.0742713 9.64036 0.109194L11.8904 2.35919C11.9253 2.39403 11.953 2.43541 11.9719 2.48097C11.9908 2.52653 12.0005 2.57537 12.0005 2.62469C12.0005 2.67402 11.9908 2.72286 11.9719 2.76842C11.953 2.81398 11.9253 2.85536 11.8904 2.89019L4.39035 10.3902C4.35437 10.4259 4.3115 10.454 4.26435 10.4727L0.514355 11.9727C0.446207 12 0.371551 12.0066 0.299644 11.9919C0.227737 11.9771 0.16174 11.9416 0.109835 11.8897C0.0579302 11.8378 0.0224001 11.7718 0.00764952 11.6999C-0.00710107 11.628 -0.000423445 11.5533 0.0268546 11.4852L1.52685 7.73519C1.54555 7.68805 1.57362 7.64518 1.60935 7.60919L9.10935 0.109194ZM8.4051 1.87469L10.1249 3.59444L11.0946 2.62469L9.37486 0.904944L8.4051 1.87469ZM9.5946 4.12469L7.87486 2.40494L2.99985 7.27994V7.49969H3.37485C3.47431 7.49969 3.56969 7.5392 3.64002 7.60953C3.71035 7.67985 3.74985 7.77524 3.74985 7.87469V8.24969H4.12485C4.22431 8.24969 4.31969 8.2892 4.39002 8.35953C4.46035 8.42985 4.49985 8.52524 4.49985 8.62469V8.99969H4.7196L9.5946 4.12469ZM2.27385 8.00594L2.19435 8.08544L1.04835 10.9512L3.9141 9.80519L3.9936 9.72569C3.92207 9.69897 3.8604 9.65104 3.81684 9.58831C3.77328 9.52559 3.74991 9.45106 3.74985 9.37469V8.99969H3.37485C3.2754 8.99969 3.18002 8.96019 3.10969 8.88986C3.03936 8.81953 2.99985 8.72415 2.99985 8.62469V8.24969H2.62485C2.54849 8.24964 2.47396 8.22627 2.41124 8.18271C2.34851 8.13915 2.30058 8.07748 2.27385 8.00594Z" fill="#808894"/>
            </g>
            <defs>
              <clipPath id="clip0_3643_117309">
                <rect width="12" height="12" fill="white"/>
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
      <div class="min-w-[140px]">
        <div class="text-xs font-semibold text-gray-500 uppercase mb-1">Phone number</div>
        <div class="flex items-center text-sm font-medium text-gray-800">+{{ client.contact.phone }}</div>
      </div>
    </div>
    <div class="h-[38px] flex items-center justify-between">
      <span class="text-sm font-medium text-gray-800">Language</span>
      <div>
        <DropdownLang />
      </div>
      <!-- <div class="flex items-center">
        <span class="text-sm font-medium text-gray-800">Russian</span>
        <svg class="ml-2.5" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M1.64689 4.64592C1.69334 4.59935 1.74852 4.56241 1.80926 4.5372C1.87001 4.512 1.93513 4.49902 2.00089 4.49902C2.06666 4.49902 2.13178 4.512 2.19253 4.5372C2.25327 4.56241 2.30845 4.59935 2.35489 4.64592L8.00089 10.2929L13.6469 4.64592C13.6934 4.59943 13.7486 4.56255 13.8093 4.53739C13.87 4.51223 13.9352 4.49929 14.0009 4.49929C14.0666 4.49929 14.1317 4.51223 14.1925 4.53739C14.2532 4.56255 14.3084 4.59943 14.3549 4.64592C14.4014 4.6924 14.4383 4.74759 14.4634 4.80833C14.4886 4.86907 14.5015 4.93417 14.5015 4.99992C14.5015 5.06566 14.4886 5.13076 14.4634 5.1915C14.4383 5.25224 14.4014 5.30743 14.3549 5.35392L8.35489 11.3539C8.30845 11.4005 8.25327 11.4374 8.19253 11.4626C8.13178 11.4878 8.06666 11.5008 8.00089 11.5008C7.93513 11.5008 7.87001 11.4878 7.80926 11.4626C7.74852 11.4374 7.69334 11.4005 7.64689 11.3539L1.64689 5.35392C1.60033 5.30747 1.56339 5.2523 1.53818 5.19155C1.51297 5.13081 1.5 5.06568 1.5 4.99992C1.5 4.93415 1.51297 4.86903 1.53818 4.80828C1.56339 4.74754 1.60033 4.69236 1.64689 4.64592Z" fill="#808894"/>
        </svg>
      </div> -->
    </div>
    <hr class="border-gray-200 my-2.5" />
    <div class="h-[38px] flex items-center justify-between">
      <span class="text-sm font-medium text-gray-800">Currency</span>
      <div>
        <DropdownCurrency />
      </div>
    </div>
    <hr class="border-gray-200 my-2.5" />
    <div class="flex items-center justify-between">
      <div>
        <div class="text-sm font-medium text-gray-800 mb-1.5">Delete account</div>
        <div class="text-xs text-gray-600">Be careful, deleting an account you will not be able to restore it</div>
      </div>
      <div class="text-[15px] font-semibold text-rose-500 cursor-pointer py-2.5 px-3" @click.stop="deleteAccountModalShow = true">Delete</div>
    </div>
    <!-- <button class="h-[38px] w-[100px] flex items-center justify-center rounded-md text-[15px] font-semibold text-white cursor-pointer bg-blue-500 hover:bg-blue-600 mt-[30px]">
      Save
    </button> -->
    <ChangeNameModal :modal-open="changeNameModalShow" @close-modal="changeNameModalShow = false" />
    <DeleteAccountModal :modal-open="deleteAccountModalShow" @close-modal="deleteAccountModalShow = false" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/User'
import DropdownLang from '@/components/dropdown/DropdownLang.vue'
import DropdownCurrency from '@/components/dropdown/DropdownCurrency.vue'
import ChangeNameModal from '../components/ChangeNameModal.vue'
import DeleteAccountModal from '../components/DeleteAccountModal.vue'

const userStore = useUserStore()
const { client } = storeToRefs(userStore)
const changeNameModalShow = ref<boolean>(false)
const deleteAccountModalShow = ref<boolean>(false)
</script>