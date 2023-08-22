import axios from "axios"
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/User'
import { useSettingsStore } from "@/store/Settings"
import { ref, ToRef } from "@vue/runtime-core"
import ApiService from "@/api/api";
import GousdtApi from "@/api/gousdtapi"

export default class AuthService {
  private static instance?: AuthService;
  token: ToRef<string | null>;

  constructor() {
    this.token = ref(this.getToken());
  }

  static getInstance() {
      if (typeof AuthService.instance === 'undefined') {
        AuthService.instance = new AuthService();
      }
      return AuthService.instance;
  }

  public async verify(token: string) {
    const data = {
      verify_token: token,
      lang:'ru',
    }
    const response: any = await GousdtApi.getInstance().post('/auth/v2/verify', data)
    localStorage.setItem("token", response.data.token);
    this.auth()
  }

  public async auth() {
    const response: any = await GousdtApi.getInstance().get('/user/lanpay/auth')
    if (response) {
      localStorage.setItem("ltoken", response.data.token);
      localStorage.setItem("lrefreshToken", response.data.refreshToken);
      localStorage.setItem("csp", response.data.csp);
      ApiService.getInstance().updateConfig()
      const userStore = useUserStore()
      const settingsStore = useSettingsStore()
      userStore.getUser()
      await userStore.getClient()
      await settingsStore.getPsystems()
      await settingsStore.getCurrencies()
      await settingsStore.getRates()
    }
  }

  public async updateClient() {
    const response: any = await GousdtApi.getInstance().get('/user/lanpay/auth')
    if (response) {
      localStorage.setItem("ltoken", response.data.token);
      localStorage.setItem("lrefreshToken", response.data.refreshToken);
      localStorage.setItem("csp", response.data.csp);
      ApiService.getInstance().updateConfig()
      await setTimeout(()=>{}, 10)
      const userStore = useUserStore()
      const settingsStore = useSettingsStore()
      await userStore.getClient()
      await settingsStore.getPsystems()
      await settingsStore.getCurrencies()
      await settingsStore.getRates()
    }
  }

  // public setToken(token: string, refresh_token: string) {
  //   localStorage.setItem('token', token)
  //   localStorage.setItem('refresh_token', refresh_token)
  //   axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  // }

  public setToken(token: string | null) {
    if (token) localStorage.setItem("token", token);
    else {
        this.logout()
        const router = useRouter()
        if(router) router.push('/')
    }
    this.token.value = token;
}

  public setLanpayToken(token: string, refreshToken: string) {
    localStorage.setItem('ltoken', token)
    localStorage.setItem('lrefreshToken', refreshToken)
    axios.defaults.headers.common['X-Token'] = token
  }

  public getToken() {
    const token = localStorage.getItem('token');
    if (token) {
      ApiService.getInstance().updateConfig()
      return token;
    }
    return null;
  }

  public logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('ltoken')
    localStorage.removeItem('lrefreshToken')
    localStorage.removeItem('csp')
    const userStore = useUserStore()
    userStore.clearUserData()
  }
}