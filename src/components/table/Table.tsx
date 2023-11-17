"use client";
import { House, columns } from "./columns";
import { DataTable } from "./data-table";
import React from "react";

const TableHouse = ({ houseByHostList }: any) => {
  const data = houseByHostList.map((item: any) => {
    const dataItem = {
      houseID: item._id,
      name: item.title,
      status: item.calenderID.available ? "Đã đăng" : "Chưa đăng",
      bedRoom: item.roomID[0].count,

      bedCount: item.bedCount,
      bathRoom: item.roomID[1].count,

      location: item.locationID.city,
      listing: 1,
      image: item.images[0].url,
    };
    return dataItem;
  });
  console.log(data);
  // const data = [
  //   {
  //     id: houseByHostList._id,
  //     name: houseByHostList.title,
  //     status: houseByHostList.calenderID.available ? "Đã đăng" : "Chưa đăng",
  //     bedRoom: houseByHostList.roomID.filter(
  //       (room: any) => room.type === "phongngu"
  //     ).count,
  //     bedCount: houseByHostList.bedCount,
  //     bathRoom: houseByHostList.roomID.filter(
  //       (room: any) => room.type === "phongtam"
  //     ).count,
  //     location: houseByHostList.locationID.city,
  //     listing: 1,
  //     image: "",
  //   },
  //   // ...
  // ];
  // const data = [{}];
  return (
    <div className="px-[12px]">
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default TableHouse;
