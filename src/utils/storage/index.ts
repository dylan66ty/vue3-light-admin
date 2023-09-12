interface StorageOptions {
  expires?: number
  encode?: boolean
}

interface StorageData {
  data: any
  _timestamp?: number
  _expires?: number
  _encode?: boolean
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
 *  - expires 数据过期时间 默认值 0
 *  - encode 是否对存入storage中的数据进行base64编码 默认值 false
 */
class Storage implements StorageMethods {
  private encode(data: unknown, flag: boolean) {
    return flag ? window.btoa(JSON.stringify(data)) : data
  }
  private decode(data: unknown, flag: boolean) {
    return flag ? JSON.parse(window.atob(data as string)) : data
  }
  public getItem(key: string) {
    try {
      const storageData: StorageData = JSON.parse(localStorage.getItem(key))
      if (Object.prototype.hasOwnProperty.call(storageData || {}, '_timestamp')) {
        const curTimestamp = new Date().getTime()
        const { _expires = 0, _timestamp = 0 } = storageData
        if (curTimestamp - _timestamp >= _expires && _expires !== 0) {
          return null
        }
        return this.decode(storageData.data, storageData._encode)
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
      const initOptions = {
        _expires: options?.expires ?? 0,
        _encode: options?.encode ?? false
      }
      const storageData = {
        data: this.encode(data, initOptions._encode),
        _timestamp: new Date().getTime(),
        ...initOptions
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
