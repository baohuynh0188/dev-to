import axios from 'axios';
import queryString from 'query-string';
import { getToken } from '../utilities/localStorges';

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use((config: any) => {
  if (getToken()) {
    config.headers.authorization = 'Bearer ' + getToken();
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response?.data) {
      return response.data;
    }

    return response;
  },
  (error) => {
    switch (error.response.status) {
      case 400:
        console.log('400');
        throw error;
      case 401:
        console.log('401');
        throw error;
      case 403:
        console.log('403');
        throw error;
      case 404:
        console.log('404');
        throw error;
      case 500:
        console.log('500');
        throw error;
      default:
        throw error;
    }
  }
);

export default axiosClient;
