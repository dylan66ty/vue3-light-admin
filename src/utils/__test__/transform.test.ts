import { it, describe, expect } from 'vitest'
import { transform } from '../transform'

describe('transform 数据转换映射器', () => {
  it('object', () => {
    const from = { a: 1 }
    const to = transform(from, ['a->b'])
    expect(to).toEqual({ b: 1 })
  })

  it('array', () => {
    const from = [{ a: 1 }, { a: 2 }]
    const to = transform(from, ['a->b|fix:2'])
    expect(to).toEqual([{ b: '1.00' }, { b: '2.00' }])
  })

  it('number', () => {
    const from = { a: '100' }
    const to = transform(from, ['a->b|num'])
    expect(to).toEqual({ b: 100 })
  })

  it('condition', () => {
    const from = { a: 1 }
    const to = transform(from, ['a->b|con:<10'])
    expect(to).toEqual({ b: 1 })
  })

  it('toFixed', () => {
    const from = { a: 9.643 }
    const to = transform(from, ['a->b|fix:2'])
    expect(to).toEqual({ b: '9.64' })
  })

  it('default', () => {
    const from = { a: null }
    const to = transform(from, ['a->b|def:-'])
    expect(to).toEqual({ b: '-' })
  })
})
