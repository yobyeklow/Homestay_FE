import { ICalendar } from "./calendar.types";
import { IFacilityTypeId } from "./facility.types";
import { IHost } from "./host.types";
import { ILocation } from "./location.types";
import { IRoom } from "./room.types";

export interface IHouse {
  _id: string;
  roomID: IRoom[];
  facilityTypeID: IFacilityTypeId[];
  hostID: IHost;
  numberGuest: number;
  title: string;
  description: string;
  costPerNight: number;
  images: any[];
  calenderID: ICalendar;
  locationID: ILocation;
}
