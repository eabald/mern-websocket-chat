import axios from 'axios';
import { Store } from 'redux';
import { signUpError, signUpSuccess } from '../redux/auth/auth.actions';

const interceptors = async (store: Store) => {
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      const refreshToken = store.getState().auth.refreshToken;
      if (
        refreshToken &&
        error.response.status === 401 &&
        originalRequest.url !== '/api/auth/refresh-token' &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;
        try {
          const response = await axios.post('/api/auth/refresh-token', { refreshToken });
          store.dispatch(signUpSuccess(response.data));
          const originalRequestResponse = await axios(originalRequest);
          return originalRequestResponse;
        } catch (error) {
          store.dispatch(signUpError(error.response.data))
        }
      }
      return Promise.reject(error);
    }
  );
}

export default interceptors;
