import { it, describe, expect } from 'vitest'
import { storage } from '../storage'

describe('storage 本地存储', () => {
  it('storage.getItem null', () => {
    const val = storage.getItem('key')
    expect(val).toEqual(null)
  })
  it('storage.getItem by localStorage.setItem', () => {
    localStorage.setItem('key2', JSON.stringify({ a: 1 }))
    const val = storage.getItem('key2')
    expect(val).toEqual({ a: 1 })
  })
  it('storage.getItem by storage.setItem', () => {
    storage.setItem('key3', { a: 1 })
    const val = storage.getItem('key3')
    expect(val).toEqual({ a: 1 })
  })
  it('expires', async () => {
    storage.setItem('key4', { a: 1 }, { expires: 1000 })
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const val = storage.getItem('key4')
    expect(val).toEqual(null)
  })
  it('encode', async () => {
    const data = { a: 1 }
    storage.setItem('key5', data, { encode: true })
    const wrapper = JSON.parse(localStorage.getItem('key5'))
    const encode = window.btoa(JSON.stringify(data))
    expect(encode).toEqual(wrapper.data)
  })
})
