import { User } from './user.type'
import { SuccessRepsonse } from './utils.type'

export type AuthRepsonse = SuccessRepsonse<{
  access_token: string
  expires: string
  user: User
}>

// const test: AuthRepsonse = {
//   message: 'hhee'
// }
