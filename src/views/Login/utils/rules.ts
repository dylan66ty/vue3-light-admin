import type { Ref } from 'vue'
import { defineFormRules } from '@/utils/element-plus/define'

export const RE_6 = /^\d{6}$/

export const RE_PWD =
  /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)]|[()])+$)(?!^.*[\u4E00-\u9FA5].*$)([^(0-9a-zA-Z)]|[()]|[a-z]|[A-Z]|[0-9]){6,18}$/

export const RE_PHONE = /^1([3456789][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/

// 登录表单
export const getLoginRules = ({ verifyCode }: { verifyCode: Ref<string> }) => {
  return defineFormRules({
    username: [
      {
        required: true,
        trigger: ['blur'],
        message: '请输入账号'
      }
    ],
    password: [
      {
        required: true,
        trigger: ['blur'],
        validator: (_rule, value, callback) => {
          if (!value) {
            return callback(new Error('请输入密码'))
          }
          if (!RE_PWD.test(value)) {
            return callback(new Error('密码格式应为6-18位数字、字母、符号的任意两种组合'))
          }
          callback()
        }
      }
    ],
    code: [
      {
        required: true,
        trigger: ['blur'],
        validator(_rule, value, callback) {
          if (!value) {
            return callback(new Error('请输入验证码'))
          }
          if (value !== verifyCode.value) {
            return callback(new Error('验证码错误'))
          }
          callback()
        }
      }
    ]
  })
}

// 注册表单
export const getRegisterRules = (form: Ref<Record<string, any>>) => {
  return defineFormRules({
    username: [
      {
        required: true,
        trigger: ['blur'],
        message: '请输入账号'
      }
    ],
    phone: [
      {
        required: true,
        trigger: ['blur'],
        validator(_rule, value, callback) {
          if (!value) {
            return callback(new Error('请输入手机号'))
          }
          if (!RE_PHONE.test(value)) {
            return callback(new Error('请输入正确的手机号'))
          }
          callback()
        }
      }
    ],
    phoneCode: [
      {
        required: true,
        trigger: ['blur'],
        validator(_rule, value, callback) {
          if (!value) {
            return callback(new Error('请输入验证码'))
          }
          if (!RE_6.test(value)) {
            return callback(new Error('请输入6位数验证码'))
          }
          callback()
        }
      }
    ],
    password: [
      {
        required: true,
        trigger: ['blur'],
        validator(_rule, value, callback) {
          if (!value) {
            return callback(new Error('请输入密码'))
          }
          if (!RE_PWD.test(value)) {
            return callback(new Error('密码格式应为6-18位数字、字母、符号的任意两种组合'))
          }
          callback()
        }
      }
    ],
    passwordAgain: [
      {
        required: true,
        trigger: ['blur'],
        validator(_rule, value, callback) {
          if (!value) {
            return callback(new Error('请输入确认密码'))
          }
          if (!RE_PWD.test(value)) {
            return callback(new Error('密码格式应为6-18位数字、字母、符号的任意两种组合'))
          }
          if (form.value.password !== value) {
            return callback(new Error('两次密码不一致'))
          }
          callback()
        }
      }
    ]
  })
}

// 忘记密码
export const getForgetRules = (form: Ref<Record<string, any>>) => {
  return defineFormRules({
    phone: [
      {
        required: true,
        trigger: ['blur'],
        validator(_rule, value, callback) {
          if (!value) {
            return callback(new Error('请输入手机号'))
          }
          if (!RE_PHONE.test(value)) {
            return callback(new Error('请输入正确的手机号'))
          }
          callback()
        }
      }
    ],
    phoneCode: [
      {
        required: true,
        trigger: ['blur'],
        validator(_rule, value, callback) {
          if (!value) {
            return callback(new Error('请输入验证码'))
          }
          if (!RE_6.test(value)) {
            return callback(new Error('请输入6位数验证码'))
          }
          callback()
        }
      }
    ],
    password: [
      {
        required: true,
        trigger: ['blur'],
        validator(_rule, value, callback) {
          if (!value) {
            return callback(new Error('请输入密码'))
          }
          if (!RE_PWD.test(value)) {
            return callback(new Error('密码格式应为6-18位数字、字母、符号的任意两种组合'))
          }
          callback()
        }
      }
    ],
    passwordAgain: [
      {
        required: true,
        trigger: ['blur'],
        validator(_rule, value, callback) {
          if (!value) {
            return callback(new Error('请输入确认密码'))
          }
          if (!RE_PWD.test(value)) {
            return callback(new Error('密码格式应为6-18位数字、字母、符号的任意两种组合'))
          }
          if (form.value.password !== value) {
            return callback(new Error('两次密码不一致'))
          }
          callback()
        }
      }
    ]
  })
}
