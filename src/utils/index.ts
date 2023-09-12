import { isPromise } from './is'

export const compose = <T = any[]>(...fns: ((...v: T[]) => T)[]) => {
  if (fns.length === 0) return (val) => val
  return fns.reduce(
    (a, v) =>
      (...args: any[]) =>
        a(v(...args))
  )
}

export const pipe = <T = any[]>(...fns: ((...v: T[]) => T)[]) => {
  if (fns.length === 0) return (val) => val
  return fns.reduceRight(
    (a, v) =>
      (...args: any[]) =>
        a(v(...args))
  )
}

export const createPromise = () => {
  const ret = {} as unknown as {
    promise: Promise<any>
    resolve: (value: unknown) => void
    reject: (value: unknown) => void
  }
  const promise = new Promise((resolve, reject) => {
    ret.resolve = resolve
    ret.reject = reject
  })
  ret.promise = promise
  return ret
}

export const to = (promiser: Promise<any>): Promise<any[]> => {
  if (!isPromise(promiser)) throw new Error('参数并不是个 promise')
  return promiser.then(
    (value) => [null, value],
    (err) => [err, null]
  )
}

export const getProp = (target: any, path: any, defVal?: any) => {
  let result
  try {
    path = path.replace(/\[(\w+)\]/g, '.$1')
    result = path
      .split('.')
      .filter((f: string) => f !== '')
      .reduce((a: any, v: string) => {
        return a[v]
      }, target)
    if (result === undefined) {
      result = defVal
    }
  } catch (e) {
    result = defVal
  }
  return result
}

export const setProp = (target: any, path: any, value: any) => {
  if (!path) return path
  path = path.replace(/\[(\w+)\]/g, `.$1`)
  const paths = path.split('.')
  paths.reduce((a: any, v: any, i: number) => {
    if (!a[v]) {
      a[v] = {}
    }
    if (i === paths.length - 1) {
      a[v] = value
    }
    return a[v]
  }, target)
  return target
}

export const extractObjProps = (obj = {}, props = [], other?: Record<string, any>) => {
  const ret = {}
  props.forEach((prop) => {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      ret[prop] = obj[prop]
    }
  })
  return { ...ret, ...other }
}

export const hasOwn = Object.prototype.hasOwnProperty

export const sleep = (delay = 0) => new Promise((resolve) => setTimeout(resolve, delay))
