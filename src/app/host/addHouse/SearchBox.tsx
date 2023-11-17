import { IconCheck, IconUpDown } from "@/components/icons";
import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  FormControl,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui";
import { cn } from "@/lib/utils";
import { Combobox, Transition } from "@headlessui/react";

import "@headlessui/react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import React, { ChangeEvent, useState } from "react";
import { useGoogleMapsScript, Libraries } from "use-google-maps-script";
import usePlacesAutocomplete, {
  getDetails,
  getGeocode,
  getLatLng,
  getZipCode,
} from "use-places-autocomplete";
interface ISearchBoxProps {
  onSelectAddress: (
    address: string,
    latitude: number | null,
    longtitude: number | null,
    city: string
  ) => void;
  defaultValue: string;
  form: any;
}
const libraries: Libraries = ["places"];
///////////////////////////////
const SearchBox = ({
  onSelectAddress,
  defaultValue,
  form,
}: ISearchBoxProps) => {
  const { isLoaded, loadError } = useGoogleMapsScript({
    googleMapsApiKey: "AIzaSyBX-fPA9UOxtiedb7MwbxSIDAZRuiuL5Dg",
    libraries,
  });

  if (!isLoaded) return null;
  if (loadError) return <div> Error Loading GEO API</div>;
  return (
    <ReadySearchBox
      onSelectAddress={onSelectAddress}
      defaultValue={defaultValue}
      form={form}
    ></ReadySearchBox>
  );
};
////////////////////////

function ReadySearchBox({
  onSelectAddress,
  defaultValue,
  form,
}: ISearchBoxProps) {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({ debounce: 500, defaultValue });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (e.target.value === "") {
      onSelectAddress("", null, null, "");
    }
  };
  const handleSelect = async (address: string) => {
    setSelectedPerson(address);
    setValue(address, false);
    clearSuggestions();
    try {
      const results = await getGeocode({ address });
      // const city = results
      const { lat, lng } = await getLatLng(results[0]);
      const city =
        results[0].address_components[results[0].address_components.length - 2]
          .short_name;

      onSelectAddress(address, lat, lng, city);
    } catch (error) {
      console.error(`Error:`, error);
    }
  };

  const valueComboBox = form.getValues("locationID.streetAddress");

  const [selectedPerson, setSelectedPerson] = useState(valueComboBox);
  const [query, setQuery] = useState("");

  return (
    <div className="relative w-full">
      <Combobox value={selectedPerson} onChange={handleSelect}>
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              id="search"
              className="w-full outline-none border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              defaultValue={valueComboBox}
              onChange={handleChange}
              autoComplete="off"
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <IconUpDown
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {status === "OK" && data.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                data.map(({ place_id, description }) => (
                  <Combobox.Option
                    key={place_id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-gray-300 text-black" : "text-gray-900"
                      }`
                    }
                    value={description}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {description}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-black" : "text-gray-900"
                            }`}
                          >
                            <IconCheck className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
export default SearchBox;
