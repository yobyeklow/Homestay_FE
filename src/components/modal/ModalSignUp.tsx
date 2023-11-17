import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { signUpUser } from "@/apis/auth.apis";
import { toast } from "react-toastify";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Calendar,
  Select,
  DropdownMenu,
  Button,
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/";
import { useMutation } from "react-query";
import { ICustomer } from "@/types/user.type";
import { IconCalendar } from "../icons";

type TModalSign = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};
type Inputs = {
  email: string;
  phoneNumber: string;
  password: string;
  name: string;
};
const ModalSignUp = ({ isOpen, setIsOpen }: TModalSign) => {
  const [isContinue, setIsContinue] = useState(false);
  const { mutate } = useMutation(
    (userData: ICustomer) => signUpUser(userData),
    {
      onSuccess(data) {
        toast.success("Đăng ký tài khoản thành công!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setIsOpen(false);
      },
      onError(err: any) {
        console.log(err);
      },
    }
  );
  const form = useForm<ICustomer>({
    defaultValues: {
      email: "",
      phoneNumber: "",
      password: "",
      name: "",
      gender: "",
      birthDay: new Date(Date.now()),
    },
  });

  const onSubmit = (data: any) => {
    mutate(data);
  };

  function closeModal() {
    setIsOpen(false);
    setIsContinue(false);
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
                  Đăng ký tài khoản
                </Dialog.Title>
                <div className="mt-3 mb-3">
                  <p className="text-sm text-gray-500 text-center">
                    Điền đầy đủ thông tin để tiến hành đăng ký
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
                    {!isContinue && (
                      <>
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem className="mb-4">
                              <FormLabel>
                                Emai: <span className="text-red-500">*</span>
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
                                Mập khẩu:{" "}
                                <span className="text-red-500">*</span>
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
                        <FormField
                          control={form.control}
                          name="phoneNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                Số điện thoại:{" "}
                                <span className="text-red-500">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Nhập số điện thoại"
                                  {...field}
                                  className="h-[50px] border-[1px] rounded-[5px] border-[#cccccc] placeholder:text-[#ddd] placeholder:font-semibold font-medium"
                                />
                              </FormControl>
                              <FormMessage></FormMessage>
                            </FormItem>
                          )}
                        />
                        <div className="w-full text-center my-2 ">
                          <button
                            type="button"
                            onClick={() => setIsContinue(true)}
                            className="mt-6 py-[14px] px-6 bg-gradient-to-r from-[#76b852]  to-[#8DC26F] text-white font-semibold rounded-[5px] max-w-[150px] w-full text-[15px]"
                          >
                            Tiếp tục
                          </button>
                        </div>
                      </>
                    )}
                    {isContinue && (
                      <>
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                Tên: <span className="text-red-500">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Nhập họ và tên"
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
                          name="birthDay"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex flex-col gap-y-3 mt-4">
                                <FormLabel>
                                  Ngày sinh:{" "}
                                  <span className="text-red-500">*</span>
                                </FormLabel>
                                <FormControl>
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <Button
                                        variant={"outline"}
                                        className={cn(
                                          "w-[280px] h-[46px] justify-start text-left font-normal relative border-1-[#71717a] rounded-[5px]",
                                          !field.value &&
                                            "text-muted-foreground"
                                        )}
                                      >
                                        <IconCalendar className="w-4 h-4 text-[#18181b] opacity-30 absolute right-5"></IconCalendar>
                                        {field.value ? (
                                          format(field.value, "PPP")
                                        ) : (
                                          <span className="text-[#71717a]">
                                            Ngày sinh
                                          </span>
                                        )}
                                      </Button>
                                    </PopoverTrigger>
                                    <PopoverContent
                                      className="w-auto p-0 bg-white"
                                      align="start"
                                    >
                                      <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                          date > new Date() ||
                                          date < new Date("1900-01-01")
                                        }
                                        initialFocus
                                      />
                                    </PopoverContent>
                                  </Popover>
                                </FormControl>
                              </div>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="gender"
                          render={({ field }) => (
                            <FormItem className="mt-4 flex flex-col gap-y-2">
                              <FormLabel>
                                Giới tính:
                                <span className="text-red-500">*</span>
                              </FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="w-[280px] h-[46px]">
                                    <SelectValue placeholder="Giới tính" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="Nam">Nam</SelectItem>
                                  <SelectItem value="Nữ">Nữ</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormItem>
                          )}
                        />
                        <div className="w-full text-center my-2 ">
                          <button
                            type="submit"
                            onClick={() => setIsContinue(true)}
                            className="mt-6 py-[14px] px-6 bg-gradient-to-r from-[#76b852]  to-[#8DC26F] text-white font-semibold rounded-[5px] max-w-[150px] w-full text-[15px]"
                          >
                            Đăng ký
                          </button>
                        </div>
                      </>
                    )}
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

export default ModalSignUp;
