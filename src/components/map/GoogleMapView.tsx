"use client";
import React, { useEffect, useRef, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import Map from "./Map";
import axios from "axios";
import { useQuery } from "react-query";
import { useLocalState } from "@/utils/useLocalState";
import HouseList from "./HouseList";
import { useLastData } from "@/utils/useLastData";
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

const GoogleMapView = () => {
  const [dataBounds, setDataBounds] = useLocalState<string>(
    "bounds",
    "[[0,0][0,0]]"
  );
  const lastBounds = parseBounds(dataBounds);
  const { data, isLoading, error } = useQuery<any>(
    ["house", lastBounds],
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
      cacheTime: 10 * 60 * 1000,
      staleTime: 5 * 60 * 1000,
    }
  );
  const lastData = useLastData(data);

  return (
    <div className=" max-h-screen grid grid-cols-3">
      <div className="col-span-2">
        <HouseList houses={lastData?.houses}></HouseList>
      </div>
      <div className="col-span-1 w-full">
        <Map setDataBounds={setDataBounds} data={lastData?.houses}></Map>
      </div>
    </div>
  );
};

export default GoogleMapView;
