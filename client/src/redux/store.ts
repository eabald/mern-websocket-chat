// external
import { createStore, applyMiddleware, Middleware } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
// Root Reducer
import rootReducer from './root-reducer';
// Root Sagas
import rootSaga from './root-saga';

const sagaMiddleware = createSagaMiddleware();

const middlewares: Array<Middleware | SagaMiddleware> = [];
middlewares.push(sagaMiddleware);

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

export const store = createStore(
  rootReducer,
  applyMiddleware(...middlewares)
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
const exportStore = { store, persistStore };
export default exportStore;
