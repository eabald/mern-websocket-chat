// External
import { Action } from 'redux';
// Types
import { AuthAction } from './auth/auth.types'
import { RoomAction } from './room/room.types';
import { UserAction } from './user/user.types'
import { UtilsAction } from './utils/utils.types'

export type RootAction = AuthAction | UserAction | RoomAction | UtilsAction;

export const RESET = 'RESET';

export interface ResetAction extends Action {
  type: typeof RESET,
}
