// External
import { takeLatest, put, all, call, select } from 'redux-saga/effects';
// Api
import {
  createRoomRequest,
  getRoomRequest,
  getRoomsRequest,
} from '../../api/room.api';
// Actions
import {
  createRoomSuccess,
  createRoomError,
  getRoomsSuccess,
  getRoomsError,
  setCurrentRoomSuccess,
  setCurrentRoomError,
  getRoomSuccess,
  getRoomError,
} from './room.actions';
// Types
import {
  CreateRoomStart,
  CREATE_ROOM_START,
  GetRoomsStart,
  GetRoomStart,
  GET_ROOMS_START,
  GET_ROOM_START,
  Room,
  SetCurrentRoomStart,
  SET_CURRENT_ROOM_START,
} from './room.types';
// Utils
import { checkForUnauthorized } from '../sagas.utils';
import { RootState } from '../root-reducer';
import { updateRead } from '../user/user.actions';

export const selectCurrentRoom = (state: RootState): Room | null => state.room.currentRoom;

export function* createRoom({ payload }: CreateRoomStart) {
  try {
    const { room } = yield createRoomRequest(payload);
    yield put(createRoomSuccess(room));
    yield put(setCurrentRoomSuccess(room));
  } catch (error) {
    yield checkForUnauthorized(error.response.data);
    yield put(createRoomError(error.response.data));
  }
}

export function* getRooms({ payload }: GetRoomsStart) {
  try {
    const { rooms } = yield getRoomsRequest(payload);
    yield put(getRoomsSuccess(rooms));
    const currentRoom: Room | null = yield select(selectCurrentRoom);
    if (!currentRoom) {
      yield put(setCurrentRoomSuccess(rooms[0]));
    }

  } catch (error) {
    yield checkForUnauthorized(error.response.data);
    yield put(getRoomsError(error.response.data));
  }
}

export function* getRoom({ payload }: GetRoomStart) {
  try {
    const { room } = yield getRoomRequest(payload);
    yield put(getRoomSuccess(room));
  } catch (error) {
    yield put(getRoomError(error.response.data));
  }
}

export function* setCurrentRoom({ payload }: SetCurrentRoomStart) {
  try {
    const { room } = yield getRoomRequest(payload._id ?? '');
    yield put(setCurrentRoomSuccess(room));
    yield put(updateRead(room._id));
  } catch (error) {
    yield checkForUnauthorized(error.response.data);
    yield put(setCurrentRoomError(error.response.data));
  }
}

export function* onCreateRoomStart() {
  yield takeLatest(CREATE_ROOM_START, createRoom);
}

export function* onGetRoomsStart() {
  yield takeLatest(GET_ROOMS_START, getRooms);
}

export function* onGetRoomStart() {
  yield takeLatest(GET_ROOM_START, getRoom);
}

export function* onSetCurrentRoomStart() {
  yield takeLatest(SET_CURRENT_ROOM_START, setCurrentRoom);
}

export function* roomSagas() {
  yield all([
    call(onCreateRoomStart),
    call(onGetRoomsStart),
    call(onGetRoomStart),
    call(onSetCurrentRoomStart),
  ]);
}

export default roomSagas;
