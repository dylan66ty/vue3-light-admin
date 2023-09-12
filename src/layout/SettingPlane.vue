<script lang="ts" setup>
  import { computed, watch } from 'vue'
  import { Check } from '@element-plus/icons-vue'
  import { useTheme } from './hooks/useTheme'
  import { useSettingsStore } from '@/store/modules/settings'
  import { useModelValue } from '@/hooks/useModelValue'
  import { toggleClass } from '@/utils/dom'

  const settingsStore = useSettingsStore()
  const { themeColors, themeColor, changeThemeColor } = useTheme()
  const { visible } = useModelValue()

  const hiddenTagsViews = computed({
    get() {
      return settingsStore.hiddenTagsViews
    },
    set(value) {
      settingsStore.UPDATE_STATE({ key: 'hiddenTagsViews', value })
    }
  })

  const persistenceTags = computed({
    get() {
      return settingsStore.persistenceTags
    },
    set(value) {
      settingsStore.UPDATE_STATE({ key: 'persistenceTags', value })
    }
  })

  const hiddenSidebarLogo = computed({
    get() {
      return settingsStore.hiddenSidebarLogo
    },
    set(value) {
      settingsStore.UPDATE_STATE({ key: 'hiddenSidebarLogo', value })
    }
  })

  const grayFilter = computed({
    get() {
      return settingsStore.grayFilter
    },
    set(value) {
      settingsStore.UPDATE_STATE({ key: 'grayFilter', value })
    }
  })

  const weaknessFilter = computed({
    get() {
      return settingsStore.weaknessFilter
    },
    set(value) {
      settingsStore.UPDATE_STATE({ key: 'weaknessFilter', value })
    }
  })

  watch(
    [grayFilter, weaknessFilter],
    ([grayFlag, weakFlag]) => {
      toggleClass(document.documentElement, 'html-gray', grayFlag)
      toggleClass(document.documentElement, 'html-weakness', weakFlag)
    },
    {
      immediate: true
    }
  )
</script>

<template>
  <el-drawer v-model="visible" title="项目配置" size="320" append-to-body>
    <el-divider> 主题色 </el-divider>
    <ul class="flex gap-x-3 justify-center">
      <li
        v-for="(item, index) in themeColors"
        :key="index"
        :class="[
          'w-[20px] h-[20px] flex items-center justify-center rounded-sm cursor-pointer',
          index === 1 && 'border'
        ]"
        :style="{
          'background-color': item.color
        }"
        @click="changeThemeColor(item)"
      >
        <el-icon
          v-if="themeColor === item.themeColor"
          class="text-xl"
          :color="themeColor === 'light' ? '#000' : '#fff'"
        >
          <Check />
        </el-icon>
      </li>
    </ul>
    <el-divider> 界面显示 </el-divider>
    <div class="flex justify-between items-center">
      <span class="text-sm">灰色模式</span>
      <el-switch v-model="grayFilter" active-text="开" inactive-text="关" inline-prompt />
    </div>
    <div class="flex justify-between items-center mt-6">
      <span class="text-sm">色弱模式</span>
      <el-switch v-model="weaknessFilter" active-text="开" inactive-text="关" inline-prompt />
    </div>
    <div class="flex justify-between items-center mt-6">
      <span class="text-sm">隐藏标签页</span>
      <el-switch v-model="hiddenTagsViews" active-text="开" inactive-text="关" inline-prompt />
    </div>
    <div class="flex justify-between items-center mt-6">
      <span class="text-sm">标签页持久化</span>
      <el-switch v-model="persistenceTags" active-text="开" inactive-text="关" inline-prompt />
    </div>
    <div class="flex justify-between items-center mt-6">
      <span class="text-sm">隐藏侧边栏Logo</span>
      <el-switch v-model="hiddenSidebarLogo" active-text="开" inactive-text="关" inline-prompt />
    </div>
  </el-drawer>
</template>
