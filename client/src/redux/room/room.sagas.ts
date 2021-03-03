// External
import { takeLatest, put, all, call } from 'redux-saga/effects';
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
} from './room.actions';
// Types
import {
  CreateRoomStart,
  CREATE_ROOM_START,
  GetRoomsStart,
  GET_ROOMS_START,
  SetCurrentRoomStart,
  SET_CURRENT_ROOM_START,
} from './room.types';
// Utils
import { checkForUnauthorized } from '../sagas.utils';

export function* createRoom({ payload }: CreateRoomStart) {
  try {
    const { room } = yield createRoomRequest(payload);
    yield put(createRoomSuccess(room));
  } catch (error) {
    yield checkForUnauthorized(error.response.data);
    yield put(createRoomError(error.response.data));
  }
}

export function* getRooms({ payload }: GetRoomsStart) {
  try {
    const { rooms } = yield getRoomsRequest(payload);
    yield put(getRoomsSuccess(rooms));
  } catch (error) {
    yield checkForUnauthorized(error.response.data);
    yield put(getRoomsError(error.response.data));
  }
}

export function* setCurrentRoom({ payload }: SetCurrentRoomStart) {
  try {
    const { room } = yield getRoomRequest(payload._id ?? '');
    yield put(setCurrentRoomSuccess(room));
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

export function* onSetCurrentRoomStart() {
  yield takeLatest(SET_CURRENT_ROOM_START, setCurrentRoom);
}

export function* roomSagas() {
  yield all([
    call(onCreateRoomStart),
    call(onGetRoomsStart),
    call(onSetCurrentRoomStart),
  ]);
}

export default roomSagas;
