import service from './service.ts'
import {AxiosResponseData, Tag} from '../index'

export function getTags() {
  return service.get<any, AxiosResponseData<{data: Tag[], count: number}>>('tag')
}
