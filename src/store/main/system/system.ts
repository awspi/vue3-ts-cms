import { Module } from 'vuex'
import { IRootStore } from '@/store/type'
import { ISystemState } from './types'
import { getPageList } from '@/service/main/system/system'
const systemMoudle: Module<ISystemState, IRootStore> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`]
      }
    },
    pageListCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`]
      }
    }
  },
  mutations: {
    changeUsersList(state, userList: any[]) {
      state.usersList = userList
    },
    changeUsersCount(state, userCount: number) {
      state.usersCount = userCount
    },
    changeRoleList(state, roleList: any[]) {
      state.roleList = roleList
    },
    changeRoleCount(state, roleCount: number) {
      state.roleCount = roleCount
    },
    changeGoodsList(state, goodsList: any[]) {
      state.goodsList = goodsList
    },
    changeGoodsCount(state, goodsCount: number) {
      state.goodsCount = goodsCount
    },
    changeMenuList(state, menuList: any[]) {
      state.menuList = menuList
    },
    changeMenuCount(state, menuCount: number) {
      state.menuCount = menuCount
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      console.log(payload)
      const pageName = payload.pageName
      const pageUrl = `${pageName}/list`
      //对页面发送请求
      const pageResult = await getPageList(pageUrl, payload.queryInfo)

      const { list, totalCount } = pageResult.data
      console.log(list)

      const ChangePageName =
        pageName.slice(0, 1).toUpperCase() + pageName.slice(1)

      commit(`change${ChangePageName}List`, list)
      commit(`change${ChangePageName}Count`, totalCount)
    }
  }
}

export default systemMoudle
