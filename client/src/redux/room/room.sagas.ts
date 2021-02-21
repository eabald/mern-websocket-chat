import { takeLatest, put, all, call } from 'redux-saga/effects';
import { createRoomRequest } from '../../api/room.api';
import { createRoomSuccess, createRoomError } from './room.actions';
import { CreateRoomStart, CREATE_ROOM_START } from './room.types';

export function* createRoom({ payload } : CreateRoomStart) {
  try {
    const { room } = yield createRoomRequest(payload);
    yield put(createRoomSuccess(room))
  } catch (error) {
    yield put(createRoomError(error))
  }
}

export function* onCreateRoomStart() {
  yield takeLatest(CREATE_ROOM_START, createRoom);
}

export function* roomSagas() {
  yield all([call(onCreateRoomStart)])
}

export default roomSagas;
