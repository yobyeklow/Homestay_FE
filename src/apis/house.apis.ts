import { IHouse } from "@/types/house.types";
import axios from "@/utils/axios";

export const getHouseByID = async (id: string | null) => {
  const response = await axios.get<any>(`/api/house/${id}`);
  return response.data;
};
export const addHouse = async (data: any, id: string | null) => {
  const response = await axios.post(`/api/house/post-house-stays/${id}`, data);
  return response.data;
};
export const getHouseByHost = async (id: string | null) => {
  const response = await axios.get<any>(`/api/house`);
  return response.data;
};
export const searchHouse = async (
  city: string | null,
  dateFrom: string | null,
  dateTo: string | null,
  numberGuest: number | null
) => {
  const response = await axios.get(
    `/api/house/filter/1/20?city=${city}&dateFrom=${dateFrom}&dateTo=${dateTo}&numberGuest=${numberGuest}`
  );
  return response.data;
};
export const updateHouse = async (data: any, id: string | null) => {
  const response = await axios.patch(
    `/api/house/update-house-stay/${id}`,
    data
  );
  return response.data;
};
export const deleteHouseByID = async (
  hostID: string | null,
  houseID: string | null
) => {
  const response = await axios.delete(`/api/house/delete/${hostID}/${houseID}`);
  return response.data;
};
