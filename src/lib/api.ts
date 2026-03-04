import axios from "axios";

export const api = axios.create({
  baseURL: "http://62.76.142.36:8080/promdetal/api",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
