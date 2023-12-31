"use client";
import Topbar from "@/components/layout/Topbar";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getBookingByCustomerID } from "@/apis/customer.apis";
import Skeleton from "react-loading-skeleton";
import HouseList from "./HouseList";
const TripPage = () => {
  const customerID = localStorage.getItem("customerID");

  const { data, isLoading, isError } = useQuery<any>(
    ["tripsHouse"],
    async () => {
      const response = await getBookingByCustomerID(customerID);
      return response;
    },
    {
      retry: 1,
      cacheTime: 10 * 60 * 1000,
      staleTime: 5 * 60 * 1000,
    }
  );
  useEffect(() => {
    if (data) {
      window.location.reload();
    }
  }, []);
  if (isLoading) return <Skeleton></Skeleton>;

  return (
    <div className="tripPage">
      <Topbar></Topbar>
      <main className="tripContent max-w-[1440px] w-full h-full">
        <div className="mx-auto md:px-20">
          <h1 className="font-semibold text-[32px] pt-[36px] pb-[24px]  border-[1px] border-none border-b-[#717171]">
            Chuyến đi
          </h1>
          <HouseList bookingHouses={data?.bookings}></HouseList>
        </div>
      </main>
    </div>
  );
};

export default TripPage;
