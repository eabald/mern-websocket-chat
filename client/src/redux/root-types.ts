// Types
import { AuthAction } from './auth/auth.types'
import { PaymentAction } from './payment/payment.types';
import { RoomAction } from './room/room.types';
import { UserAction } from './user/user.types'
import { UtilsAction } from './utils/utils.types'

export type RootAction = AuthAction | UserAction | RoomAction | PaymentAction | UtilsAction;
