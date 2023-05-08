import { ref } from 'vue'
import { defineStore } from 'pinia'

import http from '@/utils/request'
import type { LoginForm } from '@/views/login/index.vue'
import { setItem, getItem } from '@/utils/storage'
import { TOKEN_KEY } from '@/constant'

export const useUserStore = defineStore('user', () => {
  const token = ref<string>(getItem(TOKEN_KEY) || '')

  function login(loginForm: LoginForm) {
    return http.post('/login', loginForm)
  }

  function setToken(payload: string) {
    token.value = payload
    setItem(TOKEN_KEY, token.value)
  }
  return { login, setToken }
})
