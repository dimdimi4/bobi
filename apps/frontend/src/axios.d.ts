/* eslint-disable */
import 'axios';

declare module 'axios' {
  interface AxiosResponse<T = any> extends Promise<T> {}
}
