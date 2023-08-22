import { defineStore } from "pinia"
import ApiService from "@/api/api"
import { Rates, Currency, Psystem } from "@/interfaces/models"

export const useSettingsStore = defineStore('settingsStore', {
  state: (): SettingsState => ({
    currencies: null,
    psystems: null,
    buy: null,
    sell: null,
  }),
  actions: {
    async getCurrencies(): Promise<void> {
      const response: Currency[] = await ApiService.getInstance().get('/client/currencies')
      if (response) {
        this.currencies = response
      }
    },
    async getPsystems(): Promise<void> {
      const response: Psystem[] = await ApiService.getInstance().get('/client/psystems')
      if (response) {
        this.psystems = response
      }
    },
    async getAllPsystems(): Promise<Psystem[]> {
      const response: Psystem[] = await ApiService.getInstance().get('/client/ps/list')
      return response
    },
    async getRates(): Promise<void> {
      const response: Rates = await ApiService.getInstance().get('/client/rates')
      if (response) {
        this.buy = response.buy
        this.sell = response.sell
      }
    },
  }
})

interface SettingsState {
  currencies: Currency[] | null
  psystems: Psystem[] | null
  buy: number | null
  sell: number | null
}