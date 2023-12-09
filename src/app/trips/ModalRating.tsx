import { postRating } from "@/apis/rating.apis";
import { IconPoint, IconStar } from "@/components/icons";
import {
  Button,
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
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
interface IProps {
  setIsOpen: any;
  isOpen: any;
  houseID: string;
}
const ModalRating = ({ houseID, isOpen, setIsOpen }: IProps) => {
  const form = useForm({
    defaultValues: {
      description: "",
    },
  });
  const [point, setPoint] = useState<number>(0);

  const pointStar = [1, 2, 3, 4, 5];
  const { mutate } = useMutation(
    (data: any) => postRating(data.houseID, data.customerID, data.data),
    {
      onSuccess(announce: any) {
        setIsOpen(false);
        toast(announce?.msg, {
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
        toast.warn(err.msg || "Bạn đã đánh giá rồi!", {
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
    }
  );
  const onSubmit = (values: any) => {
    const customerID = localStorage.getItem("customerID");

    const data = {
      ratingPoint: point,
      ratingDescription: values.description,
    };
    console.log(data);
    mutate({
      houseID,
      customerID,
      data,
    });
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(false)}
        >
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
                    Đánh giá chổ ở
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Hãy cho chúng tôi biết cảm nhận của bạn về chổ ở mà bạn đã
                      thuê.
                    </p>
                  </div>

                  <div className="mt-4">
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                      >
                        <div className="flex items-center">
                          <div className="mr-2">Số sao:</div>
                          <div>
                            <div className="flex items-center gap-x-1">
                              {pointStar.map((item, index) => {
                                return (
                                  <IconPoint
                                    onClick={() => setPoint(item)}
                                    key={index + "a"}
                                    className={`${
                                      point >= item
                                        ? "fill-[#FFF700] stroke-[#FFF700]"
                                        : " stroke-black"
                                    } cursor-pointer w-4 h-4 `}
                                  ></IconPoint>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                        <FormField
                          name="description"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="mr-2">Nhận xét:</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Hãy để lại một vài nhận xét, cám ơn bạn rất nhiều!!"
                                  className="resize-none"
                                  {...field}
                                />
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button onClick={() => setIsOpen(false)} type="submit">
                          Gửi
                        </Button>
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
};

export default ModalRating;
