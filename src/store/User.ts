import ApiService from "@/api/api";
import GousdtApi from "@/api/gousdtapi";
import { defineStore } from "pinia";
import { User, Client, Requisite } from "@/interfaces/models"

export const useUserStore = defineStore('userStore', {
  state: (): UserState => ({
    user: null,
    client: null,
    requisites: [],
    operations: null,
    showLoginModal: false,
  }),
  actions: {
    async getUser(): Promise<void> {
      const response: any = await GousdtApi.getInstance().get('/user')
      if (response) {
        this.user = response.data
      }
    },
    async getClient(): Promise<void> {
      const response: Client = await ApiService.getInstance().get('/client')
      if (response) {
        this.client = response
      }
    },
    async getRequisites(): Promise<void> {
      const response: Requisite[] = await ApiService.getInstance().get('/client/requisites')
      if (response) {
        this.requisites = response
      }
    },
    async getOperations(page: number, perPage: number): Promise<void> {
      const response: any = await ApiService.getInstance().get(`/client/operations?page=${page}&results=${perPage}`)
      if (response) {
        this.operations = response
      }
    },
    async changeName(name: string): Promise<Client> {
      const data = {
        name
      }
      const response: Client = await ApiService.getInstance().patch('/client', data)
      if (response) {
        this.client = response
      }
      return response
    },
    async changeCurrency(currency: string) {
      const data = {
        currency
      }
      const response: any = await GousdtApi.getInstance().post('/user/data/patch', data)
      if (response?.data) {
        this.user = response.data
      }
      return response
    },
    async changeLang(lang: string) {
      const data = {
        lang
      }
      const response: any = await GousdtApi.getInstance().post('/user/data/patch', data)
      if (response?.data) {
        this.user = response.data
      }
      return response
    },
    async addPaymentMethod(data: any): Promise<Requisite> {
      const response: Requisite = await ApiService.getInstance().post('/client/requisites/create', data)
      return response
    },
    async updatePaymentMethod(id: number, data: any): Promise<Requisite> {
      const response: Requisite = await ApiService.getInstance().patch(`/client/requisites/${id}/update`, data)
      return response
    },
    async removePaymentMethod(id: number): Promise<Requisite> {
      const response: Requisite = await ApiService.getInstance().patch(`/client/requisites/${id}/draft`)
      return response
    },
    openLoginModal() {
      this.showLoginModal = true
    },
    closeLoginModal() {
      this.showLoginModal = false
    },
    clearUserData() {
      this.user = null
      this.client = null
    }
  }
})


interface UserState {
  user: User | null
  client: Client | null
  requisites: Requisite[]
  operations: any[] | null
  showLoginModal: boolean
}