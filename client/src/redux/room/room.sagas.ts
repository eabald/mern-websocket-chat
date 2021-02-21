import { takeLatest, put, all, call } from 'redux-saga/effects';
import { createRoomRequest, getRoomsRequest } from '../../api/room.api';
import { createRoomSuccess, createRoomError, getRoomsSuccess, getRoomsError } from './room.actions';
import { CreateRoomStart, CREATE_ROOM_START, GetRoomsStart, GET_ROOMS_START } from './room.types';

export function* createRoom({ payload } : CreateRoomStart) {
  try {
    const { room } = yield createRoomRequest(payload);
    yield put(createRoomSuccess(room))
  } catch (error) {
    yield put(createRoomError(error))
  }
}

export function* getRooms({ payload } : GetRoomsStart) {
  try {
    const { rooms } = yield getRoomsRequest(payload);
    yield put(getRoomsSuccess(rooms));
  } catch (error) {
    yield put(getRoomsError(error));
  }
}

export function* onCreateRoomStart() {
  yield takeLatest(CREATE_ROOM_START, createRoom);
}

export function* onGetRoomsStart() {
  yield takeLatest(GET_ROOMS_START, getRooms);
}

export function* roomSagas() {
  yield all([call(onCreateRoomStart), call(onGetRoomsStart)])
}

export default roomSagas;
