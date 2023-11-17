"use client";
import { IconPoint } from "@/components/icons";
import {
  Calendar,
  Form,
  FormControl,
  FormItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui";
import { cn } from "@/lib/utils";
import { IBooking } from "@/types/booking.types";
import {
  addDays,
  formatISO,
  format,
  subDays,
  formatDistanceStrict,
} from "date-fns";
import React, { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { useForm } from "react-hook-form";
import styles from "@/styles/HouseDetail.module.css";
import { useParams } from "next/navigation";
import Link from "next/link";

const Reservation = ({
  housePrice,
  calender,
  totalGuests,
}: {
  housePrice: number;
  calender: any;
  totalGuests: number;
}) => {
  const config = {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 9,
  };
  const { id: houseID } = useParams();
  const customerID = localStorage.getItem("customerID");
  const [adult, setAdult] = useState(1);
  const [children, setChildren] = useState(0);
  const [flag, setFlag] = useState(false);
  const [date, setDate] = React.useState<DateRange>({
    from: new Date(Date.now()),
    to: addDays(new Date(Date.now()), 4),
  });
  const onSubmit = (values: any) => {
    values.checkInDate = formatISO(date.from as Date);
    values.checkOutDate = formatISO(date.to as Date);
    values.guests.push({
      guestNumber: adult,
      guestType: "Người lớn",
    });
  };
  const form = useForm<IBooking>({
    defaultValues: {
      guests: [],
      checkInDate: new Date(Date.now()),
      checkOutDate: addDays(new Date(Date.now()), 4),
    },
  });

  const checkNumberGuest = () => {
    if (adult + children === totalGuests) {
      setFlag(true);
    } else {
      setFlag(false);
    }
  };
  useEffect(() => {
    checkNumberGuest();
  }, [adult, children]);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <div className="relative">
          <div className="sticky top-[80px] z-10 pr-[1px]">
            <div className="pb-[48px]">
              <div className="boxItem rounded-[12px] border-[1px] border-[rgb(221,_221,_221)] bg-white p-6 shadow-[rgba(0,_0,_0,_0.12)_0px_6px_16px]">
                <div className="flex justify-between">
                  <div className="left">
                    <span>
                      <span className="font-bold text-[22px]">
                        {new Intl.NumberFormat("vi-VN", config).format(
                          housePrice
                        )}
                      </span>
                      <span> / đêm</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-x-1">
                    <IconPoint className="w-[12px] h-[12px]"></IconPoint>
                    <span className="font-medium">4,0</span>
                    <span> ·</span>
                    <span className="text-[#717171]">3 đánh giá</span>
                  </div>
                </div>
                <FormItem>
                  <div className={cn("grid gap-2 mt-5")}>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
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
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          initialFocus
                          mode="range"
                          defaultMonth={date?.from}
                          selected={date}
                          onSelect={setDate}
                          numberOfMonths={2}
                          disabled={(date) =>
                            date < subDays(new Date(Date.now()), 1) ||
                            date > new Date(calender.dateTo)
                          }
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </FormItem>
                <div
                  className={`mt-5 flex gap-y-4 flex-col ${styles.numberGuest}`}
                >
                  {/* <h3 className="font-medium text-base">Khách</h3> */}
                  <div className="flex justify-between items-center">
                    <div className="left">
                      <span className="text-[16px] font-medium">Người lớn</span>
                    </div>
                    <div className="right flex gap-x-3 text-[15px] items-center">
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
                        onClick={() => setAdult(adult + 1)}
                        className={`
                        ${
                          flag
                            ? "pointer-events-none border-1 border-[#B0B0B0] bg-[#717171] opacity-20 text-black"
                            : ""
                        }
              
                        cursor-pointer bg-white border border-black rounded-full py-1 px-3`}
                      >
                        {"+"}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="left">
                      <span className="text-[16px] font-medium">Trẻ em</span>
                    </div>
                    <div className="right flex gap-x-3 text-[15px] items-center">
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
                        className={`
                        ${
                          flag
                            ? "pointer-events-none border-1 border-[#B0B0B0] bg-[#717171] opacity-20 text-black"
                            : ""
                        }
              
                        cursor-pointer bg-white border border-black rounded-full py-1 px-3`}
                      >
                        {"+"}
                      </span>
                    </div>
                  </div>
                </div>
                {date && date?.from && date?.to && (
                  <div
                    className={`${styles.totalPrice} py-[15px] gap-y-3 flex-col flex`}
                  >
                    <div className="flex justify-between">
                      <p>
                        {new Intl.NumberFormat("vi-VN", config).format(
                          housePrice
                        )}
                        {" x "}
                        {parseInt(
                          formatDistanceStrict(date?.from, date?.to, {
                            unit: "day",
                            roundingMethod: "floor",
                          })
                        )}{" "}
                        đêm:
                      </p>
                      <p>
                        {new Intl.NumberFormat("vi-VN", config).format(
                          housePrice *
                            parseInt(
                              formatDistanceStrict(date?.from, date?.to, {
                                unit: "day",
                                roundingMethod: "floor",
                              })
                            )
                        )}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p>Thuế (8%):</p>
                      <p>
                        {new Intl.NumberFormat("vi-VN", config).format(
                          housePrice *
                            parseInt(
                              formatDistanceStrict(date?.from, date?.to, {
                                unit: "day",
                                roundingMethod: "floor",
                              })
                            ) *
                            (8 / 100)
                        )}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="font-bold text-base">Tổng tiền:</p>
                      <p>
                        {new Intl.NumberFormat("vi-VN", config).format(
                          housePrice *
                            parseInt(
                              formatDistanceStrict(date?.from, date?.to, {
                                unit: "day",
                                roundingMethod: "floor",
                              })
                            ) +
                            housePrice *
                              parseInt(
                                formatDistanceStrict(date?.from, date?.to, {
                                  unit: "day",
                                  roundingMethod: "floor",
                                })
                              ) *
                              (8 / 100)
                        )}
                      </p>
                    </div>
                  </div>
                )}

                {date?.from && date?.to ? (
                  <Link
                    href={{
                      pathname: "/booking/stay",
                      query: {
                        numberOfAdults: adult,
                        numberOfChildren: children,
                        checkInDate: formatISO(date?.from as Date),
                        checkOutDate: formatISO(date?.to as Date),
                        houseID: houseID,
                        customerID: customerID,
                      },
                    }}
                  >
                    <button
                      className={`${
                        customerID
                          ? ""
                          : "bg-gray-400 pointer-events-none text-black"
                      } w-full mb-2 bg-primaryBtn py-3 rounded-lg mt-6 font-bold text-white text-base`}
                    >
                      Đặt phòng
                    </button>
                  </Link>
                ) : (
                  <button
                    className={`${
                      customerID
                        ? ""
                        : "bg-gray-400 pointer-events-none text-black"
                    } w-full mb-2 bg-primaryBtn py-3 rounded-lg mt-6 font-bold text-white text-base`}
                  >
                    Đặt phòng
                  </button>
                )}

                <p className="text-center text-xs text-[#717171]">
                  Nhấn Đặt phòng để tiến hành thanh toán
                </p>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default Reservation;
