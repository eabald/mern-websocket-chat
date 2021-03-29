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
import { updateUnreadRequest } from '../../api/user.api';
import { updateLoading } from '../utils/utils.actions';

export const selectCurrentRoom = (state: RootState): Room | null => state.room.currentRoom;
export const selectRooms = (state: RootState): Room[] => state.room.rooms;

export function* createRoom({ payload }: CreateRoomStart) {
  try {
    yield put(updateLoading(true));
    const { room } = yield createRoomRequest(payload);
    const rooms: Room[] = yield select(selectRooms);
    const roomInRooms = rooms.find(item => item._id === room._id);
    if (!roomInRooms) {
      yield put(createRoomSuccess(room));
    }
    if (roomInRooms) {
      yield put(setCurrentRoomSuccess(roomInRooms));
    } else {
      yield put(setCurrentRoomSuccess(room));
    }
    yield put(updateLoading(false));
  } catch (error) {
    yield checkForUnauthorized(error.response.data);
    yield put(updateLoading(false));
    yield put(createRoomError(error.response.data));
  }
}

export function* getRooms({ payload }: GetRoomsStart) {
  try {
    yield put(updateLoading(true));
    const { rooms } = yield getRoomsRequest(payload);
    yield put(getRoomsSuccess(rooms));
    const currentRoom: Room | null = yield select(selectCurrentRoom);
    if (!currentRoom) {
      yield put(setCurrentRoomSuccess(rooms[0]));
    }
    yield put(updateLoading(false));
  } catch (error) {
    yield checkForUnauthorized(error.response.data);
    yield put(updateLoading(false));
    yield put(getRoomsError(error.response.data));
  }
}

export function* getRoom({ payload }: GetRoomStart) {
  try {
    yield put(updateLoading(true));
    const { room } = yield getRoomRequest(payload);
    yield put(getRoomSuccess(room));
    yield put(updateLoading(false));
  } catch (error) {
    yield checkForUnauthorized(error.response.data);
    yield put(updateLoading(false));
    yield put(getRoomError(error.response.data));
  }
}

export function* setCurrentRoom({ payload }: SetCurrentRoomStart) {
  try {
    yield put(updateLoading(true));
    const { room } = yield getRoomRequest(payload._id ?? '');
    yield updateUnreadRequest(payload._id ?? '');
    yield put(setCurrentRoomSuccess(room));
    yield put(updateRead(room._id));
    yield put(updateLoading(false));
  } catch (error) {
    yield checkForUnauthorized(error.response.data);
    yield put(updateLoading(false));
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
