export interface UserState {
  username: string
  phone: string
  roles: Array<string>
  loginComponent: 'Login' | 'Register' | 'Forget',
  userInfo: Record<string,any>
}

export interface UserPayload {
  phone: string
  username: string
  password: string
  phoneCode: string
}