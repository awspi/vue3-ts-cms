// import './service/axios_demo'

import { createApp } from 'vue'
import { globalRegister } from './global'
import spRequest from './service/index'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)
app.use(router)
app.use(store).use(globalRegister)

app.mount('#app')

interface DataType {
  args: object
  url: string
}

spRequest
  .get<DataType>({
    url: '/get',
    showLoading: true
  })
  .then((res) => {
    console.log(res)
    console.log(res.args)
    console.log(res.url)
  })
spRequest
  .request<DataType>({
    url: '/get',
    params: { name: 'awspi' },
    showLoading: false
  })
  .then((res) => {
    console.log(res)
    console.log(res.args)
    console.log(res.url)
  })
