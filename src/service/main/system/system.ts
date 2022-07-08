import spRequest from '@/service'
import { IDataType } from '../../types'
export function getPageList(url: string, queryInfo: any) {
  return spRequest.post<IDataType>({ url: url, data: queryInfo })
}
