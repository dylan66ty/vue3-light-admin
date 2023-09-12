import { UserFilled } from '@element-plus/icons-vue'
import type { RouteItem } from '../types'
import Layout from '@/layout'

export default [
  {
    path: '/a',
    name: 'A',
    component: Layout,
    meta: {
      title: '用户',
      icon: () => UserFilled
    },
    children: [
      {
        path: 'a1',
        name: 'A1',
        meta: {
          title: '用户1'
        },
        component: {
          render() {
            return 'A1'
          }
        }
      },
      {
        path: 'a2',
        name: 'A2',
        meta: {
          title: '用户2'
        },
        component: {
          render() {
            return 'A2'
          }
        }
      }
    ]
  }
] as RouteItem[]
