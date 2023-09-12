import { computed } from 'vue'
import { useSettingsStore } from '@/store/modules/settings'

export const useNav = () => {
  const settingsStore = useSettingsStore()
  const isCollapse = computed(() => {
    return settingsStore.sidebarCollapse
  })

  const toggleSidebarCollapse = () => {
    settingsStore.toggleSidebarCollapse()
  }

  return {
    isCollapse,
    toggleSidebarCollapse
  }
}
