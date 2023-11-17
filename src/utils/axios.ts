import { authApi, refreshAccessToken } from "@/apis/auth.apis";
import axios from "axios";
const baseURL = "http://localhost:8000";
export default axios.create({
  baseURL: baseURL,
  withCredentials: true,
  timeout: 10000,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const errMessage = error.response.data as string;
    if (
      errMessage.includes(
        "Phiên của bạn đã hết hạn. Vui lòng đăng nhập lại."
      ) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const access_token = await refreshAccessToken();
      axios.defaults.headers.common["Authorization"] = "Bearer " + access_token;
      return axios(originalRequest);
    }
    return Promise.reject(error);
  }
);
