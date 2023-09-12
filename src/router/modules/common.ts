import { HomeFilled } from '@element-plus/icons-vue'
import type { RouteItem } from '../types'
import Layout from '@/layout'
import Login from '@/views/Login/index.vue'

export default [
  {
    path: '/',
    redirect: '/home/dashboard',
    meta: {
      hidden: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '登录',
      hidden: true
    }
  },
  {
    path: '/home',
    name: 'Dashboard',
    component: Layout,
    meta: {
      title: '首页',
      icon: () => HomeFilled,
      rank: 1
    },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard/index.vue')
      }
    ]
  }
] as RouteItem[]
