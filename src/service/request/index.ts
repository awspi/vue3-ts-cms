import type { AxiosInstance } from 'axios'
import axios from 'axios'
import { SPRequestInterceptor, SPRequestConfig } from './type'
import { ElLoading } from 'element-plus'
import type { LoadingInstance } from 'element-plus/lib/components/loading/src/loading'
//loading
import 'element-plus/theme-chalk/el-loading.css'
import 'element-plus/theme-chalk/el-message.css'

const DEFAULT_LOADING = true

class SPRequest {
  instance: AxiosInstance
  interceptors?: SPRequestInterceptor
  loading?: LoadingInstance
  showLoading: boolean

  constructor(config: SPRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors

    this.showLoading = config.showLoading ?? DEFAULT_LOADING

    //从config中取出对应实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )
    //添加所有实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        //是否需要加载Loading

        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: 'Loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
        }

        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        //移除loading
        this.loading?.close()
        return res.data
      },
      (err) => {
        //移除loading
        this.loading?.close()
        return err
      }
    )
  }

  request<T = any>(config: SPRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 1.单个请求对请求config的处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      // 2.判断是否需要显示loading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          //每次请求后 showloading恢复成true 不影响下一次
          this.showLoading = DEFAULT_LOADING

          resolve(res)
        })
        .catch((err) => {
          //每次请求后 showloading恢复成true 不影响下一次
          this.showLoading = DEFAULT_LOADING
          reject(err)
        })
    })
  }
  get<T = any>(config: SPRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }
  post<T = any>(config: SPRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
  delete<T = any>(config: SPRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
  patch<T = any>(config: SPRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default SPRequest
