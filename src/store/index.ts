import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { IRootStore, IStoreType } from './type'
import login from './login/login'
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
    login
  }
})

export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
