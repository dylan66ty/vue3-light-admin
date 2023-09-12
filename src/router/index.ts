import { createRouter, createWebHistory } from 'vue-router'
import type { Router, RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'
import { flatten, ascending, setDocTitle } from './utils'
import type { RouteTo } from './types'
import NProgress from '@/utils/progress'
import { isEmptyObject } from '@/utils/is'
import { useUserStore } from '@/store/modules/user'
import { useAppStore } from '@/store/modules/app'
import { useTagsStore } from '@/store/modules/tags'

const WHITE_LIST: string[] = ['/login']

const routes: RouteRecordRaw[] = []

const modules: Record<string, any> = import.meta.glob(['./modules/**/*.ts'], {
  eager: true
})
Object.keys(modules).forEach((key) => {
  routes.push(modules[key].default)
})

export const constantRoutes = ascending(flatten(routes))

export const router: Router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes,
  strict: true,
  scrollBehavior(_to, from, savedPosition) {
    return new Promise((resolve) => {
      if (savedPosition) {
        return savedPosition
      } else {
        if (from.meta.saveScrollTop) {
          const top: number = document.documentElement.scrollTop || document.body.scrollTop
          resolve({ left: 0, top })
        }
      }
    })
  }
})

export const resetRouter = () => {
  router.getRoutes().forEach((route) => {
    const { name, meta } = route
    if (name && router.hasRoute(name) && meta?.backstage) {
      router.removeRoute(name)
    }
  })
}

const setTags = (to: RouteTo) => {
  if (!to.meta?.hiddenTag && !to.meta?.hidden) {
    useTagsStore().addTag({
      path: to.path,
      title: to.meta.title
    })
  }
}

const setTitle = (to: RouteTo) => {
  setDocTitle(useAppStore().name, to.meta.title)
}

router.beforeEach((to: RouteTo, _from, next) => {
  NProgress.start()
  setTitle(to)
  setTags(to)
  if (!isEmptyObject(useUserStore().userInfo)) {
    next()
  } else {
    if (WHITE_LIST.includes(to.path)) {
      next()
    } else {
      next({ path: '/login' })
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

export const setupRouter = (app: App) => {
  app.use(router)
}

export default router
