import Axios from 'axios'
import store from '../store/store.ts'
import {selectJwt} from '../store/slices/authSlice.ts'

const service = Axios.create({
  baseURL: 'http://localhost:3000',// 本地测试服务
  timeout: 5000
})

service.interceptors.request.use(
  (config) => {
    if (config.url !== '/user/login') {
      config.headers.Authorization = 'Bearer ' + selectJwt(store.getState())
    }
    return config
  },
  (error) => {
    Promise.reject(error).then()
  }
)

service.interceptors.response.use((config) => {
  // 登陆时需要从 headers 中获取 token
  if (config.request.responseURL.endsWith('/user/login')) {
    return config
  } else {
    return config.data
  }
}, (error) => {
  Promise.reject(error).then()
})

export default service
