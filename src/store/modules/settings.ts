import { defineStore } from 'pinia'
import { toRaw } from 'vue'
import type { SettingsState } from '../types/settings.d.ts'
import { storage } from '@/utils/storage'

const SETTINGS_KEY = 'SETTINGS'

export const useSettingsStore = defineStore({
  id: 'Settings',
  state: (): SettingsState =>
    Object.assign(
      {},
      {
        sidebarCollapse: false,
        persistenceTags: false,
        hiddenTagsViews: false,
        hiddenSidebarLogo: false,
        grayFilter: false,
        weaknessFilter: false,
        themeColor: 'default'
      },
      storage.getItem(SETTINGS_KEY)
    ),
  getters: {
    rawState(state: any) {
      return toRaw(state.$state)
    }
  },
  actions: {
    process() {
      storage.setItem(SETTINGS_KEY, this.rawState)
    },
    UPDATE_STATE({ key, value }) {
      this[key] = value
      storage.setItem(SETTINGS_KEY, this.rawState)
    },
    toggleSidebarCollapse() {
      this.sidebarCollapse = !this.sidebarCollapse
      this.process()
    }
  }
})
