import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TModalSign } from "./modal.types";
import { useMutation } from "react-query";
import { loginUserFn } from "@/apis/auth.apis";
import { ICustomer } from "@/types/user.type";
import { toast } from "react-toastify";
type UserInput = {
  email: string;
  password: string;
};
import * as yup from "yup";
const ModalSignIn = ({ isOpen, setIsOpen }: TModalSign) => {
  const [errorLogin, setError] = useState("");
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const schema = yup.object({});
  const { mutate } = useMutation(
    (userData: UserInput) => loginUserFn(userData),
    {
      onSuccess(data: ICustomer) {
        if (typeof window !== "undefined") {
          localStorage.setItem("customerID", data?._id as string);
        }
        setIsOpen(false);
        toast("Đăng nhập thành công", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      },
      onError(err: any) {
        setError(err.response.data);
      },
    }
  );
  const onSubmit = async (values: any) => {
    mutate(values);
  };

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-20" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
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
                  as="h2"
                  className="text-xl font-medium leading-6 text-gray-900 text-center"
                >
                  Đăng nhập tài khoản
                </Dialog.Title>
                <div className="mt-3 mb-3">
                  <p className="text-sm text-gray-500 text-center">
                    Chào mừng bạn đến với BookingHomestay
                  </p>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-500 text-center"></p>
                </div>

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    // className="space-y-8"
                  >
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="mb-4">
                          <FormLabel>
                            Emai:{" "}
                            <span className="text-red-500">
                              * {`${errorLogin}`}
                            </span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="shadcn"
                              {...field}
                              className="h-[50px] border-[1px] rounded-[5px] border-[#cccccc] placeholder:text-[#ddd] placeholder:font-semibold font-medium"
                            />
                          </FormControl>
                          <FormMessage></FormMessage>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem className="mb-4">
                          <FormLabel>
                            Mập khẩu: <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Nhập mật khẩu"
                              {...field}
                              className="h-[50px] border-[1px] rounded-[5px] border-[#cccccc] placeholder:text-[#ddd] placeholder:font-semibold font-medium"
                            />
                          </FormControl>
                          <FormMessage></FormMessage>
                        </FormItem>
                      )}
                    />

                    <div className="w-full text-center mb-2 ">
                      <button
                        type="submit"
                        className="mt-6 py-[14px] px-6 bg-gradient-to-r from-[#76b852]  to-[#8DC26F] text-white font-semibold rounded-[5px] max-w-[150px] w-full text-[15px]"
                      >
                        Đăng nhập
                      </button>
                    </div>
                  </form>
                </Form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ModalSignIn;
