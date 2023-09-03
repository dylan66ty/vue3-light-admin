import { createRouter, createWebHistory } from 'vue-router'
import type { Router, RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'
import { flatten, ascending } from './utils'
import NProgress from '@/utils/progress'

// const whiteList: string[] = ['/login']

const routes: RouteRecordRaw[] = []

const modules: Record<string, any> = import.meta.glob(['./modules/**/*.ts'], {
  eager: true
})
Object.keys(modules).forEach((key) => {
  routes.push(modules[key].default)
})

const constantRoutes = ascending(flatten(routes))

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

router.beforeEach(() => {
  NProgress.start()
})

router.afterEach(() => {
  NProgress.done()
})

export const setupRouter = (app: App) => {
  app.use(router)
}

export default router
