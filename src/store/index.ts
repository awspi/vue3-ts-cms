import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { IRootStore, IStoreType } from './type'
import login from './login/login'
import system from './main/system/system'
const store = createStore<IRootStore>({
  state() {
    return {
      name: 'pithy',
      age: 22
    }
  },
  mutations: {
    changeName(state) {
      state.name = 'awspi'
    }
  },
  modules: {
    login,
    system
  }
})

export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
