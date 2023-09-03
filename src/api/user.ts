import { request } from '@/utils/http'

export const login = (data) => {
  return request.postJson('/login', { data })
}
