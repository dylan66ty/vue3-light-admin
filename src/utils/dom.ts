import type { CSSProperties } from 'vue'
import { isObject } from './is'
import { toCamelCase } from './convertCase'

export const toggleClass = (target: HTMLElement, cls: string, flag: boolean) => {
  if (!target) return
  let { className } = target
  className = className.replace(cls, '').trim()
  target.className = flag ? `${className} ${cls} ` : className
}

export const getStyle = (element: HTMLElement, styleName: keyof CSSProperties): string => {
  if (!element || !styleName) return ''

  let key = toCamelCase(styleName)
  if (key === 'float') key = 'cssFloat'
  try {
    const style = (element.style as any)[key]
    if (style) return style
    const computed: any = document.defaultView?.getComputedStyle(element, '')
    return computed ? computed[key] : ''
  } catch {
    return (element.style as any)[key]
  }
}

export const setStyle = (
  element: HTMLElement,
  styleName: CSSProperties | keyof CSSProperties,
  value?: string | number
) => {
  if (!element || !styleName) return
  if (isObject(styleName)) {
    Object.entries(styleName).forEach(([prop, value]) =>
      setStyle(element, prop as any, value as string)
    )
  } else {
    const key: any = toCamelCase(styleName as keyof CSSProperties)
    element.style[key] = value as any
  }
}
