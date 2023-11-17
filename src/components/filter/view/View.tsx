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
    id: "hướng nhìn ra núi",
    label: "Hướng nhìn ra núi",
  },
  {
    id: "hướng nhìn ra biển",
    label: "Hướng nhìn ra biển",
  },
] as const;
const View = ({ form }: any) => {
  return (
    <FormField
      control={form.control}
      name="view"
      render={() => (
        <FormItem>
          <div className="mb-4">
            <FormLabel className="text-base font-bold text-[#222222] pb-6">
              Hướng nhìn quang cảnh
            </FormLabel>
          </div>
          <div className="grid grid-cols-2 gap-5">
            {items.map((item) => (
              <FormField
                key={item.id}
                control={form.control}
                name="view"
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

export default View;
