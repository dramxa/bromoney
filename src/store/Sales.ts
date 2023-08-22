import { defineStore } from "pinia"
import ApiService from "@/api/api"
import { OperationObj } from "@/interfaces/models"

export const useSalesStore = defineStore('salesStore', {
  actions: {
    async create(data: { amount: number, requisite_id: number }): Promise<OperationObj> {
      const response: OperationObj = await ApiService.getInstance().post('/client/sales/create', data)
      return response
    },
    async appeal(data: { msid: string }): Promise<OperationObj> {
      const response: OperationObj = await ApiService.getInstance().patch('/client/sales/appeal', data)
      return response
    },
    async confirm(data: { msid: string }): Promise<OperationObj> {
      const response: OperationObj= await ApiService.getInstance().patch('/client/sales/confirm', data)
      return response
    },
    async cancel(data: { msid: string }): Promise<string> {
      const response: string = await ApiService.getInstance().patch('/client/sales/cancel', data)
      return response
    },
    async getSale(msid: string): Promise<OperationObj> {
      const response: OperationObj = await ApiService.getInstance().get(`/client/sales/get/${msid}`)
      return response
    }
  }
})
