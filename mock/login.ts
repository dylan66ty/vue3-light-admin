import type { MockMethod } from 'vite-plugin-mock'
import { formatResponse } from './utils'

export default [
  {
    url: '/login',
    method: 'post',
    response: ({ body }) => {
      if (body.username === 'admin') {
        const data = {
          success: true,
          data: {
            username: 'admin',
            // 一个用户可能有多个角色
            roles: ['admin'],
            accessToken: 'eyJhbGciOiJIUzUxMiJ9.admin'
          }
        }
        return formatResponse(data, 200)
      } else {
        const data = {
          success: true,
          data: {
            username: 'common',
            // 一个用户可能有多个角色
            roles: ['common'],
            accessToken: 'eyJhbGciOiJIUzUxMiJ9.common'
          }
        }
        return formatResponse(data, 200)
      }
    }
  }
] as MockMethod[]
