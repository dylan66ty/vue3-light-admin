import { defineStore } from 'pinia'
import type { UserState } from '../types/user.d.ts'
import { login as $login } from '@/api/user'
import { storage } from '@/utils/storage/index.js'
import router from '@/router/index.js'
import { to } from '@/utils/index.js'

const USER_KEY = 'USER'
export const useUserStore = defineStore({
  id: 'User',
  state: (): UserState => ({
    username: '',
    loginComponent: 'Login',
    roles: [],
    phone: '',
    userInfo: storage.getItem(USER_KEY) ?? {}
  }),
  getters: {},
  actions: {
    SWITCH_COMPONENT(payload: UserState['loginComponent']) {
      this.loginComponent = payload
    },
    SET_USER_INFO(userInfo) {
      this.userInfo = userInfo
      storage.setItem(USER_KEY, userInfo, { encode: true })
    },
    async login(data) {
      const [err, res] = await to($login(data))
      if (err) return
      this.SET_USER_INFO(res.data)
      router.push({ name: 'Dashboard' })
    },
    async logout() {
      storage.removeItem(USER_KEY)
      router.push({ name: 'Login' })
    }
  }
})
