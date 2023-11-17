import {
  IconBeach,
  IconFireDown,
  IconFirstAid,
  IconKitchen,
  IconMountain,
  IconSnow,
  IconTivi,
  IconWifi,
} from "@/components/icons";
import React, { useEffect } from "react";

const devicesList = [
  {
    id: "1",
    name: "Wi-fi",
    icon: <IconWifi className="w-[45px] h-[45px]"></IconWifi>,
    flag: false,
    category: "devices",
  },
  {
    id: "2",
    name: "TV",
    icon: <IconTivi className="w-[45px] h-[45px]"></IconTivi>,
    flag: false,
    category: "devices",
  },
  {
    id: "3",
    name: "Bếp",
    icon: <IconKitchen className="w-[45px] h-[45px]"></IconKitchen>,
    flag: false,
    category: "devices",
  },
  {
    id: "4",
    name: "Điều hoà nhiệt độ",
    icon: <IconSnow className="w-[45px] h-[45px]"></IconSnow>,
    flag: false,
    category: "devices",
  },
];
const viewList = [
  {
    id: "1",
    name: "Hướng nhìn ra núi",
    icon: <IconMountain className="w-[45px] h-[45px]"></IconMountain>,
    category: "view",
    flag: false,
  },
  {
    id: "2",
    name: "Hướng nhìn ra biển",
    icon: <IconBeach className="w-[45px] h-[45px]"></IconBeach>,
    category: "view",
    flag: false,
  },
];
const safeList = [
  {
    id: "1",
    name: "Bình chữa cháy",
    icon: <IconFireDown className="w-[45px] h-[45px]"></IconFireDown>,
    category: "safe",
    flag: false,
  },
  {
    id: "2",
    name: "Bộ sơ cứu",
    icon: <IconFirstAid className="w-[45px] h-[45px]"></IconFirstAid>,
    category: "safe",
    flag: false,
  },
];
interface IProps {
  facility: any;
  setFacility: any;
}
const FacilitiesReview = ({ facility, setFacility }: IProps) => {
  const handleSetFacility = (item: any) => {
    const existingFacility = facility.find(
      (f: any) => f.facilityType === item.category
    );
    if (existingFacility) {
      const update = facility.map((f: any) => {
        if (f.facilityType === existingFacility.facilityType) {
          return {
            ...f,
            facilityDetails: [
              ...f.facilityDetails,
              {
                facilityName: item.name,
                amount: 1,
              },
            ],
          };
        }
        return f;
      });
      setFacility(update);
    } else {
      const newItem = {
        facilityType: item.category,
        facilityDetails: [
          {
            facilityName: item.name,
            amount: 1,
          },
        ],
      };
      const updatedFacility = [...facility, newItem];
      setFacility(updatedFacility);
    }
  };

  const handleRemoveFacilityDetails = (item: any) => {
    const existingFacility = facility.find(
      (f: any) => f.facilityType === item.category
    );
    const isItemExists =
      existingFacility &&
      existingFacility.facilityDetails.find(
        (fDetails: any) => fDetails.facilityName === item.name
      );
    if (existingFacility && isItemExists) {
      const updatedFacility = facility.map((f: any) => {
        if (f.facilityType === existingFacility.facilityType) {
          return {
            ...f,
            facilityDetails: f.facilityDetails.filter(
              (detail: any) => detail.facilityName !== item.name
            ),
          };
        }
        return f;
      });
      const checkFacility = updatedFacility.filter(
        (f: any) => f.facilityDetails.length !== 0
      );
      setFacility(checkFacility);
    }
  };
  return (
    <div className="facilitiesReview w-full p-3 flex flex-col max-h-fit h-full border-[1px] border-gray-300 rounded-lg bg-white">
      <div className="devices flex flex-col gap-2">
        <span className="text-sm font-bold">Trang thiết bị</span>

        <div className="flex gap-x-2">
          {devicesList.map((item) => {
            return (
              <div
                key={item.id}
                onClick={() => {
                  if (!item.flag) {
                    item.flag = !item.flag;
                    handleSetFacility(item);
                  } else {
                    item.flag = !item.flag;

                    handleRemoveFacilityDetails(item);
                  }
                }}
                className={`${
                  item.flag
                    ? "border-[2px] border-black"
                    : "border-[1px] border-gray-[300]"
                } facilitiesItem gap-y-1 cursor-pointer p-4  rounded-xl max-w-[198px] max-h-[100px] w-full h-full bg-white shadow-md flex flex-col items-start justify-center`}
              >
                {item.icon}
                <span className="ml-2 text-sm font-semibold leading-5 text-[#222222]">
                  {item.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="view mt-3 flex flex-col gap-2">
        <span className="text-sm font-bold">Hướng nhìn</span>

        <div className="flex gap-x-2">
          {viewList.map((item) => {
            return (
              <div
                key={item.id}
                onClick={() => {
                  if (!item.flag) {
                    item.flag = !item.flag;
                    handleSetFacility(item);
                  } else {
                    item.flag = !item.flag;

                    handleRemoveFacilityDetails(item);
                  }
                }}
                className={`${
                  item.flag
                    ? "border-[2px] border-black"
                    : "border-[1px] border-gray-[300]"
                } facilitiesItem gap-y-1 cursor-pointer p-4  rounded-xl max-w-[198px] max-h-[100px] w-full h-full bg-white shadow-md flex flex-col items-start justify-center`}
              >
                {item.icon}
                <span className="ml-1 text-sm font-semibold leading-5 text-[#222222]">
                  {item.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="view mt-3 flex flex-col gap-2">
        <span className="text-sm font-bold">Thiết bị đảm bảo an toàn</span>

        <div className="flex gap-x-2">
          {safeList.map((item) => {
            return (
              <div
                key={item.id}
                onClick={() => {
                  if (!item.flag) {
                    item.flag = !item.flag;
                    handleSetFacility(item);
                  } else {
                    item.flag = !item.flag;

                    handleRemoveFacilityDetails(item);
                  }
                }}
                className={`${
                  item.flag
                    ? "border-[2px] border-black"
                    : "border-[1px] border-gray-[300]"
                } facilitiesItem gap-y-1 cursor-pointer p-4  rounded-xl max-w-[198px] max-h-[100px] w-full h-full bg-white shadow-md flex flex-col items-start justify-center`}
              >
                {item.icon}
                <span className="ml-1 text-sm font-semibold leading-5 text-[#222222]">
                  {item.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FacilitiesReview;
