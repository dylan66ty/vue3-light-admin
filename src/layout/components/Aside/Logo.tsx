import { computed, defineComponent } from 'vue'
import { useSettingsStore } from '@/store/modules/settings'

export default defineComponent({
  setup() {
    const settingStore = useSettingsStore()
    const hiddenSidebarLogo = computed(() => settingStore.hiddenSidebarLogo)
    return () => {
      return hiddenSidebarLogo.value ? null : <div class="app-logo">Logo</div>
    }
  }
})
