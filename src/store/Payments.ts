import { defineStore } from "pinia"
import ApiService from "@/api/api"
import { OperationObj } from "@/interfaces/models"

export const usePaymentsStore = defineStore('paymentsStore', {
  actions: {
    async checkReadyToPay(): Promise<any> {
      const response: any = await ApiService.getInstance().get('/client/readyToPay')
      return response
    },
    async create(data: { amount: number, currency_id: number, psystem_id: number }): Promise<OperationObj> {
      const response: OperationObj = await ApiService.getInstance().post('/client/payments/create', data)
      return response
    },
    async confirm(data: { msid: string }): Promise<OperationObj> {
      const response: OperationObj = await ApiService.getInstance().post('/client/payments/confirm', data)
      return response
    },
    async cancel(data: { msid: string }): Promise<string> {
      const response: string = await ApiService.getInstance().patch('/client/payments/cancel', data)
      return response
    },
    async getPayment(msid: string): Promise<OperationObj> {
      const response: OperationObj = await ApiService.getInstance().get(`/client/payments/get/${msid}`)
      return response
    }
    
  }
})