import type { Ref } from 'vue'
import type { FormInstance } from 'element-plus'
import { createPromise } from '@/utils'

export const formValidatePromisify = (formRef: Ref<FormInstance>): Promise<boolean> => {
  const { promise, resolve } = createPromise()
  if (formRef.value) {
    formRef.value.validate((valid) => {
      if (valid) {
        return resolve(true)
      }
      return resolve(false)
    })
  } else {
    resolve(false)
  }

  return promise
}

export const formValidateFieldPromisify = (formRef: Ref<FormInstance>, props): Promise<boolean> => {
  const { promise, resolve } = createPromise()
  if (formRef.value) {
    formRef.value.validateField(props, (valid) => {
      if (valid) {
        return resolve(true)
      }
      return resolve(false)
    })
  } else {
    resolve(false)
  }
  return promise
}
