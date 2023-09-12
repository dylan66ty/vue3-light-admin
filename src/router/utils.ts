import type { RouteItem } from './types'
import type { MenuItem } from '@/store/types/permission.d.ts'

export const ascending = (arr: any[]) => {
  return arr.sort((a: { meta: { rank: number } }, b: { meta: { rank: number } }) => {
    const flag = a.meta?.rank - b.meta?.rank
    return isNaN(flag) ? -1 : flag
  })
}

export const flatten = (arr: any[]) => {
  return arr.reduce((a, v) => a.concat(Array.isArray(v) ? flatten(v) : [v]), [])
}

export const setDocTitle = (appName, title: string) => {
  document.title = title ? `${appName} | ${title}` : appName
}

// 过滤meta.hidden的路由
export const filterHiddenRoutes = (routes: RouteItem[]) => {
  return routes.filter((route) => {
    if (route.children) {
      route.children = filterHiddenRoutes(route.children)
    }
    return !route.meta?.hidden
  })
}

// 将路由转换成菜单，方便菜单的渲染
export const transRoutesToMenus = (routes: RouteItem[], parent = null): MenuItem[] => {
  return routes.map((route) => {
    const menu: MenuItem = {
      title: route.meta?.title,
      icon: route.meta?.icon,
      path: route.path,
      name: route.name,
      pathList: []
    }
    menu.pathList = parent ? parent.pathList.concat([menu.path]) : [menu.path]
    if (route.children) {
      menu.children = transRoutesToMenus(route.children, menu)
    }
    return menu
  })
}
