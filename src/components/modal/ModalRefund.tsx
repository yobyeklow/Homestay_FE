import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Textarea,
} from "../ui";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "react-query";
import { cancelBooking } from "@/apis/booking.apis";
import { toast } from "react-toastify";
interface IProps {
  isOpen: boolean;
  setIsOpen: any;
  bookingData: any;
}
interface IReasonProps {
  bookingID: string | null;
  paymentID: string | null;
  reasonData: string | null;
}

export default function ModalRefund({
  isOpen,
  setIsOpen,
  bookingData,
}: IProps) {
  function closeModal() {
    setIsOpen(false);
  }
  const { mutate } = useMutation(
    ({ bookingID, paymentID, reasonData }: IReasonProps) =>
      cancelBooking(bookingID, paymentID, reasonData),
    {
      onSuccess(data: any) {
        setIsOpen(false);
        toast(data?.msg, {
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
        err.log(err.response.data);
      },
    }
  );
  const handleSubmit = (values: any) => {
    console.log(values);
    mutate({
      bookingID: bookingData._id,
      paymentID: bookingData.paymentID._id,
      reasonData: values.refundReason,
    });
  };
  const schema = yup.object({
    refundReason: yup
      .string()
      .required("Vui lòng điền lí do vào ô!")
      .max(256, "Nhập tối đa là 256 kí tự")
      .min(20, "Nhập tối thiểu 20 kí tự"),
  });
  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      refundReason: "",
    },
  });

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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Hãy cho chúng tôi biết lí do, bạn muốn hoàn tiền?
                  </Dialog.Title>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(handleSubmit)}
                      className="w-full mt-3 space-y-6"
                    >
                      <FormField
                        control={form.control}
                        name="refundReason"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Textarea
                                className="resize-none w-full"
                                {...field}
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit">Hoàn tiền</Button>
                    </form>
                  </Form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
