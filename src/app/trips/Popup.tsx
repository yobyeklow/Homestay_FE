import Link from "next/link";
import React from "react";
import styleTrips from "@/styles/Trips.module.css";
const Popup = (houseID: any) => {
  return <div className={`${styleTrips.popupWrapper} absolute`}></div>;
};

export default Popup;
