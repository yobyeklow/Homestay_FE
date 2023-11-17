"use client";
import { IconLeft } from "@/components/icons";
import Topbar from "@/components/layout/Topbar";
import Link from "next/link";
import React from "react";
import Table from "@/components/tableReservation/Table";
import { useQuery } from "react-query";
import { getAllReservation } from "@/apis/reservations";
import axios from "@/utils/axios";
import { usePathname } from "next/navigation";
const Reservations = () => {
  const pathname = usePathname();
  const customerID = localStorage.getItem("customerID");
  const { data, isLoading } = useQuery(["AllReservation"], async () => {
    const response = await axios.get(`/api/booking/get-all/${customerID}`);
    if (response.status === 200) {
      return response.data;
    }
    return null;
  });

  return (
    <>
      <Topbar>
        <div className="flex gap-x-3">
          <span className="text-gray-500 font-semibold text-sm hover:bg-gray-100 hover:rounded-2xl py-3 px-4 cursor-pointer">
            <Link href="/host">Nhà/phòng cho thuê</Link>
          </span>

          <span className="text-gray-500 font-semibold text-sm hover:bg-gray-100 hover:rounded-2xl py-3 px-4 cursor-pointer">
            <Link href="/host/reservations">Đặt phòng</Link>
          </span>
          <span className="text-gray-500 font-semibold text-sm hover:bg-gray-100 hover:rounded-2xl py-3 px-4 cursor-pointer">
            <Link href="/thongke">Thống kê</Link>
          </span>
        </div>
      </Topbar>
      <main className="reservationPage w-full h-full px-8 mt-16">
        <div className="title flex items-center gap-x-2 mb-10">
          <span className="translate-y-[10%]">
            <IconLeft className="w-[20px] h-[20px] leading-5 cursor-pointer font-bold"></IconLeft>
          </span>
          <h1 className="font-bold text-[32px]">Quản lý đặt phòng</h1>
        </div>
        <div className="wrapper w-full border-b-gray-300 border-b-[1px]">
          <div className="header-table flex items-center overflow-visible">
            <span
              className={` ${
                pathname === "/host/reservations"
                  ? "text-black font-semibold"
                  : ""
              } cursor-pointer relative p-[10px] my-[6px] ml-[10px] mr-[6px] text-base text-[#717171] font-medium`}
            >
              <Link href="/host/reservations">Tất cả</Link>
            </span>
            <span className="cursor-pointer p-[10px] my-[6px] ml-[10px] mr-[6px] text-base text-[#717171] font-medium">
              <Link href="/host/reservations/completed">Đã hoàn tất</Link>
            </span>
            <span className="cursor-pointer p-[10px] my-[6px] ml-[10px] mr-[6px] text-base text-[#717171] font-medium">
              <Link href="/host/reservations/cancelled">Đã huỷ</Link>
            </span>
          </div>
        </div>
        <div>{data && <Table houseByHostList={data.bookings}></Table>}</div>
      </main>
    </>
  );
};

export default Reservations;
