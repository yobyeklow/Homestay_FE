"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "@/styles/HouseDetail.module.css";
import qs from "qs";
import BedCount from "./BedCount";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "../ui";
import BedRoomCount from "./BedRoomCount";
import BathRoomCount from "./BathRoomCount";
import Services from "./services/Services";
import View from "./view/View";
import Safe from "./safe/Safe";
import { useRouter } from "next/navigation";

interface IProps {
  isOpen: boolean;
  setIsOpen: any;
}
const dataArray = [
  {
    id: 1,
    text: "Bất kì",
    value: 0,
  },
  {
    id: 2,
    text: "1",
    value: 1,
  },
  {
    id: 3,
    text: "2",
    value: 2,
  },
  {
    id: 4,
    text: "3",
    value: 3,
  },
  {
    id: 5,
    text: "4",
    value: 4,
  },
  {
    id: 6,
    text: "5",
    value: 5,
  },
  {
    id: 7,
    text: "6",
    value: 6,
  },
  {
    id: 8,
    text: "7",
    value: 7,
  },
  {
    id: 9,
    text: "8",
    value: 8,
  },
];
export default function ModalFilter({ isOpen, setIsOpen }: IProps) {
  function closeModal() {
    setIsOpen(false);
  }
  const router = useRouter();
  const [count, setCount] = useState({
    bedCount: 1,
    bedRoomCount: 1,
    bathRoomCount: 1,
  });
  const form = useForm({
    defaultValues: {
      minPrice: 200000,
      maxPrice: 10000000,
      bedCount: 0,
      bedRoomCount: 0,
      bathRoomCount: 0,
      services: [],
      safe: [],
      view: [],
    },
  });
  const [activeButtons, setActiveButtons] = useState(
    dataArray.map((item, index) => {
      if (index == 0) return true;
      return false;
    })
  );

  const onSubmit = (values: any) => {
    const facilitiesValue = [];
    if (values.services.length !== 0) {
      facilitiesValue.push({
        name: "devices",
      });
    }
    if (values.safe.length !== 0) {
      facilitiesValue.push({
        name: "safe",
      });
    }
    if (values.view.length !== 0) {
      facilitiesValue.push({
        name: "view",
      });
    }
    // const queryParams = qs.stringify(facilitiesValue);
    // console.log(queryParams);

    const data = {
      bedCount: count.bedCount,
      countBathRoom: count.bathRoomCount,
      countBedRoom: count.bedRoomCount,
      minPrice: values.minPrice,
      maxPrice: values.maxPrice,
      facilities: qs.stringify(facilitiesValue),
    };
    // console.log(data);
    router.push(
      `/searchFilter?bedCount=${data.bedCount}&countBedRoom=${data.countBedRoom}&countBathRoom=${data.countBathRoom}&facilities=${data.facilities}&minPrice=${data.minPrice}&maxPrice=${data.maxPrice}`
    );
  };
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-[780px] transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all relative">
                  <div className="w-full border-b-[1px] border-b-gray-300">
                    <div className="flex items-center justify-between  p-6">
                      <span
                        onClick={() => setIsOpen(false)}
                        className="text-base font-normal px-3 py-1 -my-1 -ml-3 hover:bg-gray-100 rounded-full cursor-pointer"
                      >
                        X
                      </span>
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        Bộ lọc
                      </Dialog.Title>
                      <div></div>
                    </div>
                  </div>
                  <div
                    className={`w-full max-h-[740px] h-full overflow-y-scroll ${styles.scrollStyle}`}
                  >
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-full space-y-3"
                      >
                        <div className="px-6 py-8 w-full border-b-[1px] border-b-gray-300">
                          <h2 className="text-[22px] font-bold pb-2">
                            Khoảng giá
                          </h2>
                          <p className="text-sm font-normal text-[#222222] pb-4">
                            Giá theo đêm chưa bao gồm phí và thuế
                          </p>
                          <div className="grid grid-cols-2 gap-10">
                            <FormField
                              control={form.control}
                              name="minPrice"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-sm font-medium text-[#22222]">
                                    Tối thiểu (VND)
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      className="w-full relative"
                                      type="number"
                                      defaultValue={field.value}
                                      {...field}
                                    />
                                  </FormControl>

                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="maxPrice"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-sm font-medium text-[#22222]">
                                    Tối đa (VND)
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      defaultValue={field.value}
                                      {...field}
                                    />
                                  </FormControl>

                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                        <div className="px-6 py-8 w-full border-b-[1px] border-b-gray-300">
                          <h2 className="text-[22px] font-bold pb-6">
                            Phòng và phòng ngủ
                          </h2>
                          <div className="flex flex-col gap-y-4">
                            <BedCount
                              count={count}
                              setCount={setCount}
                              dataArray={dataArray}
                            ></BedCount>
                            <BedRoomCount
                              count={count}
                              setCount={setCount}
                              dataArray={dataArray}
                            ></BedRoomCount>
                            <BathRoomCount
                              count={count}
                              setCount={setCount}
                              dataArray={dataArray}
                            ></BathRoomCount>
                          </div>
                        </div>
                        <div className="px-6 py-8 w-full">
                          <h2 className="text-[22px] font-bold pb-6">
                            Tiện nghi
                          </h2>
                          <div className="flex flex-col gap-y-10">
                            <Services form={form}></Services>
                            <View form={form}></View>
                            <Safe form={form}></Safe>
                          </div>
                        </div>
                        <div className="w-full flex justify-end px-6 py-4 border-[1px] fixed z-10 bottom-0 bg-white">
                          <Button
                            type="submit"
                            className="text-white font-bold py-[14px] px-6"
                          >
                            Lọc kết quả
                          </Button>
                        </div>
                        <div className="h-[75px]"></div>
                      </form>
                    </Form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
