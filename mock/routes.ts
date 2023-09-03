import type { MockMethod } from 'vite-plugin-mock'
import { formatResponse } from './utils'

export default [
  {
    url: '/routes',
    method: 'get',
    response: () => {
      const data = {
        success: true,
        code: 200,
        data: []
      }
      return formatResponse(data, 200)
    }
  }
] as MockMethod[]
