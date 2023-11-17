"use client";
import React, { useState } from "react";

const BathRoomCount = ({ dataArray, setCount, count }: any) => {
  const [activeButtons, setActiveButtons] = useState(
    dataArray.map((item: any, index: any) => {
      if (index == 0) return true;
      return false;
    })
  );

  const handleButtonClick = (index: number) => {
    const newActiveButtons = [...activeButtons];
    newActiveButtons.fill(false);
    newActiveButtons[index] = !newActiveButtons[index];
    setActiveButtons(newActiveButtons);
  };
  return (
    <div className="flex flex-col gap-y-3">
      <h3 className="text-base text-[#222222] font-normal">Phòng ngủ</h3>
      <div className="button-list flex items-center gap-x-4">
        {dataArray.map((item: any, index: any) => {
          return (
            <button
              type="button"
              onClick={() => {
                setCount({
                  ...count,
                  bathRoomCount: item.value,
                });
                handleButtonClick(index);
              }}
              key={item.id}
              className={`${
                activeButtons[index]
                  ? "bg-black text-white"
                  : "text-black bg-white"
              } py-[10px]  px-5 border-[1px] border-[##222222]  text-sm rounded-2xl`}
            >
              {item.text}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BathRoomCount;
