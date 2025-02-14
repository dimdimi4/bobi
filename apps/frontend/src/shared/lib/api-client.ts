import Axios, { InternalAxiosRequestConfig } from 'axios';

import { notifications } from '@mantine/notifications';

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    config.headers.Accept = 'application/json';
  }

  config.withCredentials = true;
  return config;
}

export const api = Axios.create({
  baseURL: '',
});

api.interceptors.request.use(authRequestInterceptor);
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;
    console.log('i was here', message);
    notifications.show({
      color: 'red',
      title: 'Error',
      message,
    });

    if (error.response?.status === 401) {
      // TODO: Redirect to login
    }

    return Promise.reject(error);
  }
);
