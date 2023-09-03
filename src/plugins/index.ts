import type { App } from 'vue'
import { useElementPlus } from './element-plus'

export const usePlugins = (app: App) => {
  useElementPlus(app)
}
