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
//element 国际化
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
app.use(ElementPlus, {
  locale: zhCn
})
app.mount('#app')
