//service 统一出口
import SPRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'

const spRequest = new SPRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      const token = '1213'
      if (token) {
        // config.headers!.Authorization = `Bearer ${token}`
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`
        }
      }

      return config
    },
    requestInterceptorCatch: (err) => {
      return err
    }
  }
})
export default spRequest
