"use client";

import {
  LinkAuthenticationElement,
  PaymentElement,
} from "@stripe/react-stripe-js";

import React, { useState } from "react";

const PaymentMethod = () => {
  const [email, setEmail] = useState("");
  const paymentElementOptions = {
    layout: "tabs",
    fields: {
      billingDetails: {
        email: "never",
      },
    },
  };
  return (
    // <Card>
    //   <CardHeader>
    //     <CardTitle>Phương thức thanh toán</CardTitle>
    //     <CardDescription>Điền thông tin thẻ thanh toán của bạn</CardDescription>
    //   </CardHeader>
    //   <CardContent className="grid gap-6">
    //     <RadioGroup defaultValue="card" className="grid grid-cols-3 gap-4">
    //       <div>
    //         <RadioGroupItem value="card" id="card" className="peer sr-only" />
    //         <Label
    //           htmlFor="card"
    //           className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
    //         >
    //           <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             viewBox="0 0 24 24"
    //             fill="none"
    //             stroke="currentColor"
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //             strokeWidth="2"
    //             className="mb-3 h-6 w-6"
    //           >
    //             <rect width="20" height="14" x="2" y="5" rx="2" />
    //             <path d="M2 10h20" />
    //           </svg>
    //           Card
    //         </Label>
    //       </div>
    //     </RadioGroup>
    //     <div className="grid gap-2">
    //       <Label htmlFor="name">Tên chủ thẻ</Label>
    //       <Input id="name" placeholder="NGUYEN VAN A" />
    //     </div>
    //     <div className="grid gap-2">
    //       <Label htmlFor="number">Số thẻ</Label>
    //       <Input id="number" placeholder="" />
    //     </div>
    //     <div className="grid grid-cols-3 gap-4">
    //       <div className="grid gap-2">
    //         <Label htmlFor="month">Tháng hết hạn</Label>
    //         <Select>
    //           <SelectTrigger id="month">
    //             <SelectValue placeholder="Month" />
    //           </SelectTrigger>
    //           <SelectContent>
    //             <SelectItem value="1">Tháng 1</SelectItem>
    //             <SelectItem value="2">Tháng 2</SelectItem>
    //             <SelectItem value="3">Tháng 3</SelectItem>
    //             <SelectItem value="4">Tháng 4</SelectItem>
    //             <SelectItem value="5">Tháng 5</SelectItem>
    //             <SelectItem value="6">Tháng 6</SelectItem>
    //             <SelectItem value="7">Tháng 7</SelectItem>
    //             <SelectItem value="8">Tháng 8</SelectItem>
    //             <SelectItem value="9">Tháng 9</SelectItem>
    //             <SelectItem value="10">Tháng 10</SelectItem>
    //             <SelectItem value="11">Tháng 11</SelectItem>
    //             <SelectItem value="12">Tháng 12</SelectItem>
    //           </SelectContent>
    //         </Select>
    //       </div>
    //       <div className="grid gap-2">
    //         <Label htmlFor="year">Năm</Label>
    //         <Select>
    //           <SelectTrigger id="year">
    //             <SelectValue placeholder="Year" />
    //           </SelectTrigger>
    //           <SelectContent>
    //             {Array.from({ length: 10 }, (_, i) => (
    //               <SelectItem key={i} value={`${new Date().getFullYear() + i}`}>
    //                 {new Date().getFullYear() + i}
    //               </SelectItem>
    //             ))}
    //           </SelectContent>
    //         </Select>
    //       </div>
    //       <div className="grid gap-2">
    //         <Label htmlFor="cvc">CVC</Label>
    //         <Input id="cvc" placeholder="XXX" />
    //       </div>
    //     </div>
    //   </CardContent>
    // </Card>
    <div>
      <LinkAuthenticationElement
        id="link-authentication-element"
        onChange={(e) => setEmail}
      />
      <PaymentElement id="payment-element" options={paymentElementOptions} />
    </div>
  );
};

export default PaymentMethod;
