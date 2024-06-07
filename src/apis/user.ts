import service from './service.ts'
import {AxiosResponse} from 'axios'

interface AxiosResponseData<T> {
  code: number,
  message: string,
  data: T
}

interface User {
  id?: number,
  email: string,
  name?: string,
  password?: string,
}

export const login = async (data: User) => {
  return service.post<any, AxiosResponse<AxiosResponseData<User>>>('/user/login', data)
}

export const getUser = async () => {
  return service.get('/user')
}

