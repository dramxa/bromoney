<template>
  <div v-if="data" class="w-[460px] rounded-[20px] flex flex-col border border-gray-200 overflow-hidden" style="height: calc(100vh - 73px - 60px)">
    <div class="my-4 mx-[30px] bg-white flex items-center justify-center">
      <span class="font-semibold text-gray-800">{{ data.agent.name }}</span>
      <div class="w-2 h-2 rounded-full bg-green-500 ml-5 mr-2.5" />
      <span class="text-xs text-gray-600">Online</span>
    </div>
    <div ref="chat" class="overflow-y-auto" style="max-height: calc(100% - 83px - 24px);min-height: calc(100% - 83px - 24px);">
      <div v-if="!messages.length" class="flex flex-col items-center bg-gray-50 p-5 min-h-[100%]">
        <div class="text-sm text-gray-400 mb-5">{{ formatDateTime(data.acceptedAt) }}</div>
        <div class="p-4 bg-gray-100 rounded-md text-sm text-gray-600 text-center mb-4">All agents are checked by the system, your payments are fully insured</div>
        <div class="text-sm text-gray-600 text-center mb-2">Transfer strictly the amount from the application</div>
        <div class="text-sm text-gray-600 text-center mb-2">No comment on the payment is needed</div>
        <div class="text-sm text-gray-600 text-center">If these conditions are not met, the balance will not be replenished, and the money will be refunded</div>
        <div class="grow" />
      </div>
      <div v-else class="min-h-[100%] flex flex-col justify-end bg-gray-50 p-2.5">
        <template v-for="(msg, index) in messages" >
          <div v-if="msg.senderType == 'agent'" class="flex" :class="checkNext(index, msg.senderType) ? 'mb-2.5' : 'mb-1'">
            <div v-if="checkPrev(index, msg.senderType)" class="agent-avatar mr-2" />
            <div v-else class="min-w-[29px] min-h-[29px] mr-2" />
            <div>
              <div
                v-if="msg.attachments.length"
                class="max-w-[300px] bg-white border border-gray-200 text-xs text-gray-800 overflow-hidden cursor-pointer"
                style="border-radius: 0 8px 8px 8px;"
                @click="activeAttachment = msg.attachments[0], attachmentModalShow = true"
              >
                <img :src="msg.attachments[0].thumbPath" />
              </div>
              <div v-else class="max-w-[300px] bg-white border border-gray-200 text-xs text-gray-800 py-1.5 px-2.5" style="border-radius: 0 8px 8px 8px;">
                {{ msg.message }}
              </div>
              <span v-if="checkNext(index, msg.senderType)" class="text-[10px] font-medium text-gray-600">{{ formatDate(msg.createdAt) }}</span>
            </div>
          </div>
          <div v-if="msg.senderType == 'client'" class="self-end" :class="checkNext(index, msg.senderType) ? 'mb-2.5' : 'mb-1'">
            <div
              v-if="msg.attachments.length"
              class="max-w-[300px] bg-blue-500 text-xs text-white overflow-hidden cursor-pointer"
              style="border-radius: 8px 0 8px 8px;"
              @click="activeAttachment = msg.attachments[0], attachmentModalShow = true"
            >
              <img :src="msg.attachments[0].thumbPath" />
            </div>
            <div v-else class="max-w-[300px] bg-blue-500 text-xs text-white py-1.5 px-2.5" style="border-radius: 8px 0 8px 8px;">
              {{ msg.message }}
            </div>
            <span v-if="checkNext(index, msg.senderType)" class="text-[10px] font-medium text-gray-600">{{ formatDate(msg.createdAt) }}</span>
          </div>
        </template>
      </div>
    </div>
    <div class="h-[83px] bg-white flex items-center space-x-2.5 px-5">
      <svg class="cursor-pointer text-gray-500 hover:text-gray-600" width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" @click="($refs as any)['inputFile'].click()">
        <path d="M6.75 5C6.75 4.00544 7.14509 3.05161 7.84835 2.34835C8.55161 1.64509 9.50544 1.25 10.5 1.25C11.4946 1.25 12.4484 1.64509 13.1517 2.34835C13.8549 3.05161 14.25 4.00544 14.25 5V18.5C14.25 19.0967 14.0129 19.669 13.591 20.091C13.169 20.5129 12.5967 20.75 12 20.75C11.4033 20.75 10.831 20.5129 10.409 20.091C9.98705 19.669 9.75 19.0967 9.75 18.5V8C9.75 7.80109 9.82902 7.61032 9.96967 7.46967C10.1103 7.32902 10.3011 7.25 10.5 7.25C10.6989 7.25 10.8897 7.32902 11.0303 7.46967C11.171 7.61032 11.25 7.80109 11.25 8V18.5C11.25 18.6989 11.329 18.8897 11.4697 19.0303C11.6103 19.171 11.8011 19.25 12 19.25C12.1989 19.25 12.3897 19.171 12.5303 19.0303C12.671 18.8897 12.75 18.6989 12.75 18.5V5C12.75 4.70453 12.6918 4.41194 12.5787 4.13896C12.4657 3.86598 12.2999 3.61794 12.091 3.40901C11.8821 3.20008 11.634 3.03434 11.361 2.92127C11.0881 2.8082 10.7955 2.75 10.5 2.75C10.2045 2.75 9.91194 2.8082 9.63896 2.92127C9.36598 3.03434 9.11794 3.20008 8.90901 3.40901C8.70008 3.61794 8.53434 3.86598 8.42127 4.13896C8.3082 4.41194 8.25 4.70453 8.25 5V18.5C8.25 19.4946 8.64509 20.4484 9.34835 21.1516C10.0516 21.8549 11.0054 22.25 12 22.25C12.9946 22.25 13.9484 21.8549 14.6517 21.1516C15.3549 20.4484 15.75 19.4946 15.75 18.5V8C15.75 7.80109 15.829 7.61032 15.9697 7.46967C16.1103 7.32902 16.3011 7.25 16.5 7.25C16.6989 7.25 16.8897 7.32902 17.0303 7.46967C17.171 7.61032 17.25 7.80109 17.25 8V18.5C17.25 19.8924 16.6969 21.2277 15.7123 22.2123C14.7277 23.1969 13.3924 23.75 12 23.75C10.6076 23.75 9.27226 23.1969 8.28769 22.2123C7.30312 21.2277 6.75 19.8924 6.75 18.5V5Z" fill="currentColor"/>
      </svg>
      <input accept="image/*" type="file" ref="inputFile" class="hidden" @change="inputFileEventChange">
      <div class="grow">
        <label for="message-input" class="sr-only">Type a message</label>
        <input v-model="message" @keyup.enter="sendMessage" id="message-input" class="h-[38px] flex items-center form-input w-full bg-slate-100 border-transparent focus:bg-white focus:border-slate-300 px-2" type="text" placeholder="Aa" />
      </div>
      <svg class="cursor-pointer text-blue-500 hover:text-blue-600" width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" @click="sendMessage">
        <g clip-path="url(#clip0_3737_126332)">
          <path d="M23.9471 1.5292C24.0017 1.3929 24.015 1.24359 23.9855 1.09978C23.956 0.955962 23.885 0.823968 23.7812 0.720158C23.6774 0.616349 23.5454 0.545288 23.4015 0.515787C23.2577 0.486286 23.1084 0.499641 22.9721 0.554197L1.15162 9.2827H1.15012L0.472125 9.5527C0.34371 9.60392 0.231953 9.68964 0.149198 9.80039C0.0664433 9.91114 0.0159116 10.0426 0.00318483 10.1803C-0.00954198 10.3179 0.0160314 10.4565 0.0770801 10.5805C0.138129 10.7045 0.232277 10.8093 0.349125 10.8832L0.964125 11.2732L0.965625 11.2762L8.45812 16.0432L13.2251 23.5357L13.2281 23.5387L13.6181 24.1537C13.6923 24.2701 13.7971 24.3638 13.921 24.4244C14.045 24.4851 14.1833 24.5104 14.3207 24.4975C14.4581 24.4847 14.5892 24.4341 14.6998 24.3515C14.8103 24.2689 14.8959 24.1573 14.9471 24.0292L23.9471 1.5292ZM21.1976 4.3642L9.95662 15.6052L9.63412 15.0982C9.57503 15.0052 9.49616 14.9263 9.40312 14.8672L8.89612 14.5447L20.1371 3.3037L21.9041 2.5972L21.1991 4.3642H21.1976Z" fill="currentColor"/>
        </g>
        <defs>
          <clipPath id="clip0_3737_126332">
            <rect width="24" height="24" fill="white" transform="translate(0 0.5)"/>
          </clipPath>
        </defs>
      </svg>
    </div>
    <AttachmentModal :attachment="activeAttachment" :modal-open="attachmentModalShow" @close-modal="attachmentModalShow = false" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useChatStore } from '@/store/Chat'
import dayjs from 'dayjs'
import humps from 'lodash-humps-ts'
import toast from '@/components/toast'
import AttachmentModal from '@/components/modals/AttachmentModal.vue'

const props = defineProps<{
  msid: string
}>()

const chatStore = useChatStore()
const data = ref<any>(null)
const messages = ref<any[]>([])
const message = ref('')
const chat = ref<any>(null)
const inputFile = ref<any>(null)
const attachments = ref<any[]>([])
const attachmentModalShow = ref<boolean>(false)
const activeAttachment = ref<any>(null)

watch(messages, (value) => {
  if (value.length) {
    setTimeout(() => {
      chat.value.scroll(0, chat.value.scrollHeight)
    }, 100)
  }
})

const inputFileEventChange = (event: Event) => {
  uploadFile(event);
  (event.target as HTMLInputElement).value = ''
}
const uploadFile = async (e: Event) => {
  const file = (e.target as HTMLInputElement).files![0]
  const extension = file.type.split('/')[1]
  const fileSize = file.size / 1024 / 1024

  if (fileSize > 10) {
    toast.error('Max image size: 10 Mb')
    return false
  }
  if (!['jpeg', 'jpg', 'png', 'bmp', 'pdf'].includes(extension)) {
    toast.error('Accepted formats: jpeg, jpg, png, bmp, pdf')
    return false
  }

  attachments.value.push({
    file: file,
    path: URL.createObjectURL(file)
  });
  const msgData = {
    msid: props.msid,
    message: '',
    wait_files: 1
  }
  const msg = await chatStore.send(msgData)
  if (msg) {
    const fileData = {
      chatId: msg.chatId,
      messageId: msg.id,
      file: file,
    }
    const res = await chatStore.sendFileMessage(fileData)
    if (res) {
      attachments.value.pop()
      await getChatData()
      setTimeout(() => {
        chat.value.scroll(0, chat.value.scrollHeight)
      }, 100)
    }
  }
}
const sendMessage = async () => {
  if (!message.value.length) return
  const msgData = {
    msid: props.msid,
    message: message.value,
    wait_files: 0
  }
  const res = await chatStore.send(msgData)
  if (res) { // @ts-ignore
    messages.value.push(res)
    message.value = ''
    setTimeout(() => {
      chat.value.scroll(0, chat.value.scrollHeight)
    }, 100)
  }
}
const formatDateTime = (date: string) => {
  return dayjs(date).format('DD.MM.YYYY HH:mm')
}
const formatDate = (date: string) => {
  return dayjs(date).format('HH:mm')
}
const checkNext = (index: number, type: string) => {
  const nextMsg = messages.value[index+1]
  if (nextMsg) {
    if (nextMsg.senderType == type) return false
    else return true
  } else return true
}
const checkPrev = (index: number, type: string) => {
  const nextMsg = messages.value[index-1]
  if (nextMsg) {
    if (nextMsg.senderType == type) return false
    else return true
  } else return true
}
const getChatData = async () => {
  const res = await chatStore.get(props.msid)
  if (res) {
    data.value = res
    messages.value = res.messages
  }
}

onMounted(async () => {
  await getChatData()
  window.Echo.channel(localStorage.getItem('ltoken'))
    .listen('.NewChatMessage', async(msgData: any) => {
      msgData = humps(msgData)
      if (data.value.id == msgData.chat.id) {
        messages.value.push(msgData.message)
        setTimeout(() => {
          chat.value.scroll(0, chat.value.scrollHeight)
        }, 100)
      }
    })
})
</script>

<style scoped>
.agent-avatar {
  min-width: 29px;
  min-height: 29px;
  max-width: 29px;
  max-height: 29px;
  background-size: contain;
  background-image: url("data:image/svg+xml,%3Csvg width='33' height='33' viewBox='0 0 33 33' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='33' height='33' rx='16.5' fill='%23EFEFF4'/%3E%3Cpath d='M7.51214 13.3248L7.43861 13.28C6.43076 14.9349 5.89443 16.8256 5.88607 18.7542V18.7546C5.88607 20.9878 6.953 22.8622 8.96186 24.1714C10.8692 25.4151 13.5689 26.1012 16.5631 26.099C19.5569 26.0967 22.2568 25.4146 24.1642 24.1714C26.173 22.8624 27.2404 20.9882 27.2399 18.7546C27.2399 16.2121 26.2631 13.6637 24.5598 11.7607C23.1811 10.22 20.6744 8.38502 16.5631 8.3818L16.5629 8.3818C14.4695 8.38505 12.791 8.86135 11.4632 9.53328L11.4632 9.53317L11.4592 9.53545L11.4439 9.54426C9.80751 10.3767 8.42617 11.6636 7.44871 13.2656L7.44859 13.2658L7.44841 13.266C7.44672 13.2681 7.44186 13.2743 7.43735 13.2822L7.51214 13.3248ZM7.51214 13.3248C7.51341 13.3226 7.51498 13.3206 7.51657 13.3186C7.51784 13.317 7.51912 13.3154 7.52027 13.3136L9.00886 24.0992C7.02216 22.8045 5.97217 20.9562 5.97217 18.7546C5.98046 16.8417 6.5124 14.9663 7.51214 13.3248Z' fill='white' stroke='%23423636' stroke-width='0.172195'/%3E%3Cpath d='M16.5852 7.48745H16.5851L16.5395 7.48745L16.5393 7.48745C14.5071 7.49314 12.8344 7.9149 11.4734 8.53179C10.7471 7.52634 9.65923 6.8912 8.58497 6.8912C7.68263 6.8912 6.77621 7.35657 6.09433 8.15677L6.09431 8.15679C5.45428 8.90843 5.08472 9.85129 5.08472 10.7457C5.08472 11.7045 5.57818 12.6091 6.41186 13.248C5.47749 14.9384 4.98368 16.8299 4.97494 18.754V18.7544C4.97494 21.3015 6.18234 23.4337 8.4576 24.9171L8.50462 24.8449L8.45761 24.9171C10.5077 26.2532 13.378 26.9882 16.5399 26.9937H16.54H16.5856H16.5857C19.7479 26.9879 22.6177 26.2532 24.668 24.9171L24.621 24.8449L24.668 24.9171C26.9432 23.4338 28.1511 21.3017 28.1511 18.7544L28.1511 18.754C28.1422 16.8365 27.6517 14.9512 26.7233 13.2652C27.5736 12.6271 28.0738 11.7135 28.0738 10.7457C28.0738 9.85129 27.7042 8.90843 27.0642 8.15679L26.9986 8.21261L27.0642 8.15679C26.3827 7.35657 25.4764 6.8912 24.5737 6.8912C23.4953 6.8912 22.4038 7.53124 21.6762 8.54279C20.3106 7.91969 18.6299 7.49142 16.5852 7.48745ZM9.05578 24.0273L9.05576 24.0273C7.09126 22.747 6.05821 20.9248 6.05815 18.7549C6.06641 16.8586 6.59357 14.9993 7.58445 13.3716L7.5865 13.369C7.58799 13.367 7.59007 13.3642 7.5923 13.3608L7.59233 13.3608L7.59368 13.3586C8.55541 11.7811 9.91461 10.5151 11.5238 9.69692L11.5238 9.69702L11.5276 9.69483L11.5429 9.68606C12.8465 9.02677 14.4978 8.55738 16.563 8.55416C20.6157 8.55737 23.0783 10.3637 24.4314 11.8757L24.4955 11.8183L24.4314 11.8757C26.1066 13.7473 27.0676 16.2549 27.0676 18.7548C27.0681 20.925 26.0346 22.7472 24.0701 24.0273L24.1171 24.0994L24.0701 24.0273C22.1982 25.2473 19.5338 25.9247 16.5629 25.927C13.5919 25.9292 10.9276 25.2478 9.05578 24.0273ZM7.51645 13.3188C7.51772 13.3172 7.51901 13.3156 7.52016 13.3138L5.97206 18.7547C5.98035 16.8419 6.51229 14.9665 7.51203 13.325C7.5133 13.3228 7.51486 13.3208 7.51645 13.3188Z' fill='%23423636' stroke='%23423636' stroke-width='0.172195'/%3E%3Cpath d='M18.1693 18.6436C18.1693 19.1697 16.6535 19.9026 16.6535 19.9026C16.6535 19.9026 15.1377 19.1697 15.1377 18.6436C15.1377 18.1176 15.8167 18.0546 16.6535 18.0546C17.4904 18.0546 18.1693 18.1177 18.1693 18.6436Z' fill='%23423636'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M15.5132 18.5756C15.5043 18.5848 15.493 18.5973 15.493 18.6435C15.493 18.6405 15.493 18.6389 15.4933 18.6388C15.4952 18.6384 15.5102 18.6949 15.6264 18.8116C15.7435 18.9291 15.9098 19.0546 16.0908 19.1735C16.2691 19.2907 16.4493 19.3935 16.5859 19.4675C16.61 19.4805 16.6327 19.4926 16.6537 19.5037C16.6746 19.4926 16.6973 19.4805 16.7214 19.4675C16.858 19.3935 17.0382 19.2907 17.2165 19.1735C17.3975 19.0546 17.5639 18.9291 17.681 18.8116C17.7972 18.6949 17.8121 18.6384 17.814 18.6388C17.8143 18.6389 17.8143 18.6405 17.8143 18.6435C17.8143 18.5973 17.803 18.5848 17.7942 18.5756C17.7761 18.5569 17.7296 18.5235 17.6242 18.4922C17.4063 18.4274 17.077 18.4096 16.6537 18.4096C16.2303 18.4096 15.9011 18.4274 15.6831 18.4922C15.5777 18.5235 15.5312 18.5568 15.5132 18.5756ZM16.6537 19.9025L16.4989 20.2222L16.4972 20.2214L16.4933 20.2195L16.4791 20.2125C16.4669 20.2064 16.4495 20.1978 16.4276 20.1866C16.3838 20.1644 16.3218 20.1322 16.2477 20.0921C16.1002 20.0122 15.9013 19.8989 15.7007 19.7671C15.5027 19.637 15.2902 19.4806 15.1231 19.3128C14.9739 19.163 14.7827 18.9285 14.7827 18.6435C14.7827 18.4268 14.8563 18.2341 15.0009 18.0836C15.1363 17.9426 15.3119 17.8615 15.4808 17.8113C15.8115 17.713 16.2402 17.6993 16.6537 17.6993C17.0672 17.6993 17.4958 17.713 17.8266 17.8113C17.9955 17.8615 18.171 17.9426 18.3064 18.0836C18.4511 18.2341 18.5246 18.4268 18.5246 18.6435C18.5246 18.9285 18.3334 19.163 18.1843 19.3128C18.0172 19.4806 17.8046 19.637 17.6066 19.7671C17.406 19.8989 17.2072 20.0122 17.0596 20.0921C16.9855 20.1322 16.9235 20.1644 16.8797 20.1866C16.8578 20.1978 16.8404 20.2064 16.8283 20.2125L16.8141 20.2195L16.8101 20.2214L16.8089 20.222L16.6537 19.9025ZM16.6537 19.9025L16.8089 20.222C16.7112 20.2692 16.5966 20.2695 16.4989 20.2222L16.6537 19.9025Z' fill='%23423636'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M16.6559 19.4133C16.9286 19.4133 17.1497 19.6343 17.1497 19.9071V20.5332C17.1497 20.6371 17.1169 20.7384 17.0559 20.8226L16.6559 20.5332C17.0559 20.8226 17.0558 20.8229 17.0556 20.8231L17.0553 20.8236L17.0545 20.8247L17.0525 20.8274L17.047 20.8348L17.0298 20.8572C17.0157 20.8753 16.9961 20.8997 16.9711 20.9293C16.9212 20.9883 16.8494 21.0682 16.7561 21.1594C16.5704 21.3409 16.2947 21.5718 15.9328 21.7701C15.1952 22.174 14.1197 22.4284 12.7861 21.9013C12.5324 21.8011 12.4081 21.5142 12.5083 21.2606C12.6086 21.0069 12.8954 20.8826 13.1491 20.9828C14.1723 21.3873 14.9409 21.1873 15.4583 20.9039C15.7238 20.7585 15.9283 20.5875 16.0659 20.4531C16.1033 20.4165 16.1354 20.383 16.1621 20.3539V19.9071C16.1621 19.6343 16.3831 19.4133 16.6559 19.4133Z' fill='%23423636'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M16.6515 19.4133C16.9242 19.4133 17.1453 19.6343 17.1453 19.9071V20.3539C17.172 20.383 17.2041 20.4165 17.2415 20.4531C17.379 20.5875 17.5835 20.7585 17.849 20.9039C18.3664 21.1873 19.135 21.3873 20.1583 20.9828C20.4119 20.8826 20.6988 21.0069 20.799 21.2606C20.8993 21.5142 20.7749 21.8011 20.5213 21.9013C19.1877 22.4284 18.1121 22.174 17.3746 21.7701C17.0126 21.5718 16.737 21.3409 16.5512 21.1594C16.4579 21.0682 16.3861 20.9883 16.3362 20.9293C16.3113 20.8997 16.2917 20.8753 16.2775 20.8572L16.2604 20.8348L16.2549 20.8274L16.2529 20.8247L16.2521 20.8236L16.2517 20.8231C16.2516 20.8229 16.2514 20.8226 16.6515 20.5332L16.2514 20.8226C16.1905 20.7384 16.1577 20.6371 16.1577 20.5332V19.9071C16.1577 19.6343 16.3788 19.4133 16.6515 19.4133Z' fill='%23423636'/%3E%3Cpath d='M24.5778 13.4455C24.5643 13.323 24.4998 13.2114 24.3996 13.1369C24.2994 13.0627 24.1724 13.0321 24.0487 13.0529L17.1648 14.205H16.1299L9.24562 13.0529C9.12187 13.0321 8.99487 13.0627 8.8947 13.1369C8.79469 13.2114 8.73013 13.323 8.71663 13.4455C8.70574 13.5474 8.45531 15.9535 9.68094 17.4393C10.2169 18.0891 10.9449 18.4639 11.8455 18.5529C12.0503 18.5736 12.2558 18.5843 12.4617 18.5847C13.5239 18.5847 14.4118 18.2868 15.1061 17.6964C15.5597 17.3022 15.9161 16.8118 16.1483 16.2626H17.1465C17.3787 16.8119 17.7348 17.3022 18.1882 17.6964C18.883 18.2868 19.7704 18.5847 20.8331 18.5847H20.8333C21.039 18.5842 21.2445 18.5736 21.4493 18.5529C22.3495 18.4634 23.078 18.089 23.6138 17.4393C24.8396 15.9537 24.5892 13.5476 24.5778 13.4455Z' fill='%23423636'/%3E%3C/svg%3E%0A")
}
</style>