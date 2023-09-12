import { defineComponent } from 'vue'
import Unfold from '@/assets/svg/unfold.svg?component'
import { config } from '@/config'

export default defineComponent({
  props: {
    isCollapse: Boolean,
    version: {
      type: String,
      default: undefined
    }
  },
  emits: ['change'],
  setup(props, { emit }) {
    return () => {
      return (
        <div class="app-aside__collapse">
          <el-tooltip content="点击折叠" size="mini" position="tr" effect="light">
            <el-icon class="text-[var(--el-color-primary)] cursor-pointer">
              <Unfold
                style={{
                  transform: props.isCollapse ? 'rotate(180deg)' : 'none'
                }}
                onClick={() => emit('change')}
              />
            </el-icon>
          </el-tooltip>
          {!props.isCollapse && (
            <span class="text-gray-200 text-sm ml-10">v: {config.version}</span>
          )}
        </div>
      )
    }
  }
})
