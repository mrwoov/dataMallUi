import axios from 'axios'
import { message } from 'ant-design-vue'
import { useLoginUserStore } from '@/stores/useLoginUserStore.ts'

// 创建 Axios 实例
const myAxios = axios.create({
  baseURL: 'http://localhost:9000',
  //baseURL:'http://api.wooovi.cn',
  timeout: 60000
})

// 全局请求拦截器
myAxios.interceptors.request.use(
  function (config) {
    config.headers['Content-Type'] = 'application/json;charset=utf-8'
    const token = useLoginUserStore().loginUser.token
    if (token != null && token !== '') {
      config.headers.token = token
    }
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  },
)

// 全局响应拦截器
myAxios.interceptors.response.use(
  function (response) {
    const { data } = response
    if (response.config.responseType === 'blob') {
      return response
    }
    // 未登录
    if (data.code === 40100) {
      message.error('登录状态已失效，请重新登录')
      useLoginUserStore().logout()
      window.location.href = '/user/login'
      return response
    }
    return response.data
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  },
)

export default myAxios
