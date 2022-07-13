import { ILoginState } from './login/type'
import { ISystemState } from './main/system/types'

export interface IRootStore {
  entireDepartment: any[]
  entireRole: any[]
}

export interface IRootWithModule {
  login: ILoginState
  system: ISystemState
}

export type IStoreType = IRootStore & IRootWithModule
