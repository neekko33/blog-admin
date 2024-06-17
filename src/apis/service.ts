import Axios from 'axios'

let jwt = localStorage.getItem('jwt')
jwt = jwt ? JSON.parse(jwt) : ''


const service = Axios.create({
  baseURL: 'http://localhost:3000',// 本地测试服务
  timeout: 5000
})

service.interceptors.request.use(
  (config) => {
    if (config.url !== '/user/login') {
      config.headers.Authorization = 'Bearer ' + jwt
    }
    return config
  },
  (error) => {
    console.error(error)
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
  console.error(error)
  Promise.reject(error).then()
})

export default service
