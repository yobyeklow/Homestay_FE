import axios from "@/utils/axios";
import { ICustomer } from "@/types/user.type";

interface IProps {
  page: number | null;
  limit: number | null;
  city: string | null;
  numberGuest: number | null;
  dateTo: string | null;
  dateFrom: string | null;
  lastBounds: {
    sw: {
      latitude: any;
      longtitude: any;
    };
    ne: {
      latitude: any;
      longtitude: any;
    };
  };
}
export const filterHouseByInput = async (
  page = 1,
  limit = 20,
  city = "",
  dateFrom = "",
  dateTo = "",
  numberGuest = 1
) => {
  const response = await axios.get<any>(
    `/api/house/filter/${page}/${limit}?city=${city}&dateFrom=${dateFrom}&dateTo=${dateTo}&numberGuest=${numberGuest}`
  );
  return response.data;
};
export const filterHouseByFilter = async (
  page,
  limit,
  bedCount,
  bedRoom,
  bathRoom,
  facilities,
  minPrice,
  maxPrice
) => {
  const response = await axios.get<any>(
    `/api/house/filter/${page}/${limit}?bedCount=${
      bedCount ? bedCount : ""
    }&countBedRoom=${bedRoom ? bedRoom : ""}&countBathRoom=${
      bathRoom ? bathRoom : ""
    }&facilities=${facilities ? facilities : ""}&minPrice=${
      minPrice ? minPrice : ""
    }&maxPrice=${maxPrice ? maxPrice : ""}`
  );
  return response.data;
};
export const filterNearHouse = async (lastbounds: {
  sw: {
    longtitude: 0;
    latitude: 0;
  };
  ne: {
    longtitude: 0;
    latitude: 0;
  };
}) => {
  const response = await axios.get(
    `/api/house/get-all-near-location?sw[latitude]=${lastbounds.sw.latitude}&sw[longtitude]=${lastbounds.sw.longtitude}&ne[latitude]=${lastbounds.ne.latitude}&ne[longtitude]=${lastbounds.ne.longtitude}`
  );
  return response.data;
};
