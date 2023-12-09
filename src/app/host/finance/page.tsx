"use client";
import { Metadata } from "next";
import Image from "next/image";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/";
import { CalendarDateRangePicker } from "./components/date-range-picker";
import { Overview } from "./components/overview";
import { RecentSales } from "./components/recent-sale";
import Topbar from "@/components/layout/Topbar";
import Link from "next/link";
import { useQuery } from "react-query";
import { getRevenueByDate } from "@/apis/revenue.apis";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";
import Skeleton from "react-loading-skeleton";
import { useLastData } from "@/utils/useLastData";
import { useDebounce } from "@uidotdev/usehooks";

export default function FinancePage() {
  // const [customerID,setCustomerID]= useState("");
  // useEffect(()=>{
  //   if(localStorage.getItem("customerID")){
  //     const id = localStorage.getItem("customerID");
  //     setCustomerID(id);
  //   }
  // },[])
  const customerID = localStorage.getItem("customerID");
  const month = new Date().getMonth();
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2023, month, 1),
    to: addDays(new Date(2023, month, 20), 20),
  });
  const lastData = useDebounce(date, 1000);
  // console.log(lastData);
  useEffect(() => {
    refetch();
  }, [lastData?.from, lastData?.to]);
  const { data, isLoading, refetch } = useQuery<any>(
    ["RevenueDate"],
    async () => {
      const response = getRevenueByDate(
        customerID,
        lastData?.from?.toISOString(),
        lastData?.to?.toISOString()
      );
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
  const config = {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 9,
  };
  if (isLoading) return <Skeleton></Skeleton>;
  // console.log(data);
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
            <Link href="/host/finance">Thống kê</Link>
          </span>
        </div>
      </Topbar>
      <div className="md:hidden">
        <Image
          src="/examples/dashboard-light.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="block dark:hidden"
        />
        <Image
          src="/examples/dashboard-dark.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden flex-col md:flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">
              Thống kê tài chính
            </h2>
            <div className="flex items-center space-x-2">
              <CalendarDateRangePicker date={date} setDate={setDate} />
              {/* <Button>Download</Button> */}
            </div>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Tổng doanh thu
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {new Intl.NumberFormat("vi-VN", config).format(
                        data?.sumCompletedRevenue
                      )}
                    </div>
                    {/* <p className="text-xs text-muted-foreground">
                      +20.1% from last month
                    </p> */}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Đã cho thuê
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      +{data?.completedBookings}
                    </div>
                    {/* <p className="text-xs text-muted-foreground">
                      +180.1% from last month
                    </p> */}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Đã huỷ
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <path d="M2 10h20" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      +{data?.canceledBookings}
                    </div>
                    {/* <p className="text-xs text-muted-foreground">
                      +19% from last month
                    </p> */}
                  </CardContent>
                </Card>
                {/* <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Active Now
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+573</div>
                    <p className="text-xs text-muted-foreground">
                      +201 since last hour
                    </p>
                  </CardContent>
                </Card> */}
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Tổng quan</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Overview />
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Lượt khách thuê gần đây</CardTitle>
                    <CardDescription>
                      Khách hàng thuê nhà/phòng trong tháng này.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {data?.customers ? (
                      <RecentSales guests={data?.customers} />
                    ) : (
                      <Skeleton></Skeleton>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
