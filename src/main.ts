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
app.use(store).use(globalRegister)
setupStore() //注意顺序,先注册完路由再使用router
app.use(router)

app.mount('#app')
