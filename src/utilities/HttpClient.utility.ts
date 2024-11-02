import axios from "axios";
const API_BASE_URL_QA = "https://bdc-backend-fw-dev.ultrapaynet.com:8044/litecore-provider/api/v1";

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || API_BASE_URL_QA;
const API_BASE_URL = "https://bdc-backend-fw-qa.ultrapaynet.com:8045/litecore-provider/api/v1" || API_BASE_URL_QA;

const HttpClient = axios.create({
  baseURL: API_BASE_URL,
  validateStatus: function (status) {
    return status >= 200 && status < 500; // Resuelve solo si el código de estado es 2xx
  },
  timeout: 100000,
  headers: {
    "Content-Type": "application/json",
    "Litecore-Platform-TenantId": "default",
  },
});

HttpClient.interceptors.request.use(
  config => {
    // const state = store.getState();
    // const token = state.user?.token;
    // console.log("🚀 ~ token from interceptors:", token);
    // if (token) {
    config.headers.Authorization = `Basic bGl0ZWNvcmU6cGFzc3dvcmQ=`;
    //   config.headers.Authorization = `Basic ${token}`;
    // }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

HttpClient.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error);
  }
);

export default HttpClient;
