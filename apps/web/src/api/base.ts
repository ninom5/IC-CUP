import { API_URL } from "@constants/urls";
import axios from "axios";
import { useEffect, useMemo } from "react";
import { useToken } from "hooks/useToken";
import { toast } from "react-toastify";

export const axiosInstanceAPI = () => {
  const {
    data: { token, isExpired },
  } = useToken();

  if (!token || isExpired) {
    toast.error("Token is expired or not found");
    return null;
  }

  const axiosInstance = useMemo(() => {
    return axios.create({
      withCredentials: true,
      baseURL: API_URL,
    });
  }, []);

  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        if (token && !isExpired)
          config.headers.Authorization = `Bearer ${token}`;

        return config;
      },
      (error) => {
        toast.error(`Request error: ${error.message}`);
        return Promise.reject(error);
      }
    );

    return axiosInstance.interceptors.request.eject(requestInterceptor);
  }, [axiosInstance, token, isExpired]);

  return axiosInstance;
};
