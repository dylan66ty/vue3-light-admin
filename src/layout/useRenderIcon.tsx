import { isProxy, toRaw } from 'vue'
import { ElIcon } from 'element-plus'
import { isFunction } from '@/utils/is'

export const useRenderIcon = (icon, attrs = {}) => {
  let Tag
  if (isFunction(icon)) {
    Tag = icon()
  }
  if (isFunction(icon?.render)) {
    Tag = icon
  }
  if (isProxy(Tag)) {
    Tag = toRaw(Tag)
  }
  if (!Tag) return null
  return (
    <ElIcon {...attrs}>
      <Tag />
    </ElIcon>
  )
}
