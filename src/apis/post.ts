import service from './service'
import {AxiosResponseData, Post} from '../index'

export const getPosts = () => {
  return service.get<any, AxiosResponseData<{data: Post[], count: number}>>('post')
}

export const getPost = (id: number) => {
  return service.get<any, AxiosResponseData<Post>>(`post/${id}`)
}

export const addPost = (data: Post) => {
  return service.post<any, AxiosResponseData<Post>>('post', data)
}

export const editPost = (id: string, data: Post) => {
  return service.put<any, AxiosResponseData<Post>>('post/' + id, data)
}

export const deletePost = (id: string) => {
  return service.delete<any, AxiosResponseData<Post>>('post/' + id)
}
