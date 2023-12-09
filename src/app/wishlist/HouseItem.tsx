"use client";
import { IconStar } from "@/components/icons";
import Image from "next/image";
import React from "react";
import Link from "next/link";
interface IProps {
  house: any;
}
const HouseItem = ({ house }: IProps) => {
  return (
    <div className="boxItem w-fit h-[200px] max-w-[600px] bg-white p-3 rounded-lg shadow-lg flex gap-x-4">
      <div className="w-[200px] h-full relative">
        <Image
          src={house?.images[0]?.url || "/daLatHouse1.png"}
          fill
          className="object-cover rounded-lg"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          alt="houseImg.png"
        ></Image>
      </div>
      <div className="houseContent flex-1 ">
        <div className="flex flex-col justify-between h-full">
          <Link className="w-fit" href={`/house/${house._id}`}>
            <div>
              <div className="flex items-center gap-x-2">
                <p className="text-[18px] font-semibold">{house.title}</p>
                <p>·</p>
                <div className="flex items-center justify-center">
                  <span className="font-semibold text-sm leading-[27px]">
                    4,0 / 5,0
                  </span>
                  <IconStar className="h-3 ml-1"></IconStar>
                </div>
              </div>
              <p className="text-gray-500 text-sm overflow-hidden line-clamp-4 text-ellipsis">
                {house.description}
              </p>
            </div>
          </Link>
          <div className="flex items-center justify-between">
            <>
              {house?.calenderID?.available === true ? (
                <span className="text-base text-green-500 font-semibold">
                  Còn trống
                </span>
              ) : (
                <span className="text-base text-red-500 font-semibold">
                  Đã được thuê
                </span>
              )}
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HouseItem;
