"use client";
import HomeStayItem from "@/components/homestay/HomeStayItem";
import { IconSearch, IconUser } from "@/components/icons";
import Topbar from "@/components/layout/Topbar";
import MapButton from "@/components/map/MapButton";
import styles from "@/styles/Home.module.css";
import GoogleMapView from "@/components/map/GoogleMapView";
import { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";
import "@/styles/dateRange.css";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import FilterButton from "@/components/filter/filterButton";
export default function Home() {
  const [showMap, setShowMap] = useState(false);
  const [filter, setFilter] = useState({
    startDate: new Date(),
    endDate: new Date(),
    numberOfGuests: 1,
    searchInput: "",
    page: 1,
    limit: 20,
  });

  const selectionRanges = {
    startDate: filter.startDate,
    endDate: filter.endDate,
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

  const { data, isLoading } = useQuery<any>(
    ["AllHouse"],
    async () => {
      const response = await axios.get(
        `http://localhost:8000/api/house/get-all`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
          },
        }
      );
      if (response.status == 200) {
        return response.data;
      }
      return null;
    },
    {
      retry: 1,
      cacheTime: 10 * 60 * 1000,
      staleTime: 5 * 60 * 1000,
    }
  );
  if (isLoading) return <Skeleton></Skeleton>;
  return (
    <div className="homePage relative">
      <Topbar>
        <div className="px-6 flex-[0_1_auto] min-w-[558px] inline-block ">
          <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm relative">
            <input
              value={filter.searchInput}
              onChange={(e) => {
                setFilter({ ...filter, searchInput: e.target.value });
              }}
              className="flex-grow pl-5 bg-transparent outline-none text-gray-600 placeholder-gray-400"
              type="text"
              placeholder="Địa điểm mà bạn muốn đến..."
            />

            <IconSearch className="hidden md:mx-2 right-2 md:inline-flex h-8 bg-primaryBtn text-white rounded-full p-2 cursor-pointer"></IconSearch>
            {filter.searchInput && (
              <div className="absolute top-[120%] z-40 -right-[23px]  bg-white">
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
                  <Link
                    href={{
                      pathname: "/search",
                      query: {
                        checkInDate: filter.startDate.toString(),
                        checkOutDate: filter.endDate.toString(),
                        numberOfGuests: filter.numberOfGuests,
                        city: filter.searchInput,
                        handle: true,
                      },
                    }}
                    prefetch={true}
                    className="flex-grow"
                  >
                    <button className="w-full text-primaryBtn border-[1px] border-[#717171] py-2 hover:border-primaryBtn hover:bg-primaryBtn hover:text-white">
                      Search
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </Topbar>
      <FilterButton></FilterButton>
      {data && (
        <main className={`${styles.homePageContent} `}>
          {!showMap ? (
            <div className={styles.homeStayList}>
              {data?.houses?.map((house: any) => (
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
