import type { FunctionalComponent } from 'vue'
import type { RouteComponent } from 'vue-router'

export interface CustomRouteMeta {
  // 标题
  title: string
  // 图标
  icon: string | FunctionalComponent
  // 隐藏
  hidden: boolean
  // 页面权限
  roles: Array<string>
  // 按钮权限
  actions: Array<string>
  // 路由组件缓存
  keepAlive: boolean
  // 隐藏标签页，（默认`false`）
  hiddenTag: boolean
  // 动态路由可打开的最大数量
  dynamicLevel: number
  // 激活的路由路径
  activePath: string
  // 是否记录滚动条位置
  saveScrollTop: boolean
}

// 子路由类型
export interface RouteChildItem {
  path: string
  name?: string
  redirect?: string
  component?: RouteComponent
  meta?: Partial<CustomRouteMeta>
  children?: RouteChildItem[]
}

// 一级路由类型
export interface RouteItem {
  // 页面路径
  path: string
  // 路由名字
  name?: string
  // 要渲染的组件
  component?: RouteComponent
  // 重定向到哪里
  redirect?: string
  meta?: {
    // 页面标题
    title?: string
    // icon
    icon?: string | FunctionalComponent
    // 是否隐藏
    hidden?: boolean
    // 排序
    rank?: number
  }
  // 子路由
  children?: RouteChildItem[]
}
