export interface UserState {
  username: string
  roles: Array<string>
  loginComponent: 'Login' | 'Register' | 'Forget'
}
