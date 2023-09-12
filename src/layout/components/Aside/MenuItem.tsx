import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import { ElMenuItem, ElSubMenu } from 'element-plus'
import { useRenderIcon } from '@/layout/useRenderIcon'
import type { MenuItem } from '@/store/types/permission.d.ts'

interface RenderOptions {
  nested: boolean
}

export default defineComponent({
  props: {
    item: {
      type: Object as PropType<MenuItem>,
      default: () => ({})
    }
  },
  setup(props) {
    const resolvePath = (item: MenuItem) => {
      return item.pathList.join('/')
    }

    const renderMenuItem = (item: MenuItem, options: RenderOptions) => {
      return (
        <ElMenuItem
          class={{
            'is-nested': options.nested
          }}
          index={resolvePath(item)}
        >
          {{
            title() {
              return <span>{item.title}</span>
            },
            default() {
              return useRenderIcon(item.icon)
            }
          }}
        </ElMenuItem>
      )
    }

    const renderSubMenu = (item: MenuItem, options: RenderOptions) => {
      return (
        <ElSubMenu
          class={{
            'is-nested': options.nested
          }}
          index={resolvePath(item)}
        >
          {{
            title() {
              return (
                <>
                  {useRenderIcon(item.icon)}
                  <span>{item.title}</span>
                </>
              )
            },
            default() {
              if (item.children) {
                return item.children.map((child) => renderContent(child, { nested: true }))
              }
            }
          }}
        </ElSubMenu>
      )
    }

    const renderContent = (item: MenuItem, options: RenderOptions) => {
      const onlyOneChild = item.children?.length === 1 && item?.children[0]
      // 当前路由只有一个子路由的话，不会显示subMenu。这个子路由继承父级的title icon
      if (onlyOneChild) {
        if (!onlyOneChild.title) {
          onlyOneChild.title = item.title
        }
        if (!onlyOneChild.icon) {
          onlyOneChild.icon = item.icon
        }
        return renderMenuItem(onlyOneChild, options)
      }
      if (item?.children?.length) {
        return renderSubMenu(item, options)
      }
      return renderMenuItem(item, options)
    }

    return () => {
      return renderContent(props.item, { nested: false })
    }
  }
})
