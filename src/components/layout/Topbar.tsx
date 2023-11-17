"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { IconMenu } from "../icons";
import useClickOutside from "../../hooks/useClickOutside";
import styles from "@/styles/Topbar.module.css";
import { SignIn, SignUp } from "../modal/";

const Topbar = ({ children, token, className }: any) => {
  const { show, setShow, nodeRef } = useClickOutside();
  const customerID = localStorage.getItem("customerID");
  const [openSignIn, setOpenSignin] = useState(false);
  const [openSignUp, setOpenSignup] = useState(false);
  const handleLogOut = () => {
    localStorage.removeItem("customerID");
    setShow(false);
  };
  return (
    <div>
      <div className=" w-full  border-0 border-b-[1px] border-b-[#dddddd]">
        <div
          className={`py-5 ${
            styles.topBar
          } topBar  flex justify-between items-center ${
            className ? className : "mx-auto max-w-[1760px]"
          }`}
        >
          <div className="flex-[1_0_140px]">
            {/* <Image src="#" alt="logoMain.png"></Image> */}
            <Link href="/">
              <h1 className="text-xl font-bold text-primaryBtn inline-block">
                BHomestay
              </h1>
            </Link>
          </div>
          {children}
          <div className="flex flex-[1_0_140px]">
            <div className="flex items-center gap-x-5 justify-end w-full">
              <Link
                href="/hosting"
                className="font-medium text-[rgb(34,_34,_34] text-sm hover:bg-[#dddddd] hover:bg-opacity-30 hover:rounded-[40px] hover:py-2 px-3"
              >
                Cho thuê chổ ở
              </Link>
              <div ref={nodeRef} className="relative">
                <div
                  onClick={() => setShow(!show)}
                  className=" cursor-pointer flex items-center gap-x-3 border-[1px] border-[#dddddd] rounded-[40px] px-[10px] py-[6px] shadow-[0_1px_2px_rgba(0,0,0,0.08),_0_4px_12px_rgba(0,0,0,0.05);]"
                >
                  <IconMenu className="w-[16px] h-[16px]"></IconMenu>
                  <Image
                    src="/defaultAvatar.jpg"
                    alt="avatarUser.jpg"
                    width={30}
                    height={30}
                    className="rounded-full"
                  ></Image>
                </div>
                {show && !customerID && (
                  <div className="z-10 absolute rounded-xl translate-y-3 top-[100%] right-0 shadow-[0_2px_16px_rgba(0,0,0,0.12)]">
                    <div
                      className={`${styles.dropDownSign} py-2 bg-[#ffffff] min-w-[250px] rounded-xl`}
                    >
                      <p
                        onClick={() => {
                          setOpenSignup(true);
                          setShow(false);
                        }}
                      >
                        Đăng ký
                      </p>
                      <p
                        onClick={() => {
                          setOpenSignin(true);
                          setShow(false);
                        }}
                      >
                        Đăng nhập
                      </p>
                    </div>
                  </div>
                )}
                {show && customerID && (
                  <div className="z-10 absolute rounded-xl translate-y-3 top-[100%] right-0 shadow-[0_2px_16px_rgba(0,0,0,0.12)]">
                    <div
                      className={`${styles.dropDownSign} py-2 bg-[#ffffff] min-w-[250px] rounded-xl`}
                    >
                      <Link href="/account">
                        <p>Tài khoản</p>
                      </Link>
                      <Link href="/host">
                        <p>Cho thuê chổ ở</p>
                      </Link>
                      <div className={styles.lineBreak}></div>
                      <Link href="/trips">
                        <p>Danh sách chuyến đi</p>
                      </Link>
                      <Link href="/wishlist">
                        <p>Danh sách yêu thích</p>
                      </Link>
                      <div className={styles.lineBreak}></div>
                      <p onClick={() => handleLogOut()} className="font-normal">
                        Đăng xuất
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <SignUp isOpen={openSignUp} setIsOpen={setOpenSignup}></SignUp>
      <SignIn isOpen={openSignIn} setIsOpen={setOpenSignin}></SignIn>
    </div>
  );
};

export default Topbar;
export function getServerSideProps({ req, res }: any) {
  return {
    props: {
      token: req.cookies.token || "",
    },
  };
}
