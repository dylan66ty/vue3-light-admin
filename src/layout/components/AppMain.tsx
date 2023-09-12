import { RouterView } from 'vue-router'
import { defineComponent, KeepAlive, computed } from 'vue'
import { ElBacktop } from 'element-plus'
import { usePermissionStore } from '@/store/modules/permission'
import { useTagsStore } from '@/store/modules/tags'

export default defineComponent({
  setup() {
    const permissionStore = usePermissionStore()
    const tagsStore = useTagsStore()

    const cachePageNames = computed(() => permissionStore.cachePageNames)
    const hiddenTagView = computed(() => tagsStore.hiddenTagView)

    const cls = computed(() => ['app-main', hiddenTagView.value && 'is-hidden-tags-view'])

    return () => {
      return (
        <main class={cls.value}>
          <RouterView>
            {{
              default: (scoped) => (
                <el-scrollbar>
                  <KeepAlive include={cachePageNames.value}>
                    <scoped.Component key={scoped.route.path} />
                  </KeepAlive>
                  <ElBacktop target=".app-main .el-scrollbar__wrap">🚀</ElBacktop>
                </el-scrollbar>
              )
            }}
          </RouterView>
        </main>
      )
    }
  }
})
