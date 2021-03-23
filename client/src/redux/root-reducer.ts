// External
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// Reducers
import authReducer from './auth/auth.reducer';
import userReducer from './user/user.reducer';
import roomReducer from './room/room.reducer'
import flashReducer from './flash/flash.reducer'
// Types
import { RootAction } from './root-types';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  room: roomReducer,
  flash: flashReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default persistReducer<RootState, RootAction>(
  persistConfig,
  rootReducer
);
