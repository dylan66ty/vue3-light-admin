import { defineStore } from 'pinia'
export const useAppStore = defineStore({
  id: 'App',
  state: () => ({
    name: 'lowcode'
  }),
  getters: {
    getAppName(state) {
      return state.name
    }
  },
  actions: {}
})
