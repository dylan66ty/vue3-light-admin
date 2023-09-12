import { computed, defineComponent } from 'vue'
import { ElMenu } from 'element-plus'
import { useRoute } from 'vue-router'
import type { CSSProperties } from 'vue'
import Collapse from './Collapse'
import Logo from './Logo'
import MenuItem from './MenuItem'
import { usePermissionStore } from '@/store/modules/permission'
import { useSettingsStore } from '@/store/modules/settings'

import { useNav } from '@/layout/hooks/useNav'

export default defineComponent({
  setup() {
    const permissionStore = usePermissionStore()
    const settingsStore = useSettingsStore()
    const route = useRoute()
    const menus = computed(() => permissionStore.constantMenus)
    const defaultActive = computed(() => route.fullPath)
    const hiddenSidebarLogo = computed(() => settingsStore.hiddenSidebarLogo)

    const { isCollapse, toggleSidebarCollapse } = useNav()

    const asideStyle = computed(() => {
      const style: CSSProperties = {
        width: '210px',
        transition: 'width 0.3s ease'
      }
      if (isCollapse.value) {
        style.width = '56px'
      }
      return style
    })

    const navbarCls = computed(() => [
      'app-aside__navbar',
      hiddenSidebarLogo.value && 'is-hidden-aside-logo'
    ])

    return () => {
      return (
        <aside class="app-aside" style={asideStyle.value}>
          <Logo />
          <div class={navbarCls.value}>
            <el-scrollbar>
              <ElMenu
                router
                unique-opened
                mode="vertical"
                class="select-none"
                collapse-transition={false}
                default-active={defaultActive.value}
                collapse={isCollapse.value}
              >
                {menus.value.map((item) => (
                  <MenuItem item={item} key={item.path} />
                ))}
              </ElMenu>
            </el-scrollbar>
          </div>
          <Collapse is-collapse={isCollapse.value} onChange={toggleSidebarCollapse} />
        </aside>
      )
    }
  }
})
