import axios from "axios";
import { useDispatch } from "react-redux";
import { ICustomer } from "@/types/user.type";
export interface ILoginResponse {
  accessToken: string;
}
export interface GenericResponse {
  message: string;
}
export interface LoginInput {
  email: string;
  password: string;
}
const baseURL = "http://localhost:8000";

export const authApi = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  timeout: 10000,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

export const refreshAccessToken = async () => {
  const response = await authApi.get<ILoginResponse>("/auth/refreshToken");
  return response.data;
};
export const signUpUser = async (user: ICustomer) => {
  const response = await authApi.post<GenericResponse>(
    "/api/auth/customer/register",
    user
  );
  return response;
};
export const loginUserFn = async (user: LoginInput) => {
  const response = await authApi.post<ICustomer>(
    "/api/auth/customer/login",
    user
  );
  return response.data;
};
export const logoutUserFn = async () => {
  const response = await authApi.get<GenericResponse>("/auth/logout");
  return response.data;
};
authApi.interceptors.response.use(
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
      return authApi(originalRequest);
    }
    return Promise.reject(error);
  }
);
