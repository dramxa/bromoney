<template>
  <div v-if="loading" class="h-[100vh] w-[100vw] flex items-center justify-center">
    <Loader :size="'60px'" />
  </div>
  <div v-else>
    <Header />
    <div class="max-w-[1040px] mx-auto" style="min-height: calc(100vh - 73px - 128px);">
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/User'
import { useSettingsStore } from '@/store/Settings'
import AuthService from './services/Auth'
import Loader from './components/Loader.vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

const userStore = useUserStore()
const settingsStore = useSettingsStore()
const ac = AuthService.getInstance()
const loading = ref<boolean>(false)
const { client } = storeToRefs(userStore)

onMounted(async () => {
  if(ac.token.value) {
    loading.value = true
    try{
      await userStore.getUser()
      await userStore.getClient()
      if (client.value) {
        await settingsStore.getPsystems()
        await settingsStore.getCurrencies()
        await settingsStore.getRates()
      }
    } catch (e) {
      console.error(e)
    }
  }
  loading.value = false
})
</script>

