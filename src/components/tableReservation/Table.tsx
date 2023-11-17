"use client";
import { format } from "date-fns";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export async function TableHouse() {}
import React from "react";

const Table = ({ houseByHostList }: any) => {
  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };
  const data = houseByHostList?.map((item: any) => {
    const dataItem = {
      bookingID: item._id,
      customerName: item.customerID.name,
      customerPhone: item.customerID.phoneNumber,
      status: item.bookingStatus,
      checkInDate: format(new Date(item.checkInDate), "dd MMM yyyy"),
      checkOutDate: format(new Date(item.checkOutDate), "dd MMM yyyy"),
      bookedDate: format(new Date(item.createdAt), "dd MMM yyyy"),
      totalPayout: formatCurrency(item.totalPrice),
    };
    return dataItem;
  });
  return (
    <div className="px-[12px] mt-5">
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default Table;
