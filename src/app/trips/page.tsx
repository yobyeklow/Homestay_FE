"use client";
import Topbar from "@/components/layout/Topbar";
import React from "react";
import { ActiveLink } from "../account/page";
import styles from "@/styles/Topbar.module.css";
import Image from "next/image";
import { IconEllipsis, IconStar } from "@/components/icons";
import HouseItem from "./HouseItem";
import { useQueries, useQuery } from "react-query";
import { getHouseByID } from "@/apis/house.apis";
import { getBookingByCustomerID } from "@/apis/customer.apis";
import { IBooking } from "@/types/booking.types";
import tripsStyle from "@/styles/Trips.module.css";
import Skeleton from "react-loading-skeleton";
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
  return (
    <div className="tripPage">
      <Topbar></Topbar>
      <main className="tripContent max-w-[1440px] w-full h-full">
        <div className="mx-auto md:px-20">
          <h1 className="font-semibold text-[32px] pt-[36px] pb-[24px]  border-[1px] border-none border-b-[#717171]">
            Chuyến đi
          </h1>
          <div className="pt-[32px] pb-12 w-full h-full">
            <div
              className={`${tripsStyle.boxList} w-full max-h-screen h-full flex flex-col gap-y-4`}
            >
              {isLoading && <Skeleton></Skeleton>}
              {!isLoading &&
                data &&
                data?.bookings.map((house: any) => (
                  <HouseItem key={house._id} item={house}></HouseItem>
                ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TripPage;
