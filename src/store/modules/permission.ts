import { defineStore } from 'pinia'
import type { PermissionState, MenuItem } from '../types/permission.d.ts'
import { constantRoutes } from '@/router'
import { filterHiddenRoutes, transRoutesToMenus } from '@/router/utils'
import { compose } from '@/utils'

export const usePermissionStore = defineStore({
  id: 'Permission',
  state: (): PermissionState => ({
    constantRoutes: constantRoutes,
    dynamicRoutes: [],
    cachePageNames: []
  }),
  getters: {
    constantMenus(state): MenuItem[] {
      const menus = compose(transRoutesToMenus, filterHiddenRoutes)(state.constantRoutes)
      return menus
    }
  },
  actions: {}
})
