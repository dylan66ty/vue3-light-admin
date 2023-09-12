<script lang="ts" setup>
  import { computed } from 'vue'
  import { SwitchButton, User } from '@element-plus/icons-vue'
  import { useRouter } from 'vue-router'
  import { ElMessageBox } from 'element-plus'
  import { useUserStore } from '@/store/modules/user'

  const router = useRouter()
  const userStore = useUserStore()
  const userInfo = computed(() => userStore.userInfo)
  const list = [
    {
      icon: User,
      command: 'user',
      title: '个人中心'
    },
    {
      icon: SwitchButton,
      command: 'logout',
      title: '退出系统'
    }
  ]

  const handleCommand = (command) => {
    switch (command) {
      case 'logout':
        ElMessageBox({
          title: '提示',
          message: '是否退出系统?',
          type: 'warning',
          showConfirmButton: true,
          showCancelButton: true
        }).then(
          () => {
            userStore.layout()
          },
          () => {}
        )
        break
      case 'user':
        router.push({ name: 'UserCenter' })

        break
    }
  }
</script>

<template>
  <el-dropdown class="h-full" placement="bottom" @command="handleCommand">
    <div class="h-full px-2 flex items-center cursor-pointer hover:bg-gray-100">
      <el-avatar
        class="w-[30px] h-[30px]"
        size="large"
        shape="circle"
        :src="userInfo.avatar"
        fit="fill"
      ></el-avatar>
      <span v-if="userInfo.name" class="ml-2 text-sm text-gray-500">{{ userInfo.username }}</span>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="item in list" :key="item.command" :command="item.command">
          <span class="flex items-center">
            <el-icon>
              <component :is="item.icon"></component>
            </el-icon>
            <span class="ml-1">{{ item.title }}</span>
          </span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style lang="scss"></style>
