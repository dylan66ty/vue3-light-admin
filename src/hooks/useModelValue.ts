import { computed, getCurrentInstance } from 'vue'
import { hasOwn } from '@/utils'

export const useModelValue = () => {
  const instance = getCurrentInstance()
  const visible = computed({
    get() {
      if (hasOwn.call(instance?.proxy, 'modelValue')) {
        return (instance.proxy as any).modelValue
      }
      return instance?.vnode?.props?.modelValue
    },
    set(val) {
      instance.emit('update:modelValue', val)
    }
  })
  return {
    visible
  }
}
