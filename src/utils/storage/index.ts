import { isObject } from '../is'

interface StorageOptions {
  expires?: number
  encode?: boolean
}

interface StorageData extends StorageOptions {
  data: any
  __timestamp?: number
}

interface StorageMethods {
  getItem(key: string): any
  setItem(key, data: unknown, options?: StorageOptions): any
  removeItem(key: string): any
  clear(key: string): any
}

/**
 * localStorage封装。添加额外功能:
 * 1. 数据可以设置过期时间，超出过期时间获取的数据都为 null
 * 2. 数据可进行base64编码（注意是编码，不是加密！前端本地加密都是徒劳～）
 * options
 *  - express 数据过期时间 默认值 undefined
 *  - encode 是否对存入storage中的数据进行base64编码 默认值 false
 */
class Storage implements StorageMethods {
  private encode(data: string, flag) {
    return flag ? window.btoa(data) : data
  }
  private decode(data: string, flag) {
    try {
      return flag ? JSON.parse(window.atob(data)) : data
    } catch (error) {
      return flag ? window.atob(data) : data
    }
  }
  public getItem(key: string) {
    try {
      const storageData: StorageData = JSON.parse(localStorage.getItem(key))
      if (!isObject(storageData)) return storageData
      if (Object.prototype.hasOwnProperty.call(storageData, '__timestamp')) {
        const curTimestamp = new Date().getTime()
        const { expires = 0, __timestamp = 0 } = storageData
        if (!expires) {
          return this.decode(storageData.data, storageData.encode)
        }
        if (curTimestamp - __timestamp > expires) {
          return null
        }
        return this.decode(storageData.data, storageData.encode)
      } else {
        return storageData
      }
    } catch (error) {
      console.log(error)
      return localStorage.getItem(key)
    }
  }
  public setItem(key, data: unknown, options?: StorageOptions) {
    try {
      const initOptions: StorageOptions = { expires: 0, ...options }
      const storageData = {
        ...initOptions,
        __timestamp: new Date().getTime(),
        data: this.encode(JSON.stringify(data), options.encode)
      }
      localStorage.setItem(key, JSON.stringify(storageData))
    } catch (error) {
      console.log(error)
    }
  }
  public removeItem(key: string) {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.log(console.log(error))
    }
  }
  public clear() {
    try {
      localStorage.clear()
    } catch (error) {
      console.log(error)
    }
  }
}

export const storage = new Storage()
