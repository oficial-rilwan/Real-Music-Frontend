import axios from "axios";
import { AxiosResponse, AxiosError, AxiosRequestConfig } from "axios";
import config from "../config/config";

const prefix = "x-auth-token";
const token: string | null = localStorage.getItem(prefix) || null;

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
  }
  return Promise.reject(error);
};

axios.interceptors.response.use(onResponse, onResponseError);
axios.interceptors.request.use(onRequest, onRequestError);

const http = axios.create({
  baseURL: `${config.BASE_URL}/api/v1`,
});

http.defaults.headers.common["x-auth-token"] = token;

export default {
  get: http.get,
  put: http.put,
  post: http.post,
  delete: http.delete,
};
