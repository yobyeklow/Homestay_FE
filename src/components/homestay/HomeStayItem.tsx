import React, { useEffect, useState } from "react";
import Image from "next/image";
import { IconHeart, IconStar } from "../icons/";
import Link from "next/link";
import { IHouse } from "@/types/house.types";

type THomeProps = {
  house: IHouse;
  setSelectedItems: any;
};
const config = { style: "currency", currency: "VND", maximumFractionDigits: 9 };

const HomeStayItem = ({ house }: THomeProps) => {
  const [selectedItems, setSelectedItems] = useState<any>([]);
  const handleIconClick = (itemID: any) => {
    setSelectedItems((prevItem: any) => [...prevItem, itemID]);
  };
  // useEffect(() => {
  //   localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
  // }, [selectedItems]);
  // const handleIconClick = (itemId: string) => {
  //   const isItemSelected = selectedItems.includes(itemId);
  //   if (isItemSelected) {
  //     const updatedItems = selectedItems.filter((id) => id !== itemId);
  //     setSelectedItems(updatedItems);
  //   } else {
  //     // Nếu chưa chọn, thêm vào mảng và cập nhật localStorage
  //     setSelectedItems((prevItems) => {
  //       return [...prevItems, itemId];
  //     });
  //   }
  // };
  useEffect(() => {
    console.log(selectedItems);
  }, [selectedItems]);
  return (
    <>
      <div className="homeStayItem cursor-pointer rounded-lg w-full shadow-md ">
        <div className="homeStayImage relative bg-[#dddddd] w-full h-[260px] rounded-xl">
          <IconHeart
            onClick={() => handleIconClick(house._id)}
            className="top-0 right-0 -translate-x-2 translate-y-2 w-6 h-6 absolute fill-[rgba(0,0,0,0.5)] stroke-white stroke-[2px] overflow-visible text-white z-10"
          ></IconHeart>
          <Link href={`/house/${house._id}`}>
            <Image
              src={
                house.images[0].url ||
                `https://a0.muscache.com/im/pictures/a286b2b4-e466-4932-bb56-811a7576d77d.jpg?im_w=720`
              }
              alt="homestay.jpg"
              fill
              className="object-cover rounded-xl"
            ></Image>
          </Link>
        </div>
        <div className="homeStayInfo pb-3 px-2 mt-3 text-[15px] leading-l19 break-all flex justify-between w-full ">
          <div className="flex gap-y-2   flex-col">
            <h3 className="font-semibold text-base">{house.locationID.city}</h3>
            {/* <p>Cách vườn quốc gia Phú Quốc</p> */}
            <p className="text-[#717171]">
              {
                <span>
                  Ngày {""}
                  {house.calenderID.dateFrom.split("T")[0].split("-")[2]} - {""}
                  {
                    house.calenderID.dateTo.split("T")[0].split("-")[2]
                  } tháng {house.calenderID.dateTo.split("T")[0].split("-")[1]}{" "}
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
    </>
  );
};

export default HomeStayItem;
