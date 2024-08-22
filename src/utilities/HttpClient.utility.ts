import axios from "axios";

// const API_BASE_URL = "https://staging.mifos.io/fineract-provider/api/v1";
const API_BASE_URL = "http://18.221.187.159:8443/litecore-provider/api/v1";
// const API_BASE_URL = "http://localhost:8443/litecore-provider/api/v1";

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
