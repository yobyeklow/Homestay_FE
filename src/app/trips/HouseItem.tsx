"use client";
import { IconEllipsis, IconStar } from "@/components/icons";
import { IBooking } from "@/types/booking.types";
import { IHouse } from "@/types/house.types";
import Image from "next/image";
import React, { useState } from "react";
import Popup from "./Popup";
import Link from "next/link";

const HouseItem = ({ item }: any) => {
  return (
    <Link className="w-fit" href={`/booking/customer/${item._id}`}>
      <div className="boxItem w-fit h-[200px] max-w-[600px] bg-white p-3 rounded-lg shadow-lg flex gap-x-4">
        <div className="w-[200px] h-full relative">
          <Image
            src="/daLatHouse1.png"
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt="houseImg.png"
          ></Image>
        </div>
        <div className="houseContent flex-1 ">
          <div className="flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-x-2">
                <p className="text-[18px] font-semibold">
                  {item.houseID.title}
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
                {item.houseID.description}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-base text-green-500 font-semibold">
                {item.bookingStatus}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default HouseItem;
