/**
 * Axios 请求封装工具
 * 
 * @author hgl
 * @date 2025年12月
 */
import axios from 'axios'

const request = axios.create({
 // 必须带上 http:// 和 :8080
baseURL: 'http://38.246.253.64:8081/api',
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code === 200) {
      return res
    } else {
      return Promise.reject(new Error(res.message || '请求失败'))
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default request

