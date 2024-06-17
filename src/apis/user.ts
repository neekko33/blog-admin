import service from './service.ts'
import {AxiosResponse} from 'axios'
import {User, AxiosResponseData} from '../index'

export const login = async (data: User) => {
  return service.post<any, AxiosResponse<AxiosResponseData<User>>>('/user/login', data)
}

export const getUser = async () => {
  return service.get('/user')
}

