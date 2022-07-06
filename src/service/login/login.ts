import spRequest from '../index'
import { IAccount, IDataType, ILogionResult } from './type'

enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/',
  UserMenus = '/role/' //+id+'menu'
}

export function accountLoginRequest(account: IAccount) {
  return spRequest.post<IDataType<ILogionResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}
export function requestUserInfoById(id: number) {
  return spRequest.get<IDataType>({
    showLoading: false,
    url: LoginAPI.LoginUserInfo + id
  })
}
export function requestUserMenuByRoleId(id: number) {
  return spRequest.get<IDataType>({
    url: LoginAPI.UserMenus + id + '/menu'
  })
}
