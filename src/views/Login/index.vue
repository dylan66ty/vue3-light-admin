<script lang="ts" setup>
  import { computed } from 'vue'
  import Login from './components/Login.vue'
  import Register from './components/Register.vue'
  import Forget from './components/Forget.vue'
  import { useUserStore } from '@/store/modules/user'
  import Typeit from '@/components/Typeit'

  const componentMap = {
    Login,
    Register,
    Forget
  }

  const userStore = useUserStore()
  const loginComponent = computed(() => componentMap[userStore.loginComponent])
</script>

<template>
  <div class="w-full h-full bg-slate-100 flex flex-col items-center justify-center">
    <h1 class="app-title">
      <Typeit :strings="['Light Admin']" />
    </h1>
    <component :is="loginComponent"></component>
  </div>
</template>

<style lang="scss" scoped>
  :deep(.el-input-group__append, .el-input-group__prepend) {
    padding: 0;
  }

  .app-title {
    font: 700 210% Consolas, Monaco, monospace;
    margin-bottom: 15px;
  }
</style>
