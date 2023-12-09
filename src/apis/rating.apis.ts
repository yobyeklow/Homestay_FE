import axios from "@/utils/axios";

export const postRating = async (
  houseID: string,
  customerID: string,
  data: any
) => {
  const response = await axios.post(
    `/api/house/${houseID}/${customerID}/rating`,
    data
  );
  return response.data;
};
