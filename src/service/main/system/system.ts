import spRequest from '@/service'
import { IDataType } from '../../types'
export function getPageList(url: string, queryInfo: any) {
  return spRequest.post<IDataType>({ url: url, data: queryInfo })
}

//url:users/id
export function deletePageData(url: string) {
  return spRequest.delete<IDataType>({ url: url })
}

export function createPageData(url: string, newData: any) {
  return spRequest.post<IDataType>({
    url,
    data: newData
  })
}

export function editPageData(url: string, editData: any) {
  return spRequest.patch<IDataType>({
    url,
    data: editData
  })
}
