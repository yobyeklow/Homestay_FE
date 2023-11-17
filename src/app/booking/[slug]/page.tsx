"use client";
import { getBookingByID } from "@/apis/booking.apis";
import Topbar from "@/components/layout/Topbar";
import ModalRefund from "@/components/modal/ModalRefund";
import { format } from "date-fns";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useQuery } from "react-query";

const BillPage = () => {
  const formatCurrency = (amount: number) => {
    return amount?.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };
  const id = useParams().slug as string;
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading } = useQuery(
    ["bookingItem"],
    () => {
      const response = getBookingByID(id);
      if (response) {
        return response;
      }
      return null;
    },
    {
      retry: 1,
      cacheTime: 10 * 60 * 1000,
      staleTime: 5 * 60 * 1000,
    }
  );

  if (isLoading) return <Skeleton></Skeleton>;
  return (
    // <></>
    <>
      <Topbar></Topbar>
      <main className=" w-full h-full bg-white mt-5">
        <div className="w-full max-w-[1440px] h-full mx-auto">
          <h1 className="text-3xl font-bold mb-5 mt-10">
            Hoá đơn đặt phòng XXXX
          </h1>
          <div className="w-full h-full flex justify-between">
            <div className="left flex flex-col gap-y-4">
              <div className="customerInfo">
                <h2 className="text-xl font-bold text-green-500">
                  Thông tin khách khàng
                </h2>
                <div className="wrapper flex flex-col gap-y-3 mt-3">
                  <span className="font-bold  text-base">
                    Họ và tên:{data?.booking?.customerID?.name}
                  </span>
                  <span className="font-bold text-base">
                    Số điện thoại:{data?.booking?.customerID?.phoneNumber}
                  </span>
                  <span className="font-bold text-base">
                    Số hành khách: {data?.booking?.guestID[0]?.guestNumber}{" "}
                    người lớn - {data?.booking?.guestID[1]?.guestNumber} trẻ em
                  </span>
                </div>
              </div>
              <div className="paymentInfo">
                <h2 className="text-xl font-bold text-green-500">
                  Thông tin thanh toán
                </h2>
                <div className="wrapper flex flex-col gap-y-3 mt-3">
                  <span className="font-bold text-base">
                    Giá thuê:{" "}
                    {formatCurrency(data?.booking?.houseID?.costPerNight)}/ 1
                    đêm
                  </span>
                  <span className="font-bold text-base">
                    Tax: {data?.booking?.paymentID?.tax}%
                  </span>
                  <span className="font-bold text-base">
                    Tổng thanh toán:{" "}
                    {formatCurrency(data?.booking?.paymentID?.amount)}
                  </span>
                </div>
              </div>
            </div>
            <div className="right">
              <div className="w-[550px] bg-white shadow-lg rounded-lg">
                <div className="image relative w-full h-[250px] rounded-t-lg">
                  <Image
                    src="/daLatHouse1.png"
                    alt="image.png"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover rounded-t-lg"
                  ></Image>
                </div>
                <div className="px-5">
                  <div className="time py-4 border-b-[1px] border-b-gray-300">
                    <div className="left flex justify-between items-center">
                      <h2 className="font-bold text-xl text-green-500">
                        Thông tin homestay
                      </h2>
                      {data.booking.bookingStatus === "Đã huỷ" && (
                        <span className="text-red-500 text-base font-bold">
                          {data.booking.bookingStatus}
                        </span>
                      )}
                      {data.booking.bookingStatus === "Hoàn thành" && (
                        <span className="text-green-500 text-base font-bold">
                          {data.booking.bookingStatus}
                        </span>
                      )}
                      {data.booking.bookingStatus === "Đang xử lý" && (
                        <span className="text-yellow-500 text-base font-bold">
                          {data.booking.bookingStatus}
                        </span>
                      )}
                    </div>
                    <div className="right flex gap-y-2 flex-col mt-2">
                      <p className="font-bold line-clamp-1">
                        Tên: {data?.booking?.houseID?.title}
                      </p>
                      <p className="font-bold line-clamp-3">
                        Mô tả: {data?.booking?.houseID?.description}
                      </p>
                    </div>
                  </div>
                  <div className="time py-4 border-b-[1px] border-b-gray-300">
                    <h2 className="font-bold text-xl text-green-500">
                      Thời gian
                    </h2>

                    <div className="flex gap-y-2 flex-col mt-2">
                      <p className="font-bold">
                        Ngày nhận phòng:{" "}
                        {format(
                          new Date(data?.booking?.checkInDate),
                          "dd MMM yyyy"
                        )}
                      </p>
                      <p className="font-bold">
                        Ngày trả phòng:{" "}
                        {format(
                          new Date(data?.booking?.checkOutDate),
                          "dd MMM yyyy"
                        )}
                      </p>
                      <p className="font-bold">
                        Ngày thành toán:{" "}
                        {format(
                          new Date(data?.booking?.paymentID?.paymentDate),
                          "dd MMM yyyy"
                        )}
                      </p>
                    </div>
                  </div>
                  {data?.booking?.bookingStatus === "Đang tiến hành" ? (
                    <button
                      onClick={() => setIsOpen(true)}
                      className="my-5 px-4 py-3 border-[1px] border-red-500 bg-red-400 hover:bg-red-500 rounded-lg font-bold text-white"
                    >
                      Hoàn tiền
                    </button>
                  ) : (
                    <button className="my-5 pointer-events-none px-4 py-3 border-[1px] border-gray-500 opacity-30 bg-gray-400 hover:bg-gray-500 rounded-lg font-bold text-black">
                      Hoàn tiền
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <ModalRefund
        bookingData={data.booking}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      ></ModalRefund>
    </>
  );
};

export default BillPage;
