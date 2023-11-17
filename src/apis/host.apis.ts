import axios from "@/utils/axios";

export const becomeHost = async (id: string | null) => {
  const response = await axios.patch<string>(`/api/host/${id}/host-become`);
  return response.data;
};
export const getAllHouseOfHouse = async (id: string | null) => {
  const response = await axios.get<any>(`/api/house/get-all/${id}`);
  return response.data;
};
