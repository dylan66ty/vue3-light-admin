import type { RouteItem } from '@/router/types'

interface MenuItem {
  title?: string
  icon?: string | RouteItem['meta']['icon']
  path: string
  name: string
  pathList: string[],
  children?: MenuItem[]
}

interface  PermissionState {
  constantRoutes: RouteItem[]
  dynamicRoutes: RouteItem[]
  cachePageNames: string[]
}


