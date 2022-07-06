import { ILoginState } from './login/type'

export interface IRootStore {
  name: string
  age: number
}

export interface IRootWithModule {
  login: ILoginState
}

export type IStoreType = IRootStore & IRootWithModule
