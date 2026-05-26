import axios from "axios";

export const api = axios.create({
  baseURL: "http://157.22.174.170:8080/promdetal/api",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
