import { IHouse } from "@/types/house.types";
import axios from "@/utils/axios";

export const getAllReservation = async (id: string | null) => {
  const response = await axios.get<any>(`/api/booking/get-all/${id}`);
  return response.data;
};
