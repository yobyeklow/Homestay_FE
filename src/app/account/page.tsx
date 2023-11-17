"use client";
import Topbar from "@/components/layout/Topbar";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

import { usePathname } from "next/navigation";
import styles from "@/styles/Topbar.module.css";
import Image from "next/image";
import { IconCamera } from "@/components/icons";
import { useForm } from "react-hook-form";
import imageUpload from "@/components/imagePreview/imageUpload";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/components/ui/index";
import useDisplayImage from "@/components/imagePreview/useDisplayImage";
import { ICustomer } from "@/types/user.type";
import { useMutation, useQuery } from "react-query";
import PreviewImage from "@/components/imagePreview/useDisplayImage";
import { getUserInfo, updateUserInfo } from "@/apis/account.apis";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type LinkProps = {
  children: any;
  href: string;
};

const AccountPage = () => {
  const userID = localStorage.getItem("customerID");
  const inputRef = useRef(null);
  const [images, setImages] = useState<any>(null);
  const [imagesData, setImagesData] = useState("");
  const [updateInfo, setUpdateInfo] = useState(false);
  const submitInput = useRef(null);

  const {
    data: userData,
    isLoading,
    isError,
  } = useQuery(
    ["userInfo"],
    async () => {
      const response = await getUserInfo(userID);
      return response;
    },
    {
      cacheTime: 10 * 60 * 1000,
      staleTime: 5 * 60 * 1000,
      retry: 1,
    }
  );
  const schema = yup.object({
    name: yup
      .string()
      .required("Vui lòng nhập tên")
      .trim()
      .matches(
        /^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*(?:[ ][A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*)*$/,
        "Vui lòng nhập tên đúng"
      ),
    password: yup
      .string()
      .required("Vui lòng nhập mật khẩu")
      .matches(
        /^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/,
        "Mật khẩu nên có ít nhất 10 kí tự, 1 chữ hoa, 1 chữ thường và 1 số"
      )
      .trim(),
    email: yup
      .string()
      .required("Vui lòng nhập email")
      .email("Email không đúng định dạng"),
    phoneNumber: yup
      .string()
      .required("Vui long điền số điện thoại")
      .trim()
      .matches(
        /^(0[23456789]|01[2689]|08)[0-9]{8}$/,
        "Số điện thoại không đúng định dạng"
      ),
    photo: yup.string(),
  });
  const form = useForm<yup.InferType<typeof schema>>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: userData?.name,
      photo: userData?.photo as string,
      password: userData?.password,
      email: userData?.email,
      phoneNumber: userData?.phoneNumber,
    },
  });

  const { mutate } = useMutation(
    ({ userID, data }: { userID: string; data: ICustomer }) =>
      updateUserInfo(userID, data),
    {
      onSuccess(announce: any) {
        setUpdateInfo(false);
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
      },
      onError(err: any) {
        console.log(err);
      },
    }
  );
  const onSubmit = async (data: any) => {
    if (images) {
      const imgURL = await imageUpload([images]);
      mutate({
        userID: userID as string,
        data: {
          name: data.name,
          password: data.password,
          email: data.email,
          phoneNumber: data.phoneNumber,
          photo: imgURL[0].url,
        },
      });
    } else {
      mutate({
        userID: userID as string,
        data: {
          name: data.name,
          password: data.password,
          email: data.email,
          phoneNumber: data.phoneNumber,
        },
      });
    }
  };

  useEffect(() => {
    return () => {
      imagesData && URL.revokeObjectURL(imagesData);
    };
  }, [imagesData]);
  return (
    <main className="accountPage">
      <Topbar>
        <div className={`flex[0,_1,_auto] flex`}>
          <ul className={`${styles.navLinkList}`}>
            <ActiveLink href="/account">Tài khoản</ActiveLink>
            <ActiveLink href="/trips">Chuyến đi</ActiveLink>
            <ActiveLink href="/transaction">Thanh toán</ActiveLink>
          </ul>
        </div>
      </Topbar>
      {isLoading && <Skeleton></Skeleton>}
      {isError && <>{isError}</>}
      {!isLoading && userData && (
        <div className="content py-16 px-20">
          <div className="content-wrapper md:max-w-[1162px] w-full mx-auto">
            <div className="flex gap-x-[80px]">
              <div className="image relative w-[382px]">
                <div className="bg-white shadow-[0_6px_20px_rgba(0,0,0,0.2)] py-8 px-6 rounded-[24px] border-[1px] border--[#000000]">
                  <div className="flex flex-col items-center justify-center gap-y-5">
                    <div className="accountImage">
                      {!updateInfo ? (
                        <div className="relative w-full h-ful">
                          <Image
                            unoptimized
                            src={`${userData?.photo}` || `/defaultAvatar.jpg`}
                            alt="avatar.jpg"
                            width={104}
                            height={104}
                            className="rounded-full w-[104px] h-[104px] object-cover relative"
                          ></Image>
                        </div>
                      ) : (
                        <div className="relative w-[104px] max-h-[104px] h-full">
                          <Image
                            unoptimized
                            src={
                              `${imagesData}` ||
                              userData?.photo ||
                              `/defaultAvatar.jpg`
                            }
                            alt="avatar.jpg"
                            width={104}
                            height={104}
                            sizes="(min-width: 808px) 50vw, 100vw"
                            className="rounded-full w-[104px] h-[104px] object-cover"
                          ></Image>
                          <button
                            onClick={() => inputRef?.current.click()}
                            className="changeAvatarBtn absolute flex items-center bg-white border-[1px] border-[#DDDDDD] rounded-xl text-xs p-2 -bottom-[12%] left-[50%] -translate-x-[50%] shadow-[0px_6px_16px_rgba(0, 0, 0, 0.12)]"
                          >
                            <IconCamera className="w-[14px] h-[14px]"></IconCamera>
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="text-center">
                      <h2 className="font-bold text-2xl capitalize">{`${userData?.name.toLowerCase()}`}</h2>
                      <p className="text-[#222222]">Khách</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="accountInfo w-full flex-1">
                <div className="flex items-center justify-between w-full">
                  <h2 className="title text-3xl font-bold">
                    Thông tin cá nhân
                  </h2>
                  <div>
                    {!updateInfo ? (
                      <button
                        onClick={() => setUpdateInfo(true)}
                        className="py-3 px-3 font-semibold bg-white shadow-[0_6px_20px_rgba(0,0,0,0.2)] rounded-[24px] max-w-[130px] w-full"
                      >
                        <span>Chỉnh sửa hồ sơ</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          submitInput?.current?.click();
                        }}
                        className="py-3 px-3 font-semibold bg-white shadow-[0_6px_20px_rgba(0,0,0,0.2)] rounded-[24px] max-w-[130px] w-full"
                      >
                        <span>Lưu hồ sơ</span>
                      </button>
                    )}
                  </div>
                </div>
                {!updateInfo ? (
                  <div className="mt-[40px] text-base">
                    <div className="infoRow mb-6">
                      <div className=" mb-4">
                        <p>Họ và tên</p>
                        <p className="text-[#717171] capitalize mt-2">
                          {userData?.name.toLowerCase()}
                        </p>
                      </div>
                      <div className="h-[1px] bg-[#dddddd]"></div>
                    </div>
                    <div className="infoRow mb-6">
                      <div className=" mb-4">
                        <p>Email</p>
                        <p className="text-[#717171] mt-2">{userData?.email}</p>
                      </div>
                      <div className="h-[1px] bg-[#dddddd]"></div>
                    </div>
                    <div className="infoRow mb-6">
                      <div className=" mb-4">
                        <p>Số điện thoại</p>
                        <p className="text-[#717171] mt-2">
                          {userData?.phoneNumber}
                        </p>
                        <p className="text-[#717171] text-sm">
                          Số điện thoại liên hệ (để xác nhận việc đặt phòng).
                        </p>
                      </div>
                      <div className="h-[1px] bg-[#dddddd]"></div>
                    </div>
                    <div className="infoRow mb-6">
                      <div className=" mb-4">
                        <p>Mật khẩu</p>
                        <p className="text-[#717171] mt-2">********</p>
                      </div>
                      <div className="h-[1px] bg-[#dddddd]"></div>
                    </div>
                    {/* <div className="infoRow">
                    <div className=" mb-6">
                      <p>Ngôn ngữ</p>
                      <p className="text-[#717171]">Tiếng Việt</p>
                    </div>
                    <div className="h-[1px] bg-[#dddddd]"></div>
                  </div> */}
                  </div>
                ) : (
                  <div className="mt-[40px] text-base">
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        // className="space-y-8"
                      >
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem className="mb-4">
                              <FormLabel>Họ và tên</FormLabel>
                              <FormDescription>
                                Đây là họ và tên trên giấy tờ tuỳ thân của bạn.
                              </FormDescription>

                              <FormControl>
                                <Input
                                  {...field}
                                  value={field?.value}
                                  onChange={(e) => {
                                    form.setValue("name", e.target.value);
                                  }}
                                  className="placeholder:text-black capitalize"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem className="mb-4">
                              <FormLabel>Email</FormLabel>
                              <FormDescription>
                                Hãy sử dụng email mà bạn có thể sử dụng để nhận
                                thông báo xác nhận.
                              </FormDescription>
                              <FormControl>
                                <Input
                                  {...field}
                                  value={field?.value}
                                  onChange={(e) => {
                                    form.setValue("email", e.target.value);
                                  }}
                                  type="email"
                                  className="placeholder:text-black"
                                />
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phoneNumber"
                          render={({ field }) => (
                            <FormItem className="mb-4">
                              <FormLabel>Số điện thoại</FormLabel>
                              <FormDescription>
                                Hãy sử dụng số điện thoại mà bạn có thể nghe/gọi
                                để xác nhận thông tin.
                              </FormDescription>
                              <FormControl>
                                <Input
                                  {...field}
                                  value={field?.value}
                                  onChange={(e) => {
                                    form.setValue(
                                      "phoneNumber",
                                      e.target.value
                                    );
                                  }}
                                  className="placeholder:text-black"
                                />
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem className="mb-4">
                              <FormLabel>Mật khẩu</FormLabel>
                              <FormDescription>
                                Đặt mật khẩu truy cập
                              </FormDescription>
                              <FormControl>
                                <Input
                                  {...field}
                                  value={field?.value}
                                  onChange={(e) => {
                                    form.setValue("password", e.target.value);
                                  }}
                                  type="password"
                                  className="placeholder:text-black"
                                />
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="photo"
                          render={({ field }) => (
                            <FormItem className="mb-4">
                              <FormControl>
                                <Input
                                  {...field}
                                  type="file"
                                  ref={inputRef}
                                  className="relative hidden"
                                  onChange={(e: any) => {
                                    const images = PreviewImage(e);
                                    setImagesData(images[0]);
                                    setImages(e.target.files[0]);
                                  }}
                                  accept="image/png, image/jpeg, image/jpg, image/webp"
                                ></Input>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <button className="hidden" ref={submitInput}></button>
                      </form>
                    </Form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}{" "}
    </main>
  );
};
export const ActiveLink = ({ children, href }: LinkProps) => {
  const pathname = usePathname();
  const style = {
    color: pathname === href ? "black" : "",
  };
  return (
    <>
      {pathname == href ? (
        <li className="text-black">
          <Link href={href}>{children}</Link>
        </li>
      ) : (
        <li>
          <Link href={href}>{children}</Link>
        </li>
      )}
    </>
  );
};
export default AccountPage;
