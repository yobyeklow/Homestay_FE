"use client";
import React, { useEffect, useState } from "react";
import styles from "@/styles/Booking.module.css";
import Link from "next/link";
import Image from "next/image";
import { IconLeft, IconStar } from "@/components/icons";
import { useRouter, useSearchParams } from "next/navigation";
import { formatISO, format, formatDistanceStrict, subDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { redirect } from "next/navigation";

import {
  Calendar,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui";
import { cn } from "@/lib/utils";
import { loadStripe } from "@stripe/stripe-js";
import axios from "@/utils/axios";
import { useMutation, useQuery } from "react-query";
import { bookingHouse } from "@/apis/booking.apis";
import { IGuest } from "@/types/guests.types";
import { toast } from "react-toastify";
import { getHouseByID } from "@/apis/house.apis";
import Skeleton from "react-loading-skeleton";
import { Elements } from "@stripe/react-stripe-js";
import PaymentMethod from "./PaymentMethod";
interface IPostBooking {
  guests: IGuest[];
  customerID: string;
  houseID: string;
  checkInDate: string;
  checkOutDate: string;
  isRefund: boolean;
  isFreeRefund: boolean;
}
const config = {
  style: "currency",
  currency: "VND",
  maximumFractionDigits: 9,
};
const BookingPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const houseID = searchParams.get("houseID");
  const [bookingData, setBookingData] = useState({
    numberOfAdults: parseInt(searchParams.get("numberOfAdults") as string),
    numberOfChildren: parseInt(searchParams.get("numberOfChildren") as string),
    checkInDate: new Date(searchParams.get("checkInDate") as string),
    checkOutDate: new Date(searchParams.get("checkOutDate") as string),
    houseID: houseID,
    customerID: searchParams.get("customerID"),
  });
  const {
    data: houseDetail,
    isLoading,
    error,
  } = useQuery<any>(
    ["BookingHouse"],
    async () => {
      const response = await getHouseByID(`${houseID}`);
      if (response) {
        return response.houses;
      }
      return [];
    },
    {
      cacheTime: 10 * 60 * 1000,
      staleTime: 5 * 60 * 1000,
    }
  );

  const [edit, setEdit] = useState({
    editDate: false,
    editAdult: false,
    editChildren: false,
  });

  const [adult, setAdult] = useState(1);
  const [children, setChildren] = useState(0);
  const [flag, setFlag] = useState(false);
  const [date, setDate] = React.useState<DateRange>({
    from: bookingData.checkInDate,
    to: bookingData.checkOutDate,
  });
  const handleEditBookingDate = () => {
    setBookingData({
      ...bookingData,
      checkInDate: date.from as Date,
      checkOutDate: date.to as Date,
    });
    setEdit({
      ...edit,
      editDate: false,
    });
  };
  const handleEditAdults = () => {
    setBookingData({
      ...bookingData,
      numberOfAdults: adult,
    });
    setEdit({
      ...edit,
      editAdult: false,
    });
  };
  const handleEditChildren = () => {
    setBookingData({
      ...bookingData,
      numberOfChildren: children,
    });
    setEdit({
      ...edit,
      editChildren: false,
    });
  };

  const stripePromise = loadStripe(
    "pk_test_51O3JgrBfbdixG3xjfblkbktCL6XquNhY0FwFZ6lws4vLL9ISFqJk36wi6CyzyQSGsUGAMcd4BIuebGox2Wv09CjP00zYVNlmCO"
  );
  const [clientSecret, setClientSecret] = useState(null);

  const getClientSercret = async () => {
    const response = await axios.post(
      "/api/auth/customer/create-payment-intent",
      {
        items: [{ id: "xl-tshirt" }],
      }
    );

    if (response.status == 200) {
      setClientSecret(response.data.clientSecret);
    }
    return null;
  };

  const appearance = {
    theme: "stripe",
  };
  var options = {
    clientSecret,
    appearance,
  };
  const { mutate } = useMutation(
    ({
      guests,
      customerID,
      houseID,
      checkInDate,
      checkOutDate,
      isRefund,
      isFreeRefund,
    }: IPostBooking) =>
      bookingHouse(
        guests,
        customerID,
        houseID,
        checkInDate,
        checkOutDate,
        isRefund,
        isFreeRefund
      ),
    {
      onSuccess(data: any) {
        toast.success(`${data.msg}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        router.push("http://localhost:3000/trips");
      },
      onError(err: any) {
        toast.error(err.data.msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      },
    }
  );
  const distance = formatDistanceStrict(
    new Date(Date.now()),
    bookingData.checkInDate,
    {
      unit: "day",
      roundingMethod: "floor",
    }
  );

  const handleBooking = () => {
    const guests = [
      {
        guestNumber: bookingData.numberOfAdults,
        guestType: "Người lớn",
      },
      {
        guestNumber: bookingData.numberOfChildren,
        guestType: "Trẻ em",
      },
    ];
    if (parseInt(distance.split(" ")[0]) > 3) {
      mutate({
        guests: guests,
        customerID: bookingData.customerID as string,
        houseID: bookingData.houseID as string,
        checkInDate: formatISO(bookingData.checkInDate),
        checkOutDate: formatISO(bookingData.checkOutDate),
        isRefund: true,
        isFreeRefund: true,
      });
    } else {
      mutate({
        guests: guests,
        customerID: bookingData.customerID as string,
        houseID: bookingData.houseID as string,
        checkInDate: formatISO(bookingData.checkInDate),
        checkOutDate: formatISO(bookingData.checkOutDate),
        isRefund: true,
        isFreeRefund: true,
      });
    }
  };
  const checkNumberGuest = () => {
    if (adult + children === houseDetail.numberGuest) {
      setFlag(true);
    } else {
      setFlag(false);
    }
  };

  useEffect(() => {
    if (!isLoading) {
      checkNumberGuest();
    }
    if (!clientSecret) {
      getClientSercret();
    }
  }, [adult, children]);
  if (isLoading) return <Skeleton></Skeleton>;
  return (
    <>
      {houseDetail && (
        <div className="bookingPage">
          <div className={`${styles.headerBar}`}>
            <div className="w-full p-6">
              <Link href="/">
                <h1 className="text-2xl font-bold text-primaryBtn">
                  BHomestay
                </h1>
              </Link>
            </div>
          </div>
          <main className="content w-full px-20 pb-5">
            <div className="wrapper max-w-[1120px] w-full mx-auto">
              <h1 className="text-3xl flex gap-x-4 pt-[64px] pb-[48px] font-bold leading-5 ">
                <IconLeft
                  onClick={() => router.push(`/house/${bookingData?.houseID}`)}
                  className={`w-[24px] h-[24px] cursor-pointer`}
                ></IconLeft>
                Xác nhận thanh toán
              </h1>
              <div className="grid grid-cols-2">
                <div className="left text-base">
                  <div className={`${styles.tripInfo}`}>
                    <h2 className="text-[22px] font-medium pb-6">
                      Thông tin chuyến đi của bạn
                    </h2>
                    <div className="flex justify-between items-center mb-3">
                      <div className="left">
                        <p className="font-semibold ">Ngày</p>
                        <p className="mt-2 font-extralight">
                          Ngày {bookingData?.checkInDate?.getDate()} - Ngày{" "}
                          {bookingData?.checkOutDate?.getDate()} tháng{" "}
                          {bookingData?.checkOutDate?.getMonth() + 1}
                        </p>
                      </div>
                      <div className="right">
                        {edit.editDate ? (
                          <div className="flex gap-x-2  items-center justify-center h-[50px]">
                            <div className={cn("grid gap-2")}>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <div>
                                    <button
                                      id="date"
                                      className={cn(
                                        "w-full justify-start text-left font-normal py-3 border-[1px] border-[#717171] rounded-lg px-2",
                                        !date && "text-muted-foreground"
                                      )}
                                    >
                                      <div className="flex">
                                        {date?.from ? (
                                          date.to ? (
                                            <>
                                              {format(date.from, "LLL dd, y")} -{" "}
                                              {format(date.to, "LLL dd, y")}
                                            </>
                                          ) : (
                                            format(date.from, "LLL dd, y")
                                          )
                                        ) : (
                                          <span>Pick a date</span>
                                        )}
                                      </div>
                                    </button>
                                  </div>
                                </PopoverTrigger>
                                <PopoverContent
                                  className="w-auto p-0"
                                  align="start"
                                >
                                  <Calendar
                                    initialFocus
                                    mode="range"
                                    defaultMonth={date?.from}
                                    selected={date}
                                    onSelect={() => setDate}
                                    numberOfMonths={2}
                                    disabled={(date) =>
                                      date < subDays(new Date(Date.now()), 1) ||
                                      date >
                                        new Date(
                                          houseDetail?.calenderID?.dateTo
                                        )
                                    }
                                  />
                                </PopoverContent>
                              </Popover>
                            </div>
                            <button className="save-btn h-[50px] bg-black px-4 py-2 rounded-lg">
                              <span
                                onClick={() => handleEditBookingDate()}
                                className="font-bold text-white"
                              >
                                Lưu
                              </span>
                            </button>
                            <button className="save-btn h-[50px] bg-black px-4 py-2 rounded-lg">
                              <span
                                onClick={() =>
                                  setEdit({
                                    ...edit,
                                    editDate: false,
                                  })
                                }
                                className="font-bold text-white"
                              >
                                Huỷ
                              </span>
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() =>
                              setEdit({
                                ...edit,
                                editDate: true,
                              })
                            }
                            className="font-bold underline"
                          >
                            Chỉnh sửa
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <div className="left">
                        <p className="font-semibold ">Người lớn</p>
                        <p className="mt-2">
                          {bookingData?.numberOfAdults} người lớn
                        </p>
                      </div>
                      <div className="right">
                        {edit.editAdult ? (
                          <div className="flex gap-x-2  items-center justify-center h-[50px]">
                            <div className="flex gap-x-3 text-[15px] items-center">
                              <span
                                onClick={() => setAdult(adult - 1)}
                                className={`${
                                  adult == 1
                                    ? "pointer-events-none border-1 border-[#B0B0B0] bg-[#717171] opacity-20 text-black"
                                    : ""
                                } cursor-pointer bg-white border border-black rounded-full py-1 px-3`}
                              >
                                -
                              </span>
                              <span>{adult}</span>
                              <span
                                onClick={() => {
                                  setAdult(adult + 1);
                                }}
                                className={`${
                                  flag
                                    ? "pointer-events-none border-1 border-[#B0B0B0] bg-[#717171] opacity-20 text-black"
                                    : ""
                                } cursor-pointer bg-white border border-black rounded-full py-1 px-3`}
                              >
                                {"+"}
                              </span>
                            </div>
                            <button className="save-btn h-[50px] bg-black px-4 py-2 rounded-lg">
                              {/* <IconCheck className="w-[16px] h-[16px] text-white font-bold"></IconCheck> */}
                              <span
                                onClick={() => handleEditAdults()}
                                className="font-bold text-white"
                              >
                                Lưu
                              </span>
                            </button>
                            <button className="save-btn h-[50px] bg-black px-4 py-2 rounded-lg">
                              {/* <IconCheck className="w-[16px] h-[16px] text-white font-bold"></IconCheck> */}
                              <span
                                onClick={() =>
                                  setEdit({
                                    ...edit,
                                    editAdult: false,
                                  })
                                }
                                className="font-bold text-white"
                              >
                                Huỷ
                              </span>
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() =>
                              setEdit({
                                ...edit,
                                editAdult: true,
                              })
                            }
                            className="font-bold underline"
                          >
                            Chỉnh sửa
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="left">
                        <p className="font-semibold ">Trẻ em</p>
                        <p className="mt-2">
                          {bookingData?.numberOfChildren} trẻ em
                        </p>
                      </div>
                      <div className="right">
                        {edit.editChildren ? (
                          <div className="flex gap-x-2  items-center justify-center h-[50px]">
                            <div className="flex gap-x-3 text-[15px] items-center">
                              <span
                                onClick={() => {
                                  setChildren(children - 1);
                                }}
                                className={`${
                                  children == 0
                                    ? "pointer-events-none border-1 border-[#B0B0B0] bg-[#717171] opacity-20 text-black"
                                    : ""
                                } cursor-pointer bg-white border border-black rounded-full py-1 px-3`}
                              >
                                {"-"}
                              </span>
                              <span>{children}</span>
                              <span
                                onClick={() => setChildren(children + 1)}
                                className={` ${
                                  flag
                                    ? "pointer-events-none border-1 border-[#B0B0B0] bg-[#717171] opacity-20 text-black"
                                    : ""
                                }cursor-pointer bg-white border border-black rounded-full py-1 px-3`}
                              >
                                {"+"}
                              </span>
                            </div>
                            <button className="save-btn h-[50px] bg-black px-4 py-2 rounded-lg">
                              {/* <IconCheck className="w-[16px] h-[16px] text-white font-bold"></IconCheck> */}
                              <span
                                onClick={() => handleEditChildren()}
                                className="font-bold text-white"
                              >
                                Lưu
                              </span>
                            </button>
                            <button className="save-btn h-[50px] bg-black px-4 py-2 rounded-lg">
                              {/* <IconCheck className="w-[16px] h-[16px] text-white font-bold"></IconCheck> */}
                              <span
                                onClick={() =>
                                  setEdit({
                                    ...edit,
                                    editChildren: false,
                                  })
                                }
                                className="font-bold text-white"
                              >
                                Huỷ
                              </span>
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() =>
                              setEdit({
                                ...edit,
                                editChildren: true,
                              })
                            }
                            className="font-bold underline"
                          >
                            Chỉnh sửa
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className={`${styles.paymentInfo}`}>
                    <h2 className="text-[22px] font-medium pb-6">
                      Phương thức thanh toán
                    </h2>
                    {clientSecret && (
                      <Elements options={options} stripe={stripePromise}>
                        <PaymentMethod></PaymentMethod>
                      </Elements>
                    )}
                  </div>
                  <div className={`${styles.policyInfo}`}>
                    <h2 className="text-[22px] font-medium pb-6">
                      Chính sách huỷ
                    </h2>
                    <p>
                      <span className="font-semibold">
                        {parseInt(distance.split(" ")[0]) > 3 &&
                          `Huỷ miễn phí trước ${subDays(
                            bookingData?.checkInDate,
                            3
                          ).getDate()} tháng ${subDays(
                            bookingData?.checkInDate,
                            3
                          ).getMonth()}. `}
                      </span>
                      Bạn sẽ được hoàn tiền một phần nếu huỷ trước khi nhận
                      phòng vào{" "}
                      <span className="font-semibold">
                        ngày {bookingData?.checkInDate?.getDate()} tháng{" "}
                        {bookingData?.checkOutDate?.getMonth()}
                      </span>
                    </p>
                  </div>
                  <div className="py-7">
                    <button
                      onClick={() => handleBooking()}
                      className="px-7 py-4 rounded-lg border-[1px] bg-primaryBtn font-bold text-lg text-white"
                    >
                      Yêu cầu đặt phòng
                    </button>
                  </div>
                </div>
                <div className="right mr-0 h-full ml-[8.4%]">
                  <div className="sticky z-10 top-[80px] w-full pr-[1px]">
                    <div className="boxItem mb-[80px] p-6 border-[1px] border-[rgb(221,221,221)] rounded-xl">
                      <div className={`${styles.houseInfo}`}>
                        <div className="left relative w-[126px] h-[96px]">
                          <Image
                            src="/daLatHouse1.png"
                            alt="houseImage.png"
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="w-full h-full object-cover rounded-lg"
                          ></Image>
                        </div>
                        <div className="right h-[96px] flex-1">
                          <div className="flex flex-col justify-between h-full">
                            <div className="wrap">
                              <h3 className="text-sm">{houseDetail?.title}</h3>
                              <p className="line-clamp-3 text-xs text-ellipsis">
                                {houseDetail?.description}
                              </p>
                            </div>

                            <div className="wrap flex items-center gap-x-1">
                              <IconStar className="w-[12px] h-[12px]"></IconStar>
                              <span className="text-xs">
                                <span className="font-bold">4,00</span>(10 đánh
                                giá)
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="priceDetail mt-6">
                        <h2 className="text-[22px] font-medium pb-6">
                          Chi tiết thanh toán
                        </h2>
                        {date?.from && date?.to && (
                          <div className="flex flex-col gap-y-4">
                            <div className="flex justify-between">
                              <div className="left">
                                {new Intl.NumberFormat("vi-VN", config).format(
                                  houseDetail?.costPerNight
                                )}{" "}
                                x{" "}
                                {parseInt(
                                  formatDistanceStrict(date?.from, date?.to, {
                                    unit: "day",
                                    roundingMethod: "floor",
                                  })
                                )}{" "}
                                đêm
                              </div>
                              <div className="right">
                                {new Intl.NumberFormat("vi-VN", config).format(
                                  houseDetail?.costPerNight *
                                    parseInt(
                                      formatDistanceStrict(
                                        date?.from,
                                        date?.to,
                                        {
                                          unit: "day",
                                          roundingMethod: "floor",
                                        }
                                      )
                                    )
                                )}
                              </div>
                            </div>
                            <div className="flex justify-between">
                              <div className="left">Tax: 8%</div>
                              <div className="right">
                                {new Intl.NumberFormat("vi-VN", config).format(
                                  houseDetail?.costPerNight *
                                    parseInt(
                                      formatDistanceStrict(
                                        date?.from,
                                        date?.to,
                                        {
                                          unit: "day",
                                          roundingMethod: "floor",
                                        }
                                      )
                                    ) *
                                    (8 / 100)
                                )}
                              </div>
                            </div>
                            <div className="flex font-bold justify-between">
                              <div className="left">Tổng (VND)</div>
                              <div className="right">
                                {new Intl.NumberFormat("vi-VN", config).format(
                                  houseDetail?.costPerNight *
                                    parseInt(
                                      formatDistanceStrict(
                                        date?.from,
                                        date?.to,
                                        {
                                          unit: "day",
                                          roundingMethod: "floor",
                                        }
                                      )
                                    ) +
                                    houseDetail?.costPerNight *
                                      parseInt(
                                        formatDistanceStrict(
                                          date?.from,
                                          date?.to,
                                          {
                                            unit: "day",
                                            roundingMethod: "floor",
                                          }
                                        )
                                      ) *
                                      (8 / 100)
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      )}
    </>
  );
};

export default BookingPage;
