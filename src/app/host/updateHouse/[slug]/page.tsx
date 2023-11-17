"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea,
} from "@/components/ui";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import SearchBox from "../../addHouse/SearchBox";

import PreviewImage from "../../addHouse/PreviewImage";
import Room from "../../addHouse/Room";
import "@/styles/AddHouse.css";
import FacilitiesReview from "../../addHouse/FacilitiesReview";
import { useMutation, useQuery } from "react-query";
import { addHouse, getHouseByID, updateHouse } from "@/apis/house.apis";
import { toast } from "react-toastify";
import { imageUpload } from "@/utils/imageUpload";
import { formatISO } from "date-fns";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Skeleton from "react-loading-skeleton";

const AddHousePage = () => {
  const id = useParams();

  const schema = yup.object();
  const [images, setImages] = useState<any>(null);

  const form = useForm({
    defaultValues: {
      houseID: {
        numberGuest: 1,
        title: "",
        description: "",
        costPerNight: 0,
        bedCount: 1,
        images: [],
      },
      locationID: {
        streetAddress: "Wade Cooper",
        city: "",
        zipCode: "900000",
        coordinate: {
          x: 0,
          y: 0,
        },
      },

      calendar: {
        dateFrom: new Date(),
        dateTo: new Date(),
      },
      rooms: [
        {
          _id: "",
          count: 1,
          name: "",
          type: "",
        },
      ],
      facilities: [
        {
          _id: "",
          facilityType: "",
          facilityDetails: [
            {
              facilityName: "",
              amount: 0,
            },
          ],
        },
      ],
    },
  });
  const [dataRoom, setDataRoom] = useState({
    numberGuests: 4,
    bedCount: 1,
    room: [
      {
        count: 1,
        name: "Phòng ngủ",
        type: "phongngu",
      },
      {
        count: 1,
        name: "Phòng tắm",
        type: "phongtam",
      },
    ],
  });
  const [facility, setFacility] = useState([]);
  const { data: houseData, isLoading } = useQuery(
    ["houseDataBase"],
    async () => {
      const response = await getHouseByID(id?.slug as string);
      if (response) {
        form.setValue("houseID.bedCount", response?.houses?.bedCount);
        form.setValue("houseID.images", response?.houses?.images);
        form.setValue("houseID.title", response?.houses?.title);
        form.setValue("houseID.description", response?.houses?.description);
        form.setValue("houseID.costPerNight", response?.houses?.costPerNight);
        form.setValue("locationID", response?.houses.locationID);
        // form.setValue("facilities", response?.houses?.facilityTypeID);
        // form.setValue("rooms", response?.houses?.rooms);
        form.setValue("calendar", response?.houses?.calenderID);
        setImages(response?.houses?.images);
        // setFacility(response?.houses?.facilityTypeID);
        return response;
      }
      return null;
    }
  );

  const router = useRouter();
  const { mutate } = useMutation(
    ({ houseID, data }: { houseID: string | null; data: any }) =>
      updateHouse(data, houseID),
    {
      onSuccess(announce: any) {
        toast(announce?.msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        router.push("/host");
      },
      onError(err: any) {
        console.log(err);
      },
    }
  );
  const onSubmit = async (values: any) => {
    const imgFileList =
      Object.values(images) || form.getValues("houseID.images");
    const imgURL =
      imgFileList !== form.getValues("houseID.images")
        ? await imageUpload(imgFileList)
        : form.getValues("houseID.images");
    const dateNow = new Date(Date.now());
    const dateAfterSix = new Date(dateNow);
    dateAfterSix.setMonth(dateAfterSix.getMonth() + 6);
    const formatDateNow = formatISO(dateNow);
    const formateDateSix = formatISO(dateAfterSix);

    const data = {
      house: {
        numberGuest: dataRoom.numberGuests,
        title: values?.houseID?.title,
        description: values.houseID.description,
        costPerNight: values.houseID.costPerNight,
        bedCount: dataRoom.bedCount,
        images: imgURL || form.getValues("houseID.images"),
      },
      location: {
        streetAddress: values?.locationID?.streetAddress,
        city: values.locationID.city,
        zipCode: "900000",
        coordinates: {
          x: values.locationID.coordinates.x,
          y: values.locationID.coordinates.y,
        },
      },

      calendar: {
        available: true,
        dateFrom: formatDateNow,
        dateTo: formateDateSix,
      },
      rooms: [
        {
          _id: houseData.houses.roomID[0]?._id,
          count: dataRoom.room[0].count,
          name: dataRoom.room[0].name,
          type: dataRoom.room[0].type,
        },
        {
          _id: houseData.houses.roomID[1]?._id,
          count: dataRoom.room[1].count,
          name: dataRoom.room[1].name,
          type: dataRoom.room[1].type,
        },
      ],
      facilities: facility,
    };
    const houseID = houseData.houses._id;
    // console.log(values);
    console.log(data);
    mutate({ houseID: houseID, data: data });
  };
  // console.log(images);
  if (isLoading) return <Skeleton></Skeleton>;
  return (
    <div className="AddHousePage bg-gray-300 min-h-screen w-full">
      <div className="wrapper p-5 border-[1px] border-gray-300 shadow-md rounded-lg mx-auto bg-white max-w-[1600px] w-full h-full">
        <h1 className="text-2xl font-bold text-center mb-10">
          Cập nhật thông tin Homestay
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <div className=" grid grid-cols-2 gap-3">
              <div className="left  border-r-[1px] border-r-black pr-5">
                <FormField
                  name="locationID"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <label
                        htmlFor=""
                        className="font-semibold text-base text-black"
                      >
                        Địa chỉ đường
                      </label>
                      <SearchBox
                        defaultValue=""
                        onSelectAddress={(
                          address,
                          latitude,
                          longtitude,
                          city
                        ) => {
                          form.setValue("locationID.streetAddress", address);
                          form.setValue("locationID.coordinate.x", latitude);
                          form.setValue("locationID.coordinate.y", longtitude);
                          form.setValue("locationID.city", city);
                        }}
                        form={form}
                      ></SearchBox>
                    </FormItem>
                  )}
                ></FormField>
                <FormField
                  name="houseID.images"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="mt-3">
                      <FormLabel className="text-base font-bold">
                        Khung cảnh ngôi nhà{" "}
                      </FormLabel>
                      <PreviewImage setImages={setImages}></PreviewImage>
                    </FormItem>
                  )}
                ></FormField>
                <FormField
                  name="rooms"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="mt-3">
                      <FormLabel className="text-base font-bold">
                        Thông tin cơ bản về chỗ ở
                      </FormLabel>
                      <Room
                        dataRoom={dataRoom}
                        setDataRoom={setDataRoom}
                      ></Room>
                    </FormItem>
                  )}
                ></FormField>
                <FormField
                  name="facilities"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="mt-3">
                      <FormLabel className="text-base font-bold">
                        Thông tin về các thiết bị tiện ích
                      </FormLabel>
                      <FacilitiesReview
                        facility={facility}
                        setFacility={setFacility}
                      ></FacilitiesReview>
                    </FormItem>
                  )}
                ></FormField>
              </div>
              <div className="right flex flex-col gap-3">
                <FormField
                  name="houseID.title"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        htmlFor="houseID.title"
                        className="font-semibold text-base text-black"
                      >
                        Tiêu đề cho chỗ ở
                      </FormLabel>
                      <FormDescription className="text-sm text-gray-500">
                        Hãy đặt tiêu đề ngắn gọn, súc tích. Bạn có thể chỉnh sửa
                        nó sau, nên đừng lo lắng{" "}
                      </FormDescription>
                      <Input
                        {...field}
                        defaultValue="Tiêu đề ngắn gọn là hiệu quả nhất"
                      ></Input>
                    </FormItem>
                  )}
                ></FormField>
                <FormField
                  name="houseID.description"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        htmlFor="houseID.description"
                        className="font-semibold text-base text-black"
                      >
                        Mô tả về chổ ở
                      </FormLabel>
                      <FormDescription className="text-sm text-gray-500">
                        Hãy chia sẽ những điều tạo nên điểm đặc biệt cho nơi cho
                        thuê của bạn
                      </FormDescription>
                      <Textarea
                        rows={10}
                        placeholder="Hãy kễ cho chúng tôi một chút về đặc điểm chổ ở mà bạn cho thuê"
                        className="resize-none"
                        {...field}
                      />
                    </FormItem>
                  )}
                ></FormField>
                <FormField
                  name="houseID.costPerNight"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        htmlFor="houseID.costPerNight"
                        className="font-semibold text-base text-black"
                      >
                        Giá tiền cho thuê
                      </FormLabel>
                      <FormDescription className="text-sm text-gray-500">
                        Hãy chia sẽ những điều tạo nên điểm đặc biệt cho nơi cho
                        thuê của bạn
                      </FormDescription>
                      <div className="relative w-full">
                        <Input
                          type="number"
                          placeholder="Nhập vào giá tiền mà bạn sẽ thu"
                          className="pl-14"
                          {...field}
                        />
                        <span className="p-2 absolute top-0 translate-y-[3%] translate-x-0 rounded-tl-lg rounded-bl-lg text-white border-[1px] border-gray-500 bg-black">
                          VND
                        </span>
                      </div>
                    </FormItem>
                  )}
                ></FormField>
                <button
                  className="px-4 py-3 bg-black text-white rounded-lg mt-4"
                  type="submit"
                >
                  Cập nhật thông tin
                </button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddHousePage;
