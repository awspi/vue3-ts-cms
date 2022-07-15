import { ILoginState } from './login/type'
import { ISystemState } from './main/system/types'
import { IDashboardState } from './main/analysis/dashboard/type'
export interface IRootStore {
  entireDepartment: any[]
  entireRole: any[]
  entireMenu: any[]
}

export interface IRootWithModule {
  login: ILoginState
  system: ISystemState
  dashboard: IDashboardState
}

export type IStoreType = IRootStore & IRootWithModule
