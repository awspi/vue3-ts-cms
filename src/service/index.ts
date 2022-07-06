//service 统一出口
import SPRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'
import localChache from '../utils/cache'
const spRequest = new SPRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      const token = localChache.getCache('token') ?? ''

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
