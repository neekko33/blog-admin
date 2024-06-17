import service from './service.ts'
import {AxiosResponseData, Category} from '../index'

export function getCategories() {
  return service.get<any, AxiosResponseData<{ data: Category[], count: number }>>('category')
}

export function addCategory(name: string) {
  return service.post<any, AxiosResponseData<Category>>('category', {
    name
  })
}

export function updateCategory(id: number, name: string) {
  return service.put<any, AxiosResponseData<Category>>('category/' + id, {
    name
  })
}

export function deleteCategory(id: number) {
  return service.delete<any, AxiosResponseData<Category>>('category/' + id)
}
