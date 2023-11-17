"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export type House = {
  bookingID: string;
  customerName: string;
  customerPhone: string;
  status: string;
  checkInDate: string;
  checkOutDate: string;
  bookedDate: string;
  totalPayout: number;
};

export const columns: ColumnDef<House>[] = [
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => {
      const data = row.getValue("status") as string;

      return (
        <>
          {data === "Đang xử lý" && (
            <div className="text-sm text-yellow-400 font-medium">{data}</div>
          )}
          {data === "Đã huỷ" && (
            <div className="text-sm text-red-500 font-medium">{data}</div>
          )}
          {data === "Hoàn thành" && (
            <div className="text-sm text-green-500 font-medium">{data}</div>
          )}
        </>
      );
    },
  },

  {
    accessorKey: "customerName",
    header: "Hành khách",
    cell: ({ row }) => {
      const guests = row.getValue("customerName") as string;
      // console.log(totalGuest);
      return (
        <div className="flex flec-col gap-y-2">
          <div className="text-sm text-black font-medium">{guests}</div>
          {/* <div className="text-xs text-gray-400">{totalGuest}</div> */}
        </div>
      );
    },
  },
  {
    accessorKey: "customerPhone",
    header: "Số điện thoại",
    cell: ({ row }) => {
      const phone = row.getValue("customerPhone") as string;
      // console.log(totalGuest);
      return (
        <div className="flex flec-col gap-y-2">
          <div className="text-sm text-black font-medium">{phone}</div>
          {/* <div className="text-xs text-gray-400">{totalGuest}</div> */}
        </div>
      );
    },
  },
  {
    accessorKey: "checkInDate",
    header: "Ngày nhận phòng",
    cell: ({ row }) => {
      const checkInDate = row.getValue("checkInDate") as string;
      return <span className="text-sm text-gray-500">{checkInDate}</span>;
    },
  },
  {
    accessorKey: "checkOutDate",
    header: "Ngày trả phòng",
    cell: ({ row }) => {
      const data = row.getValue("checkOutDate") as string;
      return <span className="text-sm text-gray-500">{data}</span>;
    },
  },
  {
    accessorKey: "bookedDate",
    header: "Ngày đặt phòng",
    cell: ({ row }) => {
      const data = row.getValue("bookedDate") as string;
      return <span className="text-sm text-gray-500">{data}</span>;
    },
  },
  {
    accessorKey: "totalPayout",
    header: "Tổng thu",
    cell: ({ row }) => {
      const data = row.getValue("totalPayout") as string;
      return <span className="text-sm text-gray-500">{data}</span>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const bookingID = row.original.bookingID;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link className="w-full" href={`/booking/${bookingID}`}>
                Xem chi tiết
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
