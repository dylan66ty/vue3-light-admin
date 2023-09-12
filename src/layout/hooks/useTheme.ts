import { computed, ref, watch } from 'vue'
import type { ThemeColor } from '../types'
import { useSettingsStore } from '@/store/modules/settings'
import { lighten } from '@/utils/colors'

export const useTheme = () => {
  const themeColors = ref<ThemeColor[]>([
    /* 深蓝（默认） */
    { color: '#2355f5', themeColor: 'default' },
    /* 亮白色 */
    { color: '#ffffff', themeColor: 'light' },
    /* 猩红色 */
    { color: '#f5222d', themeColor: 'scarlet' },
    /* 橙红色 */
    { color: '#fa541c', themeColor: 'orangeRed' },
    /* 金色 */
    { color: '#fadb14', themeColor: 'gold' },
    /* 绿宝石 */
    { color: '#13c2c2', themeColor: 'emerald' },
    /* 酸橙绿 */
    { color: '#52c41a', themeColor: 'limeGreen' },
    /* 深粉色 */
    { color: '#eb2f96', themeColor: 'deepPink' },
    /* 深紫罗兰色 */
    { color: '#722ed1', themeColor: 'deepViolet' }
  ])

  const settingsStore = useSettingsStore()

  const themeColor = computed({
    get() {
      return settingsStore.themeColor
    },
    set(value) {
      settingsStore.UPDATE_STATE({ key: 'themeColor', value })
    }
  })

  const setProperty = (color: string) => {
    document.documentElement.style.setProperty('--el-color-primary', color)

    for (let i = 1; i <= 9; i++) {
      document.documentElement.style.setProperty(
        `--el-color-primary-light-${i}`,
        lighten(color, i / 10)
      )
    }
  }

  const changeThemeColor = (item: ThemeColor) => {
    const { themeColor: theme } = item
    themeColor.value = theme
  }

  const resetProperty = () => {
    document.documentElement.style.removeProperty(`--el-color-primary`)
    for (let i = 1; i <= 9; i++) {
      document.documentElement.style.removeProperty(`--el-color-primary-light-${i}`)
    }
  }

  const observeThemeColor = () => {
    return watch(
      themeColor,
      (theme) => {
        const target = themeColors.value.find((item) => item.themeColor === theme)
        if (!target) return
        if (theme === 'default' || theme === 'light') {
          resetProperty()
        } else {
          setProperty(target.color)
        }
      },
      { immediate: true }
    )
  }

  return {
    themeColors,
    themeColor,
    changeThemeColor,
    observeThemeColor
  }
}
