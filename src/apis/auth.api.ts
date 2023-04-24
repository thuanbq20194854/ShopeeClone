import { AuthRepsonse } from 'src/types/auth.type'

import http from 'src/utils/http'

const authApi = {
  registerAccount(body: { email: string; password: string }) {
    return http.post<AuthRepsonse>('/register', body)
  },
  loginAccount(body: { email: string; password: string }) {
    return http.post<AuthRepsonse>('/login', body)
  },
  logout() {
    return http.post('/logout')
  }
}

export default authApi
