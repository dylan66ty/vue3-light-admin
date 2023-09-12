<script setup lang="ts">
  import { computed, onUnmounted, ref } from 'vue'
  import { Iphone, Lock } from '@element-plus/icons-vue'
  import type { FormInstance } from 'element-plus'
  import { useVerifyCode } from '../hooks/useVerifyCode'
  import { getRules } from '../utils/rules'
  import Code from '@/assets/svg/code.svg?component'
  import { useUserStore } from '@/store/modules/user'
  import Motion from '@/components/Motion'
  import { formValidatePromisify } from '@/utils/element-plus/enhance'
  import { extractObjProps } from '@/utils'

  const userStore = useUserStore()
  const { isDisabled, text, start, end } = useVerifyCode()

  const formRef = ref<FormInstance>()
  const form = ref({
    phone: '',
    phoneCode: '',
    password: '',
    passwordAgain: ''
  })

  const rules = extractObjProps(getRules(form), Object.keys(form.value))

  const phoneCodeText = computed(() => {
    return text.value.length > 0 ? `${text.value}秒后重新获取` : '获取验证码'
  })

  const getPhoneCode = () => {
    start(formRef, ['phone'])
  }

  const update = async () => {
    if (!(await formValidatePromisify(formRef))) return
  }
  const back = () => {
    userStore.SWITCH_COMPONENT('Login')
  }

  onUnmounted(() => {
    end()
  })
</script>

<template>
  <Motion :delay="100">
    <div class="w-[400px] bg-white p-4 rounded-xl">
      <el-form ref="formRef" :model="form" :rules="rules" size="large">
        <el-form-item prop="phone">
          <el-input v-model="form.phone" :prefix-icon="Iphone" clearable placeholder="手机号码">
          </el-input>
        </el-form-item>
        <el-form-item prop="phoneCode">
          <div class="w-full flex justify-between">
            <el-input
              v-model="form.phoneCode"
              clearable
              placeholder="短信验证码"
              :prefix-icon="Code"
            />
            <el-button :disabled="isDisabled" class="ml-2" @click="getPhoneCode">
              {{ phoneCodeText }}
            </el-button>
          </div>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            show-password
            :prefix-icon="Lock"
            placeholder="密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="passwordAgain">
          <el-input
            v-model="form.passwordAgain"
            show-password
            :prefix-icon="Lock"
            placeholder="确认密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="w-full" type="primary" @click="update">确认</el-button>
        </el-form-item>
        <el-form-item>
          <el-button class="w-full" @click="back">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </Motion>
</template>
