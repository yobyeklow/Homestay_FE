import React from "react";
import Image from "next/image";
import { IconStar } from "../icons/";
import Link from "next/link";
import { IHouse } from "@/types/house.types";

type THomeProps = {
  house: IHouse;
};
const config = { style: "currency", currency: "VND", maximumFractionDigits: 9 };

const HomeStayItem = ({ house }: THomeProps) => {
  return (
    <>
      <Link href={`/house/${house._id}`}>
        <div className="homeStayItem cursor-pointer w-full">
          <div className="homeStayImage relative bg-[#dddddd] w-full h-[260px] rounded-xl">
            <Image
              src="https://a0.muscache.com/im/pictures/a286b2b4-e466-4932-bb56-811a7576d77d.jpg?im_w=720"
              alt="homestay.jpg"
              fill
              className="object-cover rounded-xl"
            ></Image>
          </div>
          <div className="homeStayInfo mt-3 text-[15px] leading-l19 break-all flex justify-between w-full ">
            <div className="flex gap-y-2   flex-col">
              <h3 className="font-semibold text-base">
                {house.locationID.city}
              </h3>
              {/* <p>Cách vườn quốc gia Phú Quốc</p> */}
              <p className="text-[#717171]">
                {
                  <span>
                    Ngày {""}
                    {
                      house.calenderID.dateFrom.split("T")[0].split("-")[2]
                    } - {""}
                    {
                      house.calenderID.dateTo.split("T")[0].split("-")[2]
                    } tháng{" "}
                    {house.calenderID.dateTo.split("T")[0].split("-")[1]}{" "}
                  </span>
                }
              </p>
              <p className="font-medium">
                {new Intl.NumberFormat("vi-VN", config).format(
                  house.costPerNight
                )}{" "}
                / <span className="font-normal">đêm</span>
              </p>
            </div>
            <div className="homeStayPoint flex flex-[1,0,auto] gap-x-2 text-base">
              <div className="flex justify-center gap-x-1">
                <IconStar className="w-[14px] h-[14px] translate-y-1"></IconStar>
                <span>4.8</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default HomeStayItem;
