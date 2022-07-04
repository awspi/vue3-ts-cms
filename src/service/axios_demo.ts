import axios from 'axios'

//axios实例对象
//1.模拟get请求
axios.get('https://cdn.mdeer.com/data/yqstaticdata.js').then((res) => {
  console.log(res.data)
})
//常见的配置选项
axios.defaults.baseURL = 'http://httpbin.org/'
axios.defaults.timeout = 10000

//
//2.get请求 传入参数
//模拟get请求
axios
  .get('/get', {
    params: {
      name: 'pithy',
      age: 22
    }
  })
  .then((res) => {
    console.log(res.data)
  })

//3.post请求
axios
  .post('/post', {
    data: {
      name: 'awspi',
      age: 22
    }
  })
  .then((res) => {
    console.log(res.data)
  })

//axios.all
axios
  .all([
    axios.get('/get', { params: { name: '1', age: 22 } }),
    axios.get('/get', { params: { name: '2', age: 22 } })
  ])
  .then((res) => {
    console.log(res[0].data)
    console.log(res[1].data)
  })

//axios拦截器interceptors
axios.interceptors.request.use(
  (config) => {
    //do  something
    return config
  },
  (err) => {
    console.log('error')
    return err
  }
)
axios.interceptors.response.use(
  (res) => {
    //do someting
    return res
  },
  (err) => {
    console.log('error')
    return err
  }
)
