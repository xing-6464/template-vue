import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import http from '@/utils/request'
import type { LoginForm } from '@/views/login/index.vue'
import { setItem, getItem, removeAllItems } from '@/utils/storage'
import { TOKEN_KEY, USER_INFO_KEY } from '@/constant'
import router from '@/router'

interface userInfo {
  [index: string]: string | number
}

export const useUserStore = defineStore('user', () => {
  const token = ref<string>(getItem(TOKEN_KEY) || '')
  const userInfo = ref<userInfo>(getItem(USER_INFO_KEY) || {})

  // 登录
  function login(loginForm: LoginForm) {
    return http.post('/login', loginForm)
  }
  // 退出登录
  async function logout() {
    await http.post('/logout')
    setToken('')
    setUserInfo({})
    removeAllItems()
    router.push('/login')
  }
  // 设置token
  function setToken(payload: string) {
    token.value = payload
    setItem(TOKEN_KEY, payload)
  }
  // 设置用户信息
  function setUserInfo(payload: any) {
    userInfo.value = payload
    setItem(USER_INFO_KEY, payload)
  }
  // 获取用户信息
  async function getUserInfo() {
    const { data } = await http.post('/profile')
    setUserInfo(data.user)
    return data
  }

  return { token, userInfo, login, setToken, getUserInfo, setUserInfo, logout }
})
