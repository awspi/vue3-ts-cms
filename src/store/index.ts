import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      name: 'pithy'
    }
  }
})

export default store
