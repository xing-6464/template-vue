import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import http from '@/utils/request'
import type { LoginForm } from '@/views/login/index.vue'
import { setItem, getItem } from '@/utils/storage'
import { TOKEN_KEY } from '@/constant'

interface userInfo {
  [index: string]: string | number
}

export const useUserStore = defineStore('user', () => {
  const token = ref<string>(getItem(TOKEN_KEY) || '')
  const userInfo = ref<userInfo>({})

  const hasUserInfo = computed(() => {
    return JSON.stringify(userInfo) !== '{}'
  })

  // 登录
  function login(loginForm: LoginForm) {
    return http.post('/login', loginForm)
  }

  // 设置token
  function setToken(payload: string) {
    token.value = payload
    setItem(TOKEN_KEY, token.value)
  }
  // 设置用户信息
  function setUserInfo(payload: any) {
    userInfo.value = payload
  }
  // 获取用户信息
  async function getUserInfo() {
    const { data } = await http.post('/profile')
    setUserInfo(data.user)
    return data
  }

  return { token, userInfo, hasUserInfo, login, setToken, getUserInfo, setUserInfo }
})
