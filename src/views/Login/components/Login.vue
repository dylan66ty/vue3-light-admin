<script lang="ts" setup>
  import { Lock, User } from '@element-plus/icons-vue'
  import { ref } from 'vue'
  import type { FormInstance } from 'element-plus'
  import { useMemory } from '../hooks/useMemory'
  import { getLoginRules } from '../utils/rules'
  import ImageVerify from '@/components/ImageVerify/index.vue'
  import Motion from '@/components/Motion'
  import Code from '@/assets/svg/code.svg?component'
  import { useUserStore } from '@/store/modules/user'
  import { formValidatePromisify } from '@/utils/element-plus/enhance'

  const userStore = useUserStore()
  const { memory, getMemory, setMemory, delMemory } = useMemory()

  const cacheInfo = getMemory()

  const formRef = ref<FormInstance>()

  const form = ref({
    username: cacheInfo?.username ?? '',
    password: cacheInfo?.password ?? '',
    code: ''
  })
  const verifyCode = ref('')

  const rules = getLoginRules({ verifyCode })

  const changeMemory = () => {
    if (memory.value) {
      const { username, password } = form.value
      setMemory({ username, password })
    } else {
      delMemory()
    }
  }

  const login = async () => {
    if (!(await formValidatePromisify(formRef))) return
    changeMemory()
    await userStore.login()
  }
</script>

<template>
  <Motion :delay="100">
    <div class="w-[400px] bg-white p-4 rounded-xl">
      <el-form ref="formRef" :model="form" :rules="rules" size="large">
        <el-form-item prop="username">
          <el-input v-model="form.username" :prefix-icon="User" placeholder="账号" clearable>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            show-password
            :prefix-icon="Lock"
            clearable
            placeholder="密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="form.code" :prefix-icon="Code" placeholder="验证码" clearable>
            <template #append>
              <ImageVerify v-model:code="verifyCode" />
            </template>
          </el-input>
        </el-form-item>

        <el-form-item>
          <div class="w-full h-[20px] flex justify-between items-center">
            <el-checkbox v-model="memory">记住密码</el-checkbox>
            <el-button link type="primary" @click="userStore.switchLogonComponent('Forget')"
              >忘记密码？</el-button
            >
          </div>
        </el-form-item>

        <el-form-item>
          <el-button class="w-full" type="primary" @click="login">登录</el-button>
        </el-form-item>

        <el-form-item>
          <div class="w-full flex justify-between items-center">
            <el-button class="w-full" @click="userStore.switchLogonComponent('Register')">
              注册
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </Motion>
</template>

<style lang="scss" scoped>
  :deep(.el-input-group__append, .el-input-group__prepend) {
    padding: 0;
  }
</style>
