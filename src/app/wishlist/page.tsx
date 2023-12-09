"use client";
import Topbar from "@/components/layout/Topbar";
import React, { useEffect, useState } from "react";
import styles from "@/styles/HouseDetail.module.css";
import HouseItem from "./HouseItem";
import { useQuery } from "react-query";
import { getFavoritesHouse } from "@/apis/house.apis";
import tripsStyle from "@/styles/Trips.module.css";
import Skeleton from "react-loading-skeleton";
const TripPage = () => {
  const favoritesList = localStorage.getItem("favorites");

  const { data, isLoading, isError } = useQuery<any>(
    ["wishlistHouse"],
    async () => {
      const response = await getFavoritesHouse(favoritesList);
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
            Homestay yêu thích
          </h1>
          <div className={`pt-[32px] pb-12 w-full h-full`}>
            <div
              className={`${tripsStyle.boxList} ${styles.scrollStyle} w-full max-h-screen h-full flex flex-col gap-y-4`}
            >
              {data?.houses.map((house: any) => (
                <HouseItem key={house._id} house={house}></HouseItem>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TripPage;
