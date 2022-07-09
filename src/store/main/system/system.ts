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
      roleCount: 0
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`]
        // switch (pageName) {
        //   case 'users':
        //     return state.usersList
        //   case 'role':
        //     return state.roleList
        // }
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
