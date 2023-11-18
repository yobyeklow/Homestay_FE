import {
  Checkbox,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui";
import React from "react";
const items = [
  {
    id: "Wi-fi",
    label: "Wifi",
  },
  {
    id: "TV",
    label: "Tivi",
  },
  {
    id: "Bếp",
    label: "Bếp",
  },
  {
    id: "Điều hoà nhiệt độ",
    label: "Điều hoà nhiệt độ",
  },
] as const;
const Services = ({ form }: any) => {
  return (
    <FormField
      control={form.control}
      name="services"
      render={() => (
        <FormItem>
          <div className="mb-4">
            <FormLabel className="text-base font-bold text-[#222222] pb-6">
              Đồ dùng thiết yếu
            </FormLabel>
          </div>
          <div className="grid grid-cols-2 gap-5">
            {items.map((item) => (
              <FormField
                key={item.id}
                control={form.control}
                name="services"
                render={({ field }) => {
                  return (
                    <FormItem
                      key={item.id}
                      className="flex flex-row items-start space-x-4 space-y-0"
                    >
                      <FormControl>
                        <Checkbox
                          className="w-6 h-6"
                          checked={field.value?.includes(item.id)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, item.id])
                              : field.onChange(
                                  field.value?.filter(
                                    (value: any) => value !== item.id
                                  )
                                );
                          }}
                        />
                      </FormControl>
                      <FormLabel className="text-base font-normal">
                        {item.label}
                      </FormLabel>
                    </FormItem>
                  );
                }}
              />
            ))}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default Services;
