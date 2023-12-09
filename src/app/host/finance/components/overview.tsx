"use client";

import axios from "@/utils/axios";
import Skeleton from "react-loading-skeleton";
import { useQuery } from "react-query";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const calendar = [
  {
    name: "Jan",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Feb",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Mar",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Apr",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "May",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Jun",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Jul",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Aug",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Sep",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Oct",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Nov",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Dec",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
];

export function Overview() {
  const customerID = localStorage.getItem("customerID");
  const { data, isLoading } = useQuery({
    queryKey: ["revenueChart"],
    queryFn: async () => {
      const response = await axios.get(
        `/api/revenue/get-by-year/${customerID}/2023`
      );
      return response.data;
    },
  });
  if (isLoading) <Skeleton width="100%" height={350}></Skeleton>;
  const lastData = data?.map((item: number, index: number) => {
    calendar[index]["total"] = item;
    return calendar[index];
  });
  // console.log(lastData);
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={lastData}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
