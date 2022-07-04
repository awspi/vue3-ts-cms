import type { AxiosRequestConfig } from 'axios'

export interface SPRequestInterceptor<T = AxiosRequestConfig> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}

export interface SPRequestConfig<T = AxiosRequestConfig>
  extends AxiosRequestConfig {
  interceptors?: SPRequestInterceptor<T>
  showLoading?: boolean
}
