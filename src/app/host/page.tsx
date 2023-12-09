"use client";
import { IconSearch } from "@/components/icons";
import Topbar from "@/components/layout/Topbar";
import React, { useEffect } from "react";
import Table from "@/components/table/Table";
import Link from "next/link";
import { useQuery } from "react-query";
import { getAllHouseOfHouse } from "@/apis/host.apis";
import Skeleton from "react-loading-skeleton";
const HostPage = () => {
  const customerID = localStorage.getItem("customerID");
  const {
    data: houseByHostList,
    isLoading,
    error,
  } = useQuery<any>(
    ["houseByHost"],
    async () => {
      const response = await getAllHouseOfHouse(`${customerID}`);
      if (response) {
        return response;
      }
      return [];
    },
    {
      cacheTime: 10 * 60 * 1000,
      staleTime: 5 * 60 * 1000,
    }
  );
  useEffect(() => {
    if (houseByHostList) {
      window.location.reload();
    }
  }, []);
  if (isLoading) <Skeleton></Skeleton>;
  return (
    <div className="hostPage">
      <Topbar>
        <div className="flex gap-x-3">
          <span className="text-gray-500 font-semibold text-sm hover:bg-gray-100 hover:rounded-2xl py-3 px-4 cursor-pointer">
            <Link href="/host">Nhà/phòng cho thuê</Link>
          </span>

          <span className="text-gray-500 font-semibold text-sm hover:bg-gray-100 hover:rounded-2xl py-3 px-4 cursor-pointer">
            <Link href="/host/reservations">Đặt phòng</Link>
          </span>
          <span className="text-gray-500 font-semibold text-sm hover:bg-gray-100 hover:rounded-2xl py-3 px-4 cursor-pointer">
            <Link href="/host/finance">Thống kê</Link>
          </span>
        </div>
      </Topbar>
      <main className="w-full h-full px-2">
        <div className="title px-6 pt-7 pb-4 flex items-center justify-between">
          <span className="text-[22px] font-semibold leading-[26px]">
            {houseByHostList?.houseQuantity} nhà/phòng cho thuê
          </span>
          <button className=" h-[40px] px-4 flex items-center justify-center gap-x-3 rounded-lg border-[1px] border-black">
            <span className="font-bold text-[24px]">+</span>
            <span className="text-sm font-medium leading-5">
              <Link href="/host/addHouse">Tạo mục cho thuê</Link>
            </span>
          </button>
        </div>

        {houseByHostList ? (
          <Table houseByHostList={houseByHostList?.houses}></Table>
        ) : null}
      </main>
    </div>
  );
};

export default HostPage;
