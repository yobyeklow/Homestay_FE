"use client";
import { IconStar } from "@/components/icons";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import ModalRating from "./ModalRating";
interface IProps {
  house: any;
}
const HouseItem = ({ house }: IProps) => {
  let [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="boxItem w-fit h-[200px] max-w-[600px] bg-white p-3 rounded-lg shadow-lg flex gap-x-4">
        <div className="w-[200px] h-full relative">
          <Image
            src={house?.houseID?.images[0]?.url || "/daLatHouse1.png"}
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt="houseImg.png"
          ></Image>
        </div>
        <div className="houseContent flex-1 ">
          <div className="flex flex-col justify-between h-full">
            <Link className="w-fit" href={`/booking/customer/${house._id}`}>
              <div>
                <div className="flex items-center gap-x-2">
                  <p className="text-[18px] font-semibold">
                    {house?.houseID?.title}
                  </p>
                  <p>·</p>
                  <div className="flex items-center justify-center">
                    <span className="font-semibold text-sm leading-[27px]">
                      4,0 / 5,0
                    </span>
                    <IconStar className="h-3 ml-1"></IconStar>
                  </div>
                </div>
                <p className="text-gray-500 text-sm overflow-hidden line-clamp-4 text-ellipsis">
                  {house?.houseID?.description}
                </p>
              </div>
            </Link>
            <div className="flex items-center justify-between">
              <>
                {house?.bookingStatus === "Đang xử lý" && (
                  <span className="text-base text-yellow-500 font-semibold">
                    {house?.bookingStatus}
                  </span>
                )}
                {house?.bookingStatus === "Hoàn thành" && (
                  <span className="text-base text-green-500 font-semibold">
                    {house?.bookingStatus}
                  </span>
                )}
                {house?.bookingStatus === "Đã huỷ" && (
                  <span className="text-base text-red-500 font-semibold">
                    {house?.bookingStatus}
                  </span>
                )}
              </>
              {house?.bookingStatus === "Hoàn thành" && (
                <span
                  onClick={() => setIsOpen(true)}
                  className="text-sm font-bold text-black cursor-pointer"
                >
                  Đánh giá
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <ModalRating
        houseID={house?.houseID?._id}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      ></ModalRating>
    </>
  );
};

export default HouseItem;
