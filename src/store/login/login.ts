import { Module } from 'vuex'
import { ILoginState } from './type'
import { IRootStore } from '../type'
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenuByRoleId
} from '../../service/login/login'
import { IAccount } from '../../service/login/type'

import localCahe from '../../utils/cache'
import { mapMenusToRoutes, mapMenusToPermissions } from '@/utils/map-menus'

import router from '@/router'
//Module<S,R> S->模块的state类型,R->根store的类型
const loginModule: Module<ILoginState, IRootStore> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permissions: []
    }
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus

      //userMenus->route
      const routes = mapMenusToRoutes(userMenus)
      routes.forEach((route) => {
        router.addRoute('main', route)
      })
      // console.log(routes)

      //获取用户按钮权限
      const permissions = mapMenusToPermissions(userMenus)
      state.permissions = permissions
    }
  },
  actions: {
    async accountLoginAction({ commit }, payload: IAccount) {
      console.log('执行login action')
      //1. 登录逻辑
      const loginResult = await accountLoginRequest(payload)
      const { id, token } = loginResult.data
      commit('changeToken', token)
      localCahe.setCache('token', token)

      //2.请求用户信息
      const userInfoResult = await requestUserInfoById(id)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      localCahe.setCache('userInfo', userInfo)

      //3.查询菜单树
      const userMenusResult = await requestUserMenuByRoleId(userInfo.role.id)
      const userMenus = userMenusResult.data
      commit('changeUserMenus', userMenus)
      localCahe.setCache('userMenus', userMenus)

      //4.跳转到首页
      router.push('/main')
    },
    loadLocalLogin({ commit }) {
      const token = localCahe.getCache('token')
      if (token) {
        commit('changeToken', token)
      }
      const userInfo = localCahe.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = localCahe.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
    // phoneLoginAction({ commit }, payload: any) {
    //   console.log('执行phone login action')
    //   console.log(payload)
    // }
  }
}

export default loginModule
