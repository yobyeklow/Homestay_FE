import { ICustomer } from "@/types/user.type";
import axios from "@/utils/axios";

export const updateUserInfo = async (id: string | null, data: ICustomer) => {
  const response = await axios.patch<string>(
    `/api/auth/customer/${id}/update`,
    data
  );
  return response.data;
};
export const getUserInfo = async (id: string | null) => {
  const response = await axios.get<any>(`/api/auth/customer/${id}`);
  return response.data.customer;
};
