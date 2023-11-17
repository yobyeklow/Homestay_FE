import { IGuest } from "./guests.types";

export interface IBooking {
  _id?: string | null;
  houseID?: string | null;
  customerID?: string | null;
  paymentID?: string | null;
  checkInDate: Date;
  checkOutDate: Date;
  bookingStatus?: String;
  totalPrice?: Number;
  guests: IGuest[];
}
