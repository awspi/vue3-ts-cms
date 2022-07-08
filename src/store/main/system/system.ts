import { Module } from 'vuex'
import { IRootStore } from '@/store/type'
import { ISystemState } from './types'
import { getPageList } from '@/service/main/system/system'
const systemMoudle: Module<ISystemState, IRootStore> = {
  namespaced: true,
  state() {
    return {
      userList: [],
      userCount: 0
    }
  },
  mutations: {
    changeUserList(state, userList: any[]) {
      state.userList = userList
    },
    changeUserCount(state, userCount: number) {
      state.userCount = userCount
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      console.log(payload)
      //对页面发送请求
      const pageResult = await getPageList(payload.pageUrl, payload.queryInfo)

      const { list, totalCount } = pageResult.data
      console.log(list)

      commit('changeUserList', list)
      commit('changeUserCount', totalCount)
    }
  }
}

export default systemMoudle
