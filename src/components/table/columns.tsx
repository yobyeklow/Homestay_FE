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
import { deleteHouseByID } from "@/apis/house.apis";
import { toast } from "react-toastify";

export type House = {
  houseID: string;
  name: string;
  status: string;
  bedRoom: number;
  bedCount: number;
  bathRoom: number;
  location: string;
  listing: any;
  image: string;
};

export const columns: ColumnDef<House>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nhà/phòng cho thuê
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const data = row.getValue("name") as string;
      const image = row.original.image;
      return (
        <div className="flex items-center gap-x-2 pl-2 max-w-[417px] w-full">
          <div className="relative max-w-[56px] w-full h-[40px]">
            <Image
              src={image || "/daLatHouse1.png"}
              alt="house.png"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="absolute object-cover rounded-lg"
            ></Image>
          </div>
          <span className="font-bold line-clamp-1 ">{data}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;

      return (
        <div className="btn font-bold text-sm flex gap-x-2 items-center">
          {status === "Chưa đăng" ? (
            <span className="w-2 h-2 rounded-full bg-red-600"></span>
          ) : (
            <span className="w-2 h-2 rounded-full bg-green-600"></span>
          )}

          <span>{status}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "listing",
    header: "Đăng tải",
    cell: ({ row }) => {
      const status = row.getValue("status");
      const handleChangeStatus = async () => {
        console.log("Yes");
      };
      return (
        <div className="btn">
          {status === "Chưa đăng" && (
            <button
              onClick={handleChangeStatus}
              className="py-2 px-3 font-medium text-sm border-black border-[1px] rounded-xl"
            >
              Đăng tải
            </button>
          )}
          {status === "Đã đăng" && (
            <button
              onClick={handleChangeStatus}
              className="pointer-events-none py-2 px-3 border-1 border-black bg-[#717171] opacity-30 font-medium text-sm  border-[1px] rounded-xl"
            >
              Đăng tải
            </button>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "bedRoom",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Phòng ngủ
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const data = row.getValue("bedRoom") as string;
      return <span className="px-4">{data}</span>;
    },
  },
  {
    accessorKey: "bedCount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Giường
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const data = row.getValue("bedCount") as string;
      return <span className="px-4">{data}</span>;
    },
  },
  {
    accessorKey: "bathRoom",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Phòng tắm
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const data = row.getValue("bathRoom") as string;
      return <span className="px-4">{data}</span>;
    },
  },
  {
    accessorKey: "location",
    header: "Địa điểm",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const houseID = row.original.houseID;
      const customerID = localStorage.getItem("customerID");
      const handleDeleteHouse = async () => {
        try {
          const response = await deleteHouseByID(customerID, houseID);
          if (response) {
            toast.success("Đã xoá Homestay thành công", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        } catch (err) {
          console.log(err);
        }
      };
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
              <Link href={`/house/${houseID}`}>Xem chi tiết</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={`/host/updateHouse/${houseID}`}>Chỉnh sửa</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span
                className="cursor-pointer w-full h-full"
                onClick={handleDeleteHouse}
              >
                Xoá
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
