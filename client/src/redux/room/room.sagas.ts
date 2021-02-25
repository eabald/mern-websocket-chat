import { takeLatest, put, all, call } from 'redux-saga/effects';
import { createRoomRequest, getRoomsRequest } from '../../api/room.api';
import {
  createRoomSuccess,
  createRoomError,
  getRoomsSuccess,
  getRoomsError,
} from './room.actions';
import {
  CreateRoomStart,
  CREATE_ROOM_START,
  GetRoomsStart,
  GET_ROOMS_START,
} from './room.types';
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

export function* onCreateRoomStart() {
  yield takeLatest(CREATE_ROOM_START, createRoom);
}

export function* onGetRoomsStart() {
  yield takeLatest(GET_ROOMS_START, getRooms);
}

export function* roomSagas() {
  yield all([call(onCreateRoomStart), call(onGetRoomsStart)]);
}

export default roomSagas;
