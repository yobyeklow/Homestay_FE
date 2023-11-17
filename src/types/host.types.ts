import { ICustomer } from "./user.type";

export interface IHost {
  customerID: ICustomer;
  bankName: string;
  bankNumber: string;
  swiftCode: string;
  nameOnCard: string;
}
