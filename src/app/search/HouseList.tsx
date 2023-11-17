"use client";
import HomeStayItem from "@/components/homestay/HomeStayItem";
import { IconSearch, IconUser } from "@/components/icons";
import Topbar from "@/components/layout/Topbar";
import MapButton from "@/components/map/MapButton";
import styles from "@/styles/Home.module.css";
import GoogleMapView from "@/components/map/GoogleMapView";
import { useState } from "react";
import { useQuery } from "react-query";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";
import "@/styles/dateRange.css";
import { filterHouseByInput } from "@/apis/filter.apis";
import { useSearchParams } from "next/navigation";
import { formatISO } from "date-fns";
import axios from "@/utils/axios";
import { useLocalState } from "@/utils/useLocalState";
type BoundsArray = [[number, number], [number, number]];
const parseBounds = (boundsString: string) => {
  const bounds = JSON.parse(boundsString) as BoundsArray;
  return {
    sw: {
      latitude: bounds[0][1],
      longtitude: bounds[0][0],
    },
    ne: {
      latitude: bounds[1][1],
      longtitude: bounds[1][0],
    },
  };
};
export default function SearchPage() {
  const [showMap, setShowMap] = useState(false);
  const searchParams = useSearchParams();

  const [filter, setFilter] = useState({
    startDate: new Date(searchParams.get("checkInDate") as string),
    endDate: new Date(searchParams.get("checkOutDate") as string),
    numberOfGuests: parseInt(searchParams.get("numberOfGuests") as string) || 1,
    searchInput: searchParams.get("city"),
    page: 1,
    limit: 20,
    isEnabled: searchParams.get("isEnabled") || false,
  });
  console.log(filter);
  const selectionRanges = {
    startDate: filter.startDate || new Date(Date.now()),
    endDate: filter.endDate || new Date(),
    key: "Selection",
  };
  const handleSelectDate = (ranges: any) => {
    setFilter({
      ...filter,
      startDate: ranges.Selection.startDate,
      endDate: ranges.Selection.endDate,
    });
  };
  const resetInput = () => {
    setFilter({
      ...filter,
      searchInput: "",
    });
  };
  const HandleFilter = () => {
    refetch();
    setFilter({
      ...filter,
      searchInput: "",
    });
  };
  const [dataBounds, setDataBounds] = useLocalState<string>(
    "bounds",
    "[[0,0][0,0]]"
  );
  const lastBounds = parseBounds(dataBounds);
  const {
    data: filterResult,
    refetch,
    isLoading,
    isError,
  } = useQuery<any>(
    ["filterHouse",lastBounds],
    async () => {
      const response = await axios.get(
        `/api/house/filter/1/20?city=${
          filter.searchInput
        }&dateFrom=${filter.startDate.toISOString()}&dateTo=${filter.endDate.toISOString()}&numberGuest=${
          filter.numberOfGuests
        }`
      );
      return response.data;
    },
    {
      cacheTime: 10 * 60 * 1000,
      staleTime: 5 * 60 * 1000,
      retry: 1,
      // enabled: filter.isEnabled as boolean,
    }
  );

  return (
    <div className="homePage relative">
      <Topbar>
        <div className="px-6 flex-[0_1_auto] min-w-[558px] inline-block ">
          <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm relative">
            <input
              value={filter.searchInput as string}
              onChange={(e) => {
                setFilter({
                  ...filter,
                  searchInput: e.target.value,
                });
              }}
              className="flex-grow pl-5 bg-transparent outline-none text-gray-600 placeholder-gray-400"
              type="text"
              placeholder="Địa điểm mà bạn muốn đến..."
            />

            <IconSearch className="hidden md:mx-2 right-2 md:inline-flex h-8 bg-primaryBtn text-white rounded-full p-2 cursor-pointer"></IconSearch>
            {filter.searchInput && (
              <div className="absolute top-[120%] -right-[23px]  bg-white z-30">
                <DateRangePicker
                  ranges={[selectionRanges]}
                  minDate={new Date()}
                  rangeColors={["#45B39D"]}
                  onChange={handleSelectDate}
                ></DateRangePicker>
                <div className="flex items-center justify-between border-b pb-2 px-4 bg-white relative">
                  <p className="text-xl  mt-2">Số lượng hành khách</p>
                  <div className="flex items-center gap-x-2  mt-2">
                    <IconUser className="h-5"></IconUser>
                    <input
                      value={filter.numberOfGuests}
                      onChange={(e: any) =>
                        setFilter({ ...filter, numberOfGuests: e.target.value })
                      }
                      type="number"
                      min={1}
                      className="w-12 outline-none text-primaryBtn textlg"
                    />
                  </div>
                </div>
                <div className="flex relative bg-white">
                  <button
                    onClick={resetInput}
                    className="flex-grow text-gray-500 border-[1px] border-[#717171] py-2 hover:text-white hover:bg-red-500 hover:border-red-500"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={HandleFilter}
                    className="flex-grow text-primaryBtn border-[1px] border-[#717171] py-2 hover:border-primaryBtn hover:bg-primaryBtn hover:text-white"
                  >
                    Search
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Topbar>
      {isError && <>{isError}</>}
      {!isLoading && filterResult && (
        <main className={`${styles.homePageContent} `}>
          {!showMap ? (
            <div className={styles.homeStayList}>
              {filterResult?.houses?.map((house: any) => (
                <HomeStayItem key={house._id} house={house}></HomeStayItem>
              ))}
            </div>
          ) : (
            <GoogleMapView></GoogleMapView>
          )}
        </main>
      )}
      <MapButton onClick={() => setShowMap(!showMap)}></MapButton>
    </div>
  );
}
