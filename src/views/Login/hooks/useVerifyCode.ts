import type { FormInstance } from 'element-plus'
import type { Ref } from 'vue'
import { ref } from 'vue'
import { formValidateFieldPromisify } from '@/utils/element-plus/enhance'

export const useVerifyCode = () => {
  const isDisabled = ref(false)
  const text = ref('')
  const timer = ref(null)

  const start = async (formRef: Ref<FormInstance>, props: string[], time = 60) => {
    const initTime = time
    if (!(await formValidateFieldPromisify(formRef, props))) return
    clearInterval(timer.value)
    isDisabled.value = true
    text.value = `${time}`
    timer.value = setInterval(() => {
      if (time > 0) {
        time -= 1
        text.value = `${time}`
      } else {
        text.value = ''
        isDisabled.value = false
        clearInterval(timer.value)
        time = initTime
      }
    }, 1000)
  }

  const end = () => {
    text.value = ''
    isDisabled.value = false
    clearInterval(timer.value)
  }

  return {
    isDisabled,
    timer,
    text,
    start,
    end
  }
}
