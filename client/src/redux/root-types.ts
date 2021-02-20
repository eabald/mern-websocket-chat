import { AuthAction } from './auth/auth.types'
import { UserAction } from './user/user.types'

export type RootAction = AuthAction | UserAction;
