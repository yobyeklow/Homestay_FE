"use client";
import HomeStayItem from "@/components/homestay/HomeStayItem";
import { IconSearch, IconUser } from "@/components/icons";
import Topbar from "@/components/layout/Topbar";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getCenter, getCenterOfBounds } from "geolib";
import { DateRangePicker } from "react-date-range";
import "@/styles/dateRange.css";
import "@/styles/searchHouse.css";
import { useSearchParams } from "next/navigation";
import { format, parseISO, startOfDay } from "date-fns";
import { useLocalState } from "@/utils/useLocalState";
import Map from "./Map";
import { useLastData } from "@/utils/useLastData";
import { filterHouseByInput, filterNearHouse } from "@/apis/filter.apis";
import axios from "@/utils/axios";
import Skeleton from "react-loading-skeleton";
export interface ISearchProps {
  page: number;
  limit: number;
  city: string;
  dateFrom: string;
  dateTo: string;
  numberGuest: number;
}
export interface ISearchNearHProps {
  bounds: {
    sw: {
      latitude: any;
      longtitude: any;
    };
    ne: {
      latitude: any;
      longtitude: any;
    };
  };
}
type BoundsArray = [[number, number], [number, number]];

export default function SearchPage() {
  const parseBounds = (boundsString: string) => {
    try {
      const boundsSearch = JSON.parse(boundsString) as BoundsArray;
      return {
        sw: {
          latitude: boundsSearch[0][1],
          longtitude: boundsSearch[0][0],
        },
        ne: {
          latitude: boundsSearch[1][1],
          longtitude: boundsSearch[1][0],
        },
      };
    } catch (error) {
      console.error("Error parsing boundsString:", error);

      return {
        sw: { latitude: 0, longitude: 0 },
        ne: { latitude: 0, longitude: 0 },
      };
    }
  };
  const [openSearchInput, setOpenSearchInput] = useState(false);
  const [dataBounds, setDataBounds] = useLocalState<string>(
    "boundsSearch",
    "[[0,0][0,0]]"
  );

  const lastBounds = parseBounds(dataBounds);
  const searchParams = useSearchParams();
  const [handle, setHandle] = useState(Boolean(searchParams.get("handle")));
  const [filter, setFilter] = useState({
    startDate: new Date(searchParams.get("checkInDate") as string),
    endDate: new Date(searchParams.get("checkOutDate") as string),
    numberOfGuests: parseInt(searchParams.get("numberOfGuests") as string) || 1,
    searchInput: searchParams.get("city") || "",
    page: 1,
    limit: 20,
    isForward: searchParams.get("isForward") || false,
  });

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
  const convertDate = (date: string) => {
    const originalDateTime = parseISO(date);

    const startOfDayDateTime = startOfDay(originalDateTime);

    const resultString = format(startOfDayDateTime, "yyyy-MM-dd'T'HH:mm:ss");
    return resultString;
  };
  const [secondTime, setSecondTime] = useState(false);
  const useFilteredHouses = ({
    page,
    limit,
    city,
    dateFrom,
    dateTo,
    numberGuest,
  }: ISearchProps) => {
    return useQuery(
      ["filterHouses"],
      () => {
        setHandle(false);

        return filterHouseByInput(
          page,
          limit,
          city,
          dateFrom,
          dateTo,
          numberGuest
        );
      },
      {
        retry: 1,
        cacheTime: 10 * 60 * 1000,
        staleTime: 5 * 60 * 1000,
        // enabled: handle,
      }
    );
  };
  const { data: nearHouses } = useQuery<any>(
    ["nearHouses", lastBounds],
    async () => {
      const response = await axios.get(
        `http://localhost:8000/api/house/get-all-near-location?sw[latitude]=${lastBounds.sw.latitude}&sw[longtitude]=${lastBounds.sw.longtitude}&ne[latitude]=${lastBounds.ne.latitude}&ne[longtitude]=${lastBounds.ne.longtitude}`,
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
      return [];
    },
    {
      retry: 0,
      cacheTime: 10 * 60 * 1000,
      staleTime: 5 * 60 * 1000,
      enabled: secondTime,
    }
  );
  const {
    data: filterResult,
    isLoading,
    refetch,
  } = useFilteredHouses({
    page: 1,
    limit: 20,
    city: filter.searchInput,
    dateFrom: convertDate(filter.startDate.toISOString()),
    dateTo: convertDate(filter.endDate.toISOString()),
    numberGuest: filter.numberOfGuests,
  });

  const HandleFilter = () => {
    setFilter({
      ...filter,
      searchInput: "",
    });

    setHandle(true);
    setOpenSearchInput(false);
    refetch();
  };
  const locationList = filterResult?.houses?.map(
    (item: any) => item.locationID.coordinates
  );
  const lastLocationList = locationList?.map((item: any) => {
    return {
      latitude: item.x,
      longitude: item.y - 0.001,
    };
  });

  const lastData = useLastData(filterResult);
  const lastDataNearHouse = useLastData(nearHouses);
  // useEffect(() => {
  //   window.location.reload();
  // }, []);
  if (isLoading) return <Skeleton></Skeleton>;
  const centerLocation = getCenterOfBounds(lastLocationList);
  // console.log(centerLocation);
  // console.log(getCenterOfBounds(lastLocationList));

  return (
    <div className="homePage relative">
      <Topbar className="mx-6">
        <div className="px-6 flex-[0_1_auto] min-w-[558px] inline-block ">
          <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm relative">
            <input
              value={filter.searchInput as string}
              onClick={() => setOpenSearchInput(true)}
              onChange={(e) => {
                setOpenSearchInput(true);
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
            {openSearchInput && (
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

      <main className="w-full h-[calc(100vh - 110px)] relative">
        <div className="grid grid-cols-3 w-full h-full">
          <div className="col-span-2 w-full full px-6">
            <div className="mt-5">
              <span className="text-base text-[#222222] leading-[18px] font-medium">
                Tìm thấy {lastData?.houseQuantity} chổ ở
              </span>
            </div>
            <div className="houseList">
              {!lastDataNearHouse &&
                lastData &&
                lastData?.houses?.map((house: any) => (
                  <HomeStayItem key={house._id} house={house}></HomeStayItem>
                ))}
              {lastDataNearHouse &&
                lastData &&
                lastDataNearHouse?.houses?.map((house: any) => (
                  <HomeStayItem key={house._id} house={house}></HomeStayItem>
                ))}
            </div>
          </div>
          <div className="col-span-1">
            {!lastDataNearHouse && lastData && (
              <Map
                setDataBounds={setDataBounds}
                location={centerLocation}
                data={lastData?.houses}
                setSecondTime={setSecondTime}
              ></Map>
            )}
            {lastDataNearHouse && lastData && (
              <Map
                setDataBounds={setDataBounds}
                location={centerLocation}
                data={lastDataNearHouse?.houses}
                setSecondTime={setSecondTime}
              ></Map>
            )}
          </div>
        </div>
      </main>
      {/* {!isLoading && filterResult && (
        <main className={`${styles.homePageContent} `}>
          <div className=" max-h-screen grid grid-cols-3">
            <div className="col-span-2">
              <div className={styles.homeStayList}>
                {filterResult?.houses?.map((house: any) => (
                  <HomeStayItem key={house._id} house={house}></HomeStayItem>
                ))}
              </div>
            </div>
            <div className="col-span-1 w-full">
              <Map
                setDataBounds={setDataBounds}
                location={centerLocation}
                data={lastData.houses}
              ></Map>
            </div>
          </div>
        </main>
      )} */}
    </div>
  );
}
