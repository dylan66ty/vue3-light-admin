import { type VNode } from 'vue'
import { type MessageHandler, ElMessage } from 'element-plus'
import { isFunction } from './is'

interface MessageParams {
  type?: 'info' | 'success' | 'warning' | 'error'
  icon?: any
  dangerouslyUseHTMLString?: boolean
  duration?: number
  showClose?: boolean
  center?: boolean
  offset?: number
  appendTo?: string | HTMLElement
  grouping?: boolean
  onClose?: Function | null
}

const message = (
  message: string | VNode | (() => VNode),
  params?: MessageParams
): MessageHandler => {
  const {
    icon,
    type = 'info',
    dangerouslyUseHTMLString = false,
    duration = 2000,
    showClose = false,
    center = false,
    offset = 20,
    appendTo = document.body,
    grouping = false,
    onClose
  } = params

  return ElMessage({
    message,
    type,
    icon,
    dangerouslyUseHTMLString,
    duration,
    showClose,
    center,
    offset,
    appendTo,
    grouping,
    customClass: 'antd',
    onClose: () => (isFunction(onClose) ? onClose() : null)
  })
}

const closeAllMessage = (): void => ElMessage.closeAll()

export { message, closeAllMessage }
