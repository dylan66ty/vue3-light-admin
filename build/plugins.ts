import type { Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { viteMockServe } from 'vite-plugin-mock'
import { visualizer } from 'rollup-plugin-visualizer'
import svgLoader from 'vite-svg-loader'

export const getPlugins = ({ command }) => {
  const isReport = process.env.npm_lifecycle_event === 'report'
  const isMock = command === 'serve'

  const plugins: Plugin[] = [vue(), vueJsx(), svgLoader()]
  // mock
  if (isMock) {
    plugins.push(
      viteMockServe({
        mockPath: 'mock',
        enable: true
      })
    )
  }
  // 打包分析
  if (isReport) {
    plugins.push(visualizer({ open: true, brotliSize: true, filename: 'report.html' }))
  }

  return plugins
}
