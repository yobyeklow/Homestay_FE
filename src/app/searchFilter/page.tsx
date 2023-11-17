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
import { filterHouseByFilter } from "@/apis/filter.apis";
import { useRouter, useParams, useSearchParams } from "next/navigation";
interface ISearchProps {
  page: number | null;
  limit: number | null;
  bedCount: number | null;
  countBedRoom: number | string;
  countBathRoom: number | string;
  facilities: any;
  minPrice: number | null;
  maxPrice: number | null;
}
export default function SearchFilter() {
  const searchParams = useSearchParams();
  // console.log(query);
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
  const dataParams = {
    bedCount: parseInt(searchParams.get("bedCount") as string) || null,
    countBedRoom: parseInt(searchParams.get("countBedRoom") as string) || null,
    countBathRoom:
      parseInt(searchParams.get("countBathRoom") as string) || null,
    facilities: searchParams.get("facilities") || null,
    minPrice: parseInt(searchParams.get("minPrice") as string) || null,
    maxPrice: parseInt(searchParams.get("maxPrice") as string) || null,
  };

  const useFilteredHouses = ({
    page,
    limit,
    bedCount,
    countBedRoom,
    countBathRoom,
    facilities,
    minPrice,
    maxPrice,
  }: ISearchProps) => {
    return useQuery(
      ["HouseByFilter"],
      () => {
        return filterHouseByFilter(
          page,
          limit,
          bedCount,
          countBedRoom,
          countBathRoom,
          facilities,
          minPrice,
          maxPrice
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
  const { data, isLoading } = useFilteredHouses({
    page: 1,
    limit: 20,
    bedCount: dataParams.bedCount,
    countBedRoom: "",
    // dataParams.countBedRoom === 1 ? null : dataParams.countBedRoom,
    countBathRoom: "",
    //   dataParams.countBathRoom === 1 ? null : dataParams.countBathRoom,
    facilities: dataParams.facilities,
    minPrice: dataParams.minPrice,
    maxPrice: dataParams.maxPrice,
  });
  if (isLoading) return <Skeleton></Skeleton>;

  return (
    <div className="homePage relative">
      <Topbar></Topbar>
      {!showMap && <FilterButton></FilterButton>}
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
