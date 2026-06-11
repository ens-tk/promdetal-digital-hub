import axios from "axios";

export const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export const getFileUrl = (id?: string | null): string =>
  id ? `${api.defaults.baseURL}/Files/${id}` : "/placeholder.svg";

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
