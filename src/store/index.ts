import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { IRootStore, IStoreType } from './type'
import login from './login/login'
import system from './main/system/system'
import dashboard from './main/analysis/dashboard'
import { getPageList } from '@/service/main/system/system'

const store = createStore<IRootStore>({
  state() {
    return {
      entireDepartment: [],
      entireRole: [],
      entireMenu: []
    }
  },
  mutations: {
    chanegEntireDepartment(state, list) {
      state.entireDepartment = list
    },
    chanegEntireRole(state, list) {
      state.entireRole = list
    },
    changeEntireMenu(state, list) {
      state.entireMenu = list
    }
  },
  actions: {
    async getInitialDataAction({ commit }) {
      const departmentRes = await getPageList('/department/list', {
        offset: 0,
        size: 100
      })
      const { list: department } = departmentRes.data

      const roleRes = await getPageList('/role/list', {
        offset: 0,
        size: 100
      })
      const { list: role } = roleRes.data

      //
      const menuResult = await getPageList('/menu/list', {})

      const { list: menuList } = menuResult.data

      commit('changeEntireMenu', menuList)

      commit('chanegEntireDepartment', department)
      commit('chanegEntireRole', role)
    }
  },
  modules: {
    login,
    system,
    dashboard
  }
})

export function setupStore() {
  store.dispatch('login/loadLocalLogin')
  store.dispatch('getInitialDataAction')
}

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
