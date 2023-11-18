import { IHouse } from "@/types/house.types";
import React from "react";
import styles from "@/styles/HouseListMap.module.css";
import Image from "next/image";
import { IconStar } from "../icons";
import Link from "next/link";
interface IProps {
  houses: IHouse[];
}
const HouseList = ({ houses }: IProps) => {
  console.log(houses);
  return (
    <div className="flex justify-center items-center pl-6">
      <div className={`${styles.houseList}`}>
        {houses &&
          houses?.map((house, index) => {
            return (
              <Link key={house._id} href={`/house/${house._id}`}>
                <div
                  key={house._id}
                  className="houseItem cursor-pointer bg-white w-fit rounded-lg shadow-[rgba(99,_99,_99,_0.2)_0px_2px_8px_0px] max-h-[466px] h-full"
                >
                  <div className="relative w-[363px] h-[273px]">
                    <Image
                      src={house.images[0].url || "/house.jpg"}
                      alt="house.png"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover homeItem-Image rounded-lg "
                    ></Image>
                  </div>
                  <div className="houseItem-Info px-4 py-4 flex justify-between max-w-[363px] w-full">
                    <div className="left text-[15px] leading-5">
                      <h3 className="font-bold mb-3">{house?.title}</h3>
                      <p className="text-[rgb(113,_113,_113)] h-[80px] text-ellipsis max-w-[294px] line-clamp-4">
                        {house?.description}
                      </p>
                      <p className="text-[#717171] text-[0.9375rem] mt-2">
                        {
                          <span>
                            Ngày {""}
                            {
                              house.calenderID.dateFrom
                                .split("T")[0]
                                .split("-")[2]
                            }{" "}
                            -
                            {
                              house.calenderID.dateTo
                                .split("T")[0]
                                .split("-")[2]
                            }{" "}
                            tháng{" "}
                            {
                              house.calenderID.dateTo
                                .split("T")[0]
                                .split("-")[1]
                            }{" "}
                          </span>
                        }
                      </p>
                      <p className="mt-[6px]">
                        <span className="font-medium">600.000đ</span> / đêm
                      </p>
                    </div>
                    <div className="right flex gap-x-1">
                      <IconStar className="w-[14px] h-[14px]"></IconStar>
                      <span className="text-[14px] leading-[16px]">4.9</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default HouseList;
