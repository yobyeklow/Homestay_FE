import { IGuest } from "@/types/guests.types";
import axios from "axios";
export interface GenericResponse {
  message: string;
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
export const bookingHouse = async (
  guests: IGuest[],
  customer = "",
  house = "",
  checkInDate = "",
  checkOutDate = "",
  isRefund = true,
  isFreeRefund = true
) => {
  const response = await authApi.post<GenericResponse>(
    `/api/booking/${customer}/${house}`,
    {
      guests,
      checkInDate,
      checkOutDate,
      isRefund,
      isFreeRefund,
    }
  );
  return response.data;
};
export const getBookingByID = async (id: string | null) => {
  const response = await authApi.get(`/api/booking/${id}`);
  return response.data;
};
export const cancelBooking = async (
  bookingID: string | null,
  paymentID: string | null,
  reasonData: string | null
) => {
  const response = await authApi.patch(
    `/api/booking/cancel/${bookingID}/${paymentID}`,
    {
      reasonRefund: reasonData,
    }
  );
  return response.data;
};
