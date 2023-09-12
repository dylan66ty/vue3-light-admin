import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import AppAside from './components/Aside'
import AppHeader from './components/Header'
import AppMain from './components/AppMain'
import TagView from './components/TagsView.vue'
import { useSettingsStore } from '@/store/modules/settings'

import './layout.scss'

export default defineComponent({
  setup() {
    const route = useRoute()
    const settingStore = useSettingsStore()
    const hiddenSidebar = computed(() => route.meta?.hiddenSidebar)
    const sidebarCollapse = computed(() => settingStore.sidebarCollapse)

    return () => {
      return (
        <div class="app-layout">
          {!hiddenSidebar.value && <AppAside />}
          <section class={['app-section', sidebarCollapse.value && 'is-collapse']}>
            <AppHeader />
            <TagView />
            <AppMain />
          </section>
        </div>
      )
    }
  }
})
