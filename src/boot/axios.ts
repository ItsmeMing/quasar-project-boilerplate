/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { LocalStorage } from 'quasar';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

//Delete object properties whose data is null or undefined.
function deleteEmptyValue(data: Record<string, unknown>) {
  Object.keys(data).map((k) => {
    data[k] == void 0 && delete data[k];
  });
  return data;
}

function removeExpiredToken() {
  LocalStorage.remove(`${process.env.APP_NAME}_token`);
  location.reload();
  return 'yes';
}

function setupInterceptors(instance: AxiosInstance): AxiosInstance {
  instance.interceptors.request.use(onRequest, onErrorResponse);
  instance.interceptors.response.use(onResponse, onErrorResponse);
  return instance;
}

function onRequest(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
  config.headers.Authorization = `Bearer ${LocalStorage.getItem(`${process.env.APP_NAME}_token`)}`;
  config.data && (config.data = deleteEmptyValue(config.data as Record<string, unknown>));
  config.params && (config.params = deleteEmptyValue(config.params as Record<string, unknown>));
  config.timeout = 15000;
  return config;
}

function onResponse<T>(response: AxiosResponse<APIResponse<T>, any>) {
  const { data, config, status } = response;
  const { method, url } = config;
  //This depends on your BE API structure, modify types in APIResponse interface
  const { status_code } = data;
  //
  if ([201, 401, 403, 422, 500].includes(status_code)) return Promise.reject(data);
  console.log(`🚀 [API] ${method?.toUpperCase()} ${url} | Request ${status} | API ${status_code}`);
  return response;
}

function onErrorResponse(error: AxiosError | Error): Promise<AxiosError> {
  if (axios.isAxiosError(error)) {
    const { message, config, response } = error;
    if (config) {
      const { method, url } = config;
      console.log(`🚨 [API] ${method?.toUpperCase()} ${url} | Request ${response?.status} ${message}`);
    }
    const { status } = response ?? {};
    const statusCodeHandlers = {
      '400': () => 'yes',
      '401': removeExpiredToken,
      '403': () => 'yes',
      '404': removeExpiredToken,
      '500': () => 'yes'
    };
    const handlerReturn = statusCodeHandlers[status?.toString() as keyof typeof statusCodeHandlers]();
    if (handlerReturn === undefined) console.log(`🚨 [API] | Error ${error.message}`);
    return Promise.reject(error.response?.data);
  }
  console.log(`🚨 [API] | Error ${error.message}`);
  return Promise.reject(error);
}

const api = setupInterceptors(axios.create({ baseURL: process.env.END_POINT }));

export { api };
