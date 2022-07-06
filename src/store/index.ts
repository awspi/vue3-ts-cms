import { createStore } from 'vuex'
import { IRootStore } from './type'
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

export default store
