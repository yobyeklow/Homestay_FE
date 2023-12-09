import axios from "@/utils/axios";
import { ICustomer } from "@/types/user.type";
import { IBooking } from "@/types/booking.types";

export const getUserByID = async (id: string | null) => {
  const response = await axios.get<ICustomer>(`/api/auth/customer/${id}`);
  return response.data;
};
export const getBookingByCustomerID = async (id: string | null) => {
  const response = await axios.get<IBooking | null>(
    `/api/booking/customer/get-all/${id}`
  );
  return response.data;
};
