import { put } from 'redux-saga/effects';
import { signOutStart } from './auth/auth.actions'

interface ErrorJson {
  status: number,
  message: string
}

export function* checkForUnauthorized(error: ErrorJson) {
  console.log(error);
  if (error.status === 401) {
    yield put(signOutStart());
  }
}
