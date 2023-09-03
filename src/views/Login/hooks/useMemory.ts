import { ref } from 'vue'
import { storage } from '@/utils/storage'

const KEY = 'LOGIN_MEMORY'

export const useMemory = () => {
  const memory = ref(!!storage.getItem(KEY))

  const getMemory = () => {
    return storage.getItem(KEY)
  }

  const setMemory = (data: any) => {
    if (data) {
      storage.setItem(KEY, data, { encode: true })
    }
  }

  const delMemory = () => {
    if (storage.getItem(KEY)) {
      storage.removeItem(KEY)
    }
  }

  return {
    memory,
    getMemory,
    setMemory,
    delMemory
  }
}
