import type {
  AxiosInstance,
  AxiosRequestConfig,
  CustomParamsSerializer,
  AxiosResponse,
  AxiosError,
  Method
} from 'axios'
import Axios from 'axios'
import { stringify } from 'qs'
import NProgress from '../progress'

import { WHITE_LIST, FORM_HEADERS, JSON_HEADERS } from './config'

// 相关配置请参考：www.axios-js.com/zh-cn/docs/#axios-request-config-1
const defaultConfig: AxiosRequestConfig = {
  // 请求超时时间
  timeout: 10000,
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  paramsSerializer: {
    serialize: stringify as unknown as CustomParamsSerializer
  }
}

class HttpRequest {
  constructor() {
    this.httpInterceptorsRequest()
    this.httpInterceptorsResponse()
  }
  private static axiosInstance: AxiosInstance = Axios.create(defaultConfig)

  // 请求拦截
  private httpInterceptorsRequest(): void {
    HttpRequest.axiosInstance.interceptors.request.use(
      async (config: AxiosRequestConfig): Promise<any> => {
        // 开启进度条动画
        NProgress.start()
        // 请求白名单，放置一些不需要token的接口
        return WHITE_LIST.find((url) => url === config.url)
          ? config
          : new Promise((resolve) => {
              // 具体逻辑自行完善
              // 获取token token过期等
              config.headers['Authorization'] = `token`
              resolve(config)
            })
      },
      (error) => {
        return Promise.reject(error)
      }
    )
  }

  // 响应拦截
  private httpInterceptorsResponse(): void {
    HttpRequest.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        // 关闭进度条动画
        NProgress.done()
        return response.data
      },
      (error: AxiosError) => {
        // 关闭进度条动画
        NProgress.done()
        return Promise.reject(error)
      }
    )
  }

  // 请求函数
  public request<T>(
    method: Method,
    url: string,
    param?: AxiosRequestConfig,
    axiosConfig?: AxiosRequestConfig
  ): Promise<T> {
    const config = {
      method,
      url,
      ...param,
      ...axiosConfig
    } as AxiosRequestConfig
    // 单独处理自定义请求/响应回调
    return new Promise((resolve, reject) => {
      HttpRequest.axiosInstance
        .request(config)
        .then((response: any) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  // post json 请求
  public postJson<T, P>(
    url: string,
    params?: AxiosRequestConfig<T>,
    config?: AxiosRequestConfig
  ): Promise<P> {
    return this.request<P>('post', url, params, {
      headers: {
        ...JSON_HEADERS
      },
      ...config
    })
  }

  // post form 请求
  public postForm<T, P>(
    url: string,
    params?: AxiosRequestConfig<T>,
    config?: AxiosRequestConfig
  ): Promise<P> {
    return this.request<P>('post', url, params, {
      headers: {
        ...FORM_HEADERS
      },
      ...config
    })
  }

  // get请求
  public get<T, P>(
    url: string,
    params?: AxiosRequestConfig<T>,
    config?: AxiosRequestConfig
  ): Promise<P> {
    return this.request<P>('get', url, params, config)
  }
}

export const request = new HttpRequest()
