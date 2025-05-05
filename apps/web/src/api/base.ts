import { API_URL } from "@constants/urls";
import axios from "axios";
import { useEffect, useMemo } from "react";

export const axiosInstanceAPI = () => {
  const axiosInstance = useMemo(() => {
    axios.create({
      withCredentials: true,
      baseURL: API_URL,
    });
  }, []);

  useEffect(() => {
    // const requestInterceptors = axiosInstance.interceptors.request
    //   .use
    //   (config) => {}
    //   ();
  }, []);

  return axiosInstance;
};
