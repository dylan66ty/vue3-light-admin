import { isArray, isObject } from './is'
import { pipe } from '.'

const transParams = (str) => {
  try {
    return new Function(`var _value = ${str};return _value;`)()
  } catch (error) {
    return str
  }
}

const map = {
  con({ value, params }) {
    if (!params) return value
    const fn = new Function(`if(${value}${params}){return ${value}}else{return null}`)
    return fn()
  },
  def({ value, params }) {
    const _params = transParams(params)
    if (!_params) return value
    if (value == null) return _params
    return value
  },
  fix({ value, params }) {
    const _params = transParams(params)
    if (!_params) return value
    try {
      return (+value).toFixed(_params)
    } catch (error) {
      return value
    }
  },
  num({ value }) {
    return Number(value)
  }
}

export const transform = (data: any, rules?: string[]) => {
  if (!rules) return data
  if (isObject(data)) {
    const ret = {}
    rules.forEach((rule) => {
      const tokens = rule.split('|')
      const [from, to] = tokens[0].split('->')
      const fns = tokens.slice(1).map((token) => {
        const [action, params] = token.split(':')
        return (value) => map[action]({ value, params })
      })
      ret[to.trim()] = pipe(...fns)(data[from.trim()])
    })
    return ret
  }
  if (isArray(data)) {
    const ret = []
    data.forEach((item) => {
      ret.push(transform(item, rules))
    })
    return ret
  }
  return data
}
