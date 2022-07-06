// import './service/axios_demo'

import { createApp } from 'vue'
import { globalRegister } from './global'
import 'normalize.css'
import './assets/css/index.less'

import App from './App.vue'
import router from './router'
import store from './store'
import { setupStore } from './store'
const app = createApp(App)
app.use(router)
app.use(store).use(globalRegister)
setupStore()

app.mount('#app')
