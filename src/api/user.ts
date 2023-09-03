import { request } from '@/utils/http'

export const login = (data) => {
  // test
  return request.postJson('/login', { data })
}
