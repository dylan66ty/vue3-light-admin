import { defineComponent, onBeforeUnmount } from 'vue'
import { RouterView } from 'vue-router'
import { useTheme } from '@/layout/hooks/useTheme'

export default defineComponent({
  name: 'App',
  setup() {
    const { observeThemeColor } = useTheme()
    const stop = observeThemeColor()
    onBeforeUnmount(() => {
      stop && stop()
    })
    return () => {
      return <RouterView />
    }
  }
})
