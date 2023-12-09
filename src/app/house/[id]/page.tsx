"use client";
import {
  IconKitchen,
  IconPoint,
  IconSearch,
  IconStar,
  IconUser,
} from "@/components/icons";
import Topbar from "@/components/layout/Topbar";
import React, { useState } from "react";
import styles from "@/styles/HouseDetail.module.css";
import Image from "next/image";
import MapReview from "./MapReview";
import RatingItem from "./RatingItem";
import Reservation from "./Reservation";
import HouseImages from "./HouseImages";
import { useQuery } from "react-query";
import axios from "@/utils/axios";
import { useParams } from "next/navigation";
import { IRoom } from "@/types/room.types";
import { IFacilityTypeId } from "@/types/facility.types";
import Skeleton from "react-loading-skeleton";
import { DateRangePicker } from "react-date-range";
import Link from "next/link";
import "@/styles/dateRange.css";
const HouseDetailPage = () => {
  const { id: houseID } = useParams();
  const {
    data: house,
    isLoading,
    isSuccess,
    error,
  } = useQuery<any>(
    ["OneHouse"],
    async () => {
      const response = await axios.get(`/api/house/${houseID}`);
      return response.data.houses;
    },
    {
      cacheTime: 10 * 60 * 1000,
      staleTime: 5 * 60 * 1000,
    }
  );

  if (isLoading) return <Skeleton></Skeleton>;
  return (
    <div className={`${styles.houseDetailPage}`}>
      <Topbar>
        {/* <div className="px-6 flex-[0_1_auto] min-w-[558px] inline-block ">
          <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm relative">
            <input
              value={filter.searchInput}
              onChange={(e) => {
                setFilter({ ...filter, searchInput: e.target.value });
              }}
              className="flex-grow pl-5 bg-transparent outline-none text-gray-600 placeholder-gray-400"
              type="text"
              placeholder="Địa điểm mà bạn muốn đến..."
            />

            <IconSearch className="hidden md:mx-2 right-2 md:inline-flex h-8 bg-primaryBtn text-white rounded-full p-2 cursor-pointer"></IconSearch>
            {filter.searchInput && (
              <div className="absolute top-[120%] z-40 -right-[23px]  bg-white">
                <DateRangePicker
                  ranges={[selectionRanges]}
                  minDate={new Date()}
                  rangeColors={["#45B39D"]}
                  onChange={handleSelectDate}
                ></DateRangePicker>
                <div className="flex items-center justify-between border-b pb-2 px-4 bg-white relative">
                  <p className="text-xl  mt-2">Số lượng hành khách</p>
                  <div className="flex items-center gap-x-2  mt-2">
                    <IconUser className="h-5"></IconUser>
                    <input
                      value={filter.numberOfGuests}
                      onChange={(e: any) =>
                        setFilter({ ...filter, numberOfGuests: e.target.value })
                      }
                      type="number"
                      min={1}
                      className="w-12 outline-none text-primaryBtn textlg"
                    />
                  </div>
                </div>
                <div className="flex relative bg-white">
                  <button
                    onClick={resetInput}
                    className="flex-grow text-gray-500 border-[1px] border-[#717171] py-2 hover:text-white hover:bg-red-500 hover:border-red-500"
                  >
                    Cancel
                  </button>
                  <Link
                    href={{
                      pathname: "/search",
                      query: {
                        checkInDate: filter.startDate.toUTCString(),
                        checkOutDate: filter.endDate.toUTCString(),
                        numberOfGuests: filter.numberOfGuests,
                        city: filter.searchInput,
                        isForward: true,
                      },
                    }}
                    className="flex-grow"
                  >
                    <button className="w-full text-primaryBtn border-[1px] border-[#717171] py-2 hover:border-primaryBtn hover:bg-primaryBtn hover:text-white">
                      Search
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div> */}
      </Topbar>
      {isSuccess && house && (
        <main className="content w-full px-20 h-full">
          <div className="wrapper max-w-[1120px] w-full mx-auto">
            <h1 className="text-[26px] font-bold leading-[30px] pt-6">
              {" "}
              {house?.title}
            </h1>
            <div className="topAddress flex gap-x-3 mt-1">
              <span className="text-sm font-medium underline cursor-pointer">
                1 đánh giá
              </span>
              <span>·</span>
              <span className="text-sm font-medium underline cursor-pointer">
                {house?.locationID?.streetAddress}
              </span>
            </div>
            <HouseImages imageData={house.images}></HouseImages>
            <div className="grid grid-cols-3 w-full h-full pt-[32px]">
              <div className="left col-start-1 col-end-3 max-w-[654px]">
                <div
                  className={`${styles.hostInfo} pb-6 flex justify-between items-center w-full`}
                >
                  <div className="left">
                    <h2 className="font-bold text-2xl leading-6 mb-2">
                      Thông tin nhà. Chủ nhà {house?.hostID?.customerID?.name}
                    </h2>
                    <div className="flex gap-x-3">
                      <p>Tối đa {house?.numberGuest} khách</p>
                      <p>·</p>
                      <p>{house?.roomID[0]?.count} phòng ngủ</p>
                      <p>·</p>
                      <p>{house?.bedCount} giường ngủ</p>
                      <p>·</p>
                      <p>{house?.roomID[1]?.count} phòng tắm</p>
                    </div>
                  </div>
                  <div className="right w-[56px] h-[56px] relative">
                    <Image
                      src="/people.png"
                      alt="hostAvatar.png"
                      className="object-cover rounded-full"
                      fill
                    ></Image>
                  </div>
                </div>
                <div className={`${styles.description} pt-[32px] pb-[48px]`}>
                  <h3 className="font-bold text-2xl pb-3">
                    Giới thiệu về chổ ở
                  </h3>
                  <p className="font-normal text-base leading-6 break-words">
                    {house?.description}
                  </p>
                </div>
                <div
                  className={`pt-[48px] pb-[32px] w-full h-[298px] overflow-hidden hover:overflow-y-scroll ${styles.scrollStyle}`}
                >
                  <h3 className="font-bold text-2xl mb-[24px]">
                    Nơi này sẽ có những gì cho bạn
                  </h3>
                  <div className={`flex flex-col `}>
                    {house?.facilityTypeID?.map(
                      (facilityType: IFacilityTypeId) => {
                        return (
                          <div key={facilityType?._id} className="facilityList">
                            <span className="text-lg font-semibold leading-[22px]">
                              {facilityType?.name === "devices" && "Thiết bị"}
                              {facilityType?.name === "view" && "Hướng nhìn"}
                              {facilityType?.name === "safe" &&
                                "Thiết bị an toàn"}
                            </span>
                            <div className="flex flex-col gap-y-2 my-2">
                              {facilityType?.facilitiesDetail?.map(
                                (facilitiesDetail) => {
                                  return (
                                    <>
                                      <span
                                        key={facilitiesDetail._id}
                                        className="pl-4 text-base text-[#717171]"
                                      >
                                        {facilitiesDetail.facilityName}
                                      </span>
                                    </>
                                  );
                                }
                              )}
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              </div>
              <div className="right h-full">
                <Reservation
                  calender={house?.calenderID}
                  housePrice={house?.costPerNight}
                  totalGuests={house.numberGuest}
                ></Reservation>
              </div>
            </div>
            <div className={`${styles.rating} pt-[48px] pb-[32px]`}>
              <div className="flex gap-x-2 items-center mb-[30px]">
                <IconStar className="w-[20px] h-[20px]"></IconStar>
                <span className="text-2xl font-bold">4,0</span>
                <span className="font-bold tex-2xl"> · </span>
                <span className="text-2xl font-bold">3 đánh giá</span>
              </div>
              <div className={`${styles.ratingListComment}`}>
                <div className={`${styles.ratingComment}`}>
                  <div className="top flex gap-x-3">
                    <div className="imageCustomer relative w-[48px] h-[48px]">
                      <Image
                        alt="customerAvatar.png"
                        src="/customerAvatar3.png"
                        fill
                        className="object-cover w-full h-full rounded-full"
                      ></Image>
                    </div>
                    <div className="flex flex-col">
                      <p className="font-bold text-base">Rachel Chimo</p>
                      <div className="ratingPoint flex items-center gap-x-[6px]">
                        <div className="totalPoint flex items-center">
                          <IconPoint className="w-[11px] h-[11px]"></IconPoint>
                          <IconPoint className="w-[11px] h-[11px]"></IconPoint>
                          <IconPoint className="w-[11px] h-[11px]"></IconPoint>
                          <IconPoint className="w-[11px] h-[11px]"></IconPoint>
                        </div>
                        <span>·</span>
                        <span className="text-xs">tháng 9 năm 2023</span>
                      </div>
                    </div>
                  </div>
                  <div className="bottom mt-3">
                    <p>
                      Great place in the heart of it all but equally private as
                      well. Host was responsive and helpful. Highly recommend
                      staying here.
                    </p>
                  </div>
                </div>
                <div className={`${styles.ratingComment}`}>
                  <div className="top flex gap-x-3">
                    <div className="imageCustomer relative w-[48px] h-[48px]">
                      <Image
                        alt="customerAvatar.png"
                        src="/customerAvatar2.png"
                        fill
                        className="object-cover w-full h-full rounded-full"
                      ></Image>
                    </div>
                    <div className="flex flex-col">
                      <p className="font-bold text-base">Heric San</p>
                      <div className="ratingPoint flex items-center gap-x-[6px]">
                        <div className="totalPoint flex items-center">
                          <IconPoint className="w-[11px] h-[11px]"></IconPoint>
                          <IconPoint className="w-[11px] h-[11px]"></IconPoint>
                          <IconPoint className="w-[11px] h-[11px]"></IconPoint>
                          <IconPoint className="w-[11px] h-[11px]"></IconPoint>
                        </div>
                        <span>·</span>
                        <span className="text-xs">tháng 9 năm 2023</span>
                      </div>
                    </div>
                  </div>
                  <div className="bottom mt-3">
                    <p>
                      Nice, hidden and cozy tiny house with modern interior!
                      Feels like an adventure to get there :D
                    </p>
                  </div>
                </div>
                <RatingItem></RatingItem>
              </div>
            </div>
            <MapReview location={house?.locationID}></MapReview>
          </div>
        </main>
      )}
    </div>
  );
};

export default HouseDetailPage;
