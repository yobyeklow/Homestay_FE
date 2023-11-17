import React from "react";
import styles from "@/styles/HouseDetail.module.css";
import Image from "next/image";
import { IconPoint } from "@/components/icons";
const RatingItem = () => {
  return (
    <div className={`${styles.ratingComment}`}>
      <div className="top flex gap-x-3">
        <div className="imageCustomer relative w-[48px] h-[48px]">
          <Image
            alt="customerAvatar.png"
            src="/customerAvatar1.png"
            fill
            className="object-cover w-full h-full rounded-full"
          ></Image>
        </div>
        <div className="flex flex-col">
          <p className="font-bold text-base">Rachel</p>
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
          {`the location is amazing. close to the market and the heart of Đà Lạt.
          but the alley quite small and stiff. the only thing I didn't like was
          the bed. it's hard like rock and I wasn't been able to sleep for 2
          nights. however it seems normal in vietnam with this type of mattress.
          overall they are very nice host and the location is good.`}
        </p>
      </div>
    </div>
  );
};

export default RatingItem;
