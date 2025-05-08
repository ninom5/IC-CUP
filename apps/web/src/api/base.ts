import { API_URL } from "@constants/urls";
import axios from "axios";
import { ErrorResponseType } from "types/index";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  const tokenItem = localStorage.getItem("jwt");

  if (tokenItem) {
    const token = JSON.parse(tokenItem);
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: ErrorResponseType) => {
    if (error.response)
      return Promise.reject(error.response.data.message || error.message);

    return Promise.reject("Network error");
  }
);
