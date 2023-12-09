"use client";
import React, { useEffect, useState } from "react";
import "@/styles/Host.css";
import Image from "next/image";
import { useMutation } from "react-query";
import { becomeHost } from "@/apis/host.apis";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useLocalState } from "@/utils/useLocalState";

const CreateHostPage = () => {
  const customerID = localStorage.getItem("customerID");
  const router = useRouter();
  if (!customerID) {
    toast.error("Bạn chưa đăng nhập", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    router.push("http://localhost:3000");
  }

  const { mutate } = useMutation((id: string) => becomeHost(id), {
    onSuccess(data: any) {
      router.push("http://localhost:3000/host/addHouse/");
    },
    onError(err: any) {
      toast.error(err?.data?.msg, {
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
  });
  const handleSubmit = () => {
    mutate(customerID as string);
  };
  return (
    <div className="registerHostPage w-full min-h-screen h-full">
      <div className="background flex justify-center items-center">
        <div className="content text-[38px] font-bold flex justify-center items-center flex-col gap-y-4 leading-[50px] max-w-[1024px] w-full">
          <h1 className="text-[42px] font-bold text-white text-center">
            Hãy tham gia BHomestay, việc cho thuê sẽ trở nên đơn giản hơn bao
            giờ hết
          </h1>
          <button
            onClick={handleSubmit}
            className="font-bold py-4 hover:shadow-inner hover:shadow-[#2980B9] shadow-md px-8 text-xl text-white bg-blue-400 rounded-xl mt-10 text-center"
          >
            Đăng ký cho thuê
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateHostPage;
