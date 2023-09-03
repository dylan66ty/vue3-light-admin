import type { RouteItem } from '../types'
import Layout from '@/layout/index.vue'
import Login from '@/views/Login/index.vue'

export default [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Layout,
    children: [
      {
        path: '',
        name: 'DashboardMain',
        component: () => import('@/views/Dashboard/index.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '登录',
      hidden: true,
      rank: 1
    }
  }
] as RouteItem[]
