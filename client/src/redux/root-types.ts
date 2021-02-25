import { Action } from 'redux';
import { AuthAction } from './auth/auth.types'
import { RoomAction } from './room/room.types';
import { UserAction } from './user/user.types'

export type RootAction = AuthAction | UserAction | RoomAction;

export const RESET = 'RESET';

export interface ResetAction extends Action {
  type: typeof RESET,
}
