<script lang="ts" setup>
  import { Setting } from '@element-plus/icons-vue'
  import { ref } from 'vue'
  import SettingPlane from '@/layout/SettingPlane.vue'

  const visible = ref(false)
</script>

<template>
  <div
    class="h-full px-3 flex items-center cursor-pointer hover:bg-gray-100"
    @click="visible = true"
  >
    <el-icon>
      <Setting />
    </el-icon>
  </div>
  <SettingPlane v-model="visible" />
</template>
