export interface IFacilityTypeId {
  _id?: string;
  name: string;
  facilitiesDetail: IFacilitiesDetail[];
}

export interface IFacilitiesDetail {
  _id?: string;
  facilityName: string;
  amount: number;
}
