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
  return (
    <div className="px-[12px]">
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default TableHouse;
