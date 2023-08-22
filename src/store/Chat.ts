import { defineStore } from "pinia"
import ApiService from "@/api/api"
import { Chat, Message, Attachment } from "@/interfaces/models"

export const useChatStore = defineStore('chatStore', {
  actions: {
    async get(msid: string): Promise<Chat> {
      const response: Chat = await ApiService.getInstance().get(`/client/chat/${msid}`)
      return response
    },
    async send(data: { message: string, msid: string, wait_files: number }): Promise<Message> {
      const response: Message = await ApiService.getInstance().post('/client/chat', data)
      return response
    },
    async sendFileMessage(payload: { chatId: number, messageId: number, file: File }): Promise<Attachment> {
        const formData: FormData = new FormData();
        formData.append('chat_id', payload.chatId.toString());
        formData.append('message_id', payload.messageId.toString());
        formData.append('file', payload.file);
        const response: Attachment = await ApiService.getInstance().post('/client/chat/message/file', formData, true);
        return response
    }
  }
})