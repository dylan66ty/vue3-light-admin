import { resolve } from 'path'
import type { ConfigEnv, ESBuildOptions, UserConfigExport } from 'vite'
import { loadEnv } from 'vite'
import dayjs from 'dayjs'
import { getPlugins } from './build/plugins'
import pkg from './package.json'

const root: string = process.cwd()

const pathResolve = (dir: string): string => {
  return resolve(__dirname, dir)
}

const alias: Record<string, string> = {
  '@': pathResolve('src')
}
const { dependencies, devDependencies, name, version } = pkg

const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
}

export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  const { VITE_PORT, VITE_PUBLIC_PATH } = loadEnv(mode, root)
  return {
    root,
    base: VITE_PUBLIC_PATH,
    resolve: {
      alias
    },
    server: {
      https: false,
      // 端口号
      port: Number(VITE_PORT),
      host: '0.0.0.0',
      // 本地跨域代理 https://cn.vitejs.dev/config/server-options.html#server-proxy
      proxy: {}
    },
    plugins: getPlugins({ command }),
    build: {
      minify: 'esbuild',
      sourcemap: false,
      // 消除打包大小超过500kb警告
      chunkSizeWarningLimit: 4000,
      rollupOptions: {
        input: {
          index: pathResolve('index.html')
        },
        // 静态资源分类打包
        output: {
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
        }
      }
    },
    esbuild: {
      drop: mode === 'production' ? ['console', 'debugger'] : []
    } as ESBuildOptions,
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__)
    }
  }
}
