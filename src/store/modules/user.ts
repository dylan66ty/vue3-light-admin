import { defineStore } from 'pinia'
import type { UserState } from '../types'

export const useUserStore = defineStore({
  id: 'User',
  state: (): UserState => ({
    username: '',
    loginComponent: 'Login',
    roles: []
  }),
  getters: {},
  actions: {
    switchLogonComponent(payload: UserState['loginComponent']) {
      this.loginComponent = payload
    },
    login() {
      console.log('login')
    }
  }
})
