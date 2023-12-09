import React from "react";
import HouseItem from "./HouseItem";
import tripsStyle from "@/styles/Trips.module.css";
import styles from "@/styles/HouseDetail.module.css";
interface IProps {
  bookingHouses: any;
}
const HouseList = ({ bookingHouses }: IProps) => {
  return (
    <div className={`pt-[32px] pb-12 w-full h-full`}>
      <div
        className={`${tripsStyle.boxList} ${styles.scrollStyle} w-full max-h-screen h-full flex flex-col gap-y-4`}
      >
        {bookingHouses?.map((house: any) => (
          <HouseItem key={house._id} house={house}></HouseItem>
        ))}
      </div>
    </div>
  );
};

export default HouseList;
