import { useUserStore } from '@/stores/users'
import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
import { storeToRefs } from 'pinia'
import { getItem } from './storage'

interface Data {
  [index: string]: unknown
}

const instance = axios.create({
  baseURL: 'http://43.140.200.245:8001/sys',
  // baseURL: 'https://api.imooc-admin.lgdsunday.cloud/api',
  timeout: 5000
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    const { token } = storeToRefs(userStore)
    if (token.value) {
      config.headers.Authorization = `Bearer ${token.value}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    const { success, message } = response.data
    if (success) {
      return response.data
    } else {
      ElMessage.error(message)
      return Promise.reject(new Error(message))
    }
  },
  (error) => {
    ElMessage.error(error.message)
    return Promise.reject(error)
  }
)

interface Http {
  get: (url: string, data?: Data, config?: AxiosRequestConfig) => Promise<AxiosResponse>
  post: (url: string, data?: Data, config?: AxiosRequestConfig) => Promise<AxiosResponse>
  put: (url: string, data?: Data, config?: AxiosRequestConfig) => Promise<AxiosResponse>
  patch: (url: string, data?: Data, config?: AxiosRequestConfig) => Promise<AxiosResponse>
  delete: (url: string, data?: Data, config?: AxiosRequestConfig) => Promise<AxiosResponse>
}

const http: Http = {
  get(url, data, config) {
    return instance.get(url, {
      params: data,
      ...config
    })
  },
  post(url, data, config) {
    return instance.post(url, data, config)
  },
  put(url, data, config) {
    return instance.put(url, data, config)
  },
  patch(url, data, config) {
    return instance.patch(url, data, config)
  },
  delete(url, data, config) {
    return instance.delete(url, {
      data,
      ...config
    })
  }
}

export default http
