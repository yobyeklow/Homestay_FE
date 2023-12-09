import axios from "@/utils/axios";

export const getRevenueByDate = async (
  hostID: string,
  dateFrom: string,
  dateTo: string
) => {
  const response = await axios.get(
    `/api/revenue/from-the-start-date-to-end-date/${hostID}?dateForm=${dateFrom}&dateTo=${dateTo}`
  );
  return response.data;
};
