import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080/promdetal/api",
  headers: {
    "Content-Type": "application/json",
  },
});
