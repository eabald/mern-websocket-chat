// External
import axios from 'axios';

const api = axios.create({
  baseURL: `/api/`,
  params: {
    lng: localStorage.getItem('i18nextLng'),
  }
});

export default api;
