import React from "react";
import { IconMap } from "../icons";

interface IProps {
  onClick: any;
}
const MapButton = ({ onClick }: IProps) => {
  return (
    <div className="fixed bottom-0 z-10 mb-10 w-full text-center">
      <button
        onClick={onClick}
        className=" rounded-3xl outline-none py-[14px] px-[19px] bg-primaryBtn font-semibold text-[15px] text-white"
      >
        <div className="flex items-center gap-x-2">
          <IconMap className="w-[18px] h-[18px]"></IconMap>
          <span>Hiển thị bản đồ</span>
        </div>
      </button>
    </div>
  );
};

export default MapButton;
