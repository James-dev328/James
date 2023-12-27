/* eslint-disable no-undef */
import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "production" ? "/api" : "//localhost:3000/api",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
