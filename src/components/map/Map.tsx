"use client";
import React, { useEffect, useRef, useState } from "react";
import Map, { ViewState, Marker, Popup } from "react-map-gl";
import ReactMapGL from "react-map-gl";
import styles from "@/styles/MapBox.module.css";
import getCenter from "geolib/es/getCenter";
import Image from "next/image";
import { useLocalState } from "@/utils/useLocalState";
import "@/styles/mapBox.css";
import Link from "next/link";
interface IProps {
  data: any;
  setDataBounds: (bounds: string) => {};
}
const config = { style: "currency", currency: "VND", maximumFractionDigits: 9 };

const ViewMap = ({ data, setDataBounds }: IProps) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [viewport, setViewPort] = useLocalState<any>("viewport", {
    latitude: 11.9211707,
    longitude: 108.436171,
    width: "100%",
    height: "calc(100vh- 110px)",
    zoom: 17,
  });
  const MAPBOX_TOKEN =
    "pk.eyJ1IjoibXV0cmFuZzIzIiwiYSI6ImNsbjNpbHF5ajBncHEycm1zbng3M2w4amkifQ.TRlgiGA9ZFY6pQQHB5ip7w";
  useEffect(() => {}, [selectedLocation]);
  const mapRef = useRef<ReactMapGL | null>(null);

  return (
    <div className={`${styles.mapBox} cursor-grab active:cursor-grabbing`}>
      <Map
        {...viewport}
        style={{
          position: "absolute",
          maxWidth: "717px",
        }}
        mapboxAccessToken={MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mutrang23/clnlyjumv005501qycd790a42"
        onDragEnd={(evt) => {
          if (mapRef.current) {
            const bounds = mapRef.current.getMap().getBounds();
            setDataBounds(JSON.stringify(bounds.toArray()));
          }
        }}
        onZoomEnd={() => {
          const bounds = mapRef.current.getMap().getBounds();
          setDataBounds(JSON.stringify(bounds.toArray()));
        }}
        onMove={(evt) => {
          setViewPort(evt.viewState);
        }}
        ref={(instance) => (mapRef.current = instance)}
        maxZoom={20}
        minZoom={13}
        onLoad={() => {
          if (mapRef.current) {
            const bounds = mapRef.current.getMap().getBounds();
            setDataBounds(JSON.stringify(bounds.toArray()));
          }
        }}
      >
        {data?.map((result: any) => {
          const lat = result?.locationID.coordinates.x;
          const lot = result?.locationID.coordinates.y;
          return (
            <div key={result?._id}>
              <Marker
                latitude={lat}
                longitude={lot}
                anchor="bottom"
                offset={[-15, -15]}
              >
                <p
                  onClick={() => setSelectedLocation(result)}
                  className=" bg-white animate-bounce px-2 py-1 shadow-[0_2px_4px_rgba(0,0,0,0.18);] rounded-[34px] font-bold cursor-pointer"
                >
                  {new Intl.NumberFormat("vi-VN", config).format(
                    result.costPerNight
                  )}
                </p>
              </Marker>

              {selectedLocation?.locationID?.coordinates?.y ==
              result?.locationID.coordinates.y ? (
                <Popup
                  longitude={result?.locationID.coordinates.y}
                  latitude={result?.locationID.coordinates.x}
                  closeOnClick={false}
                  onClose={() => {
                    setSelectedLocation(null);
                  }}
                  maxWidth="300px"
                >
                  <Link href={`http://localhost:3000/house/${result._id}`}>
                    <div className="markerItem bg-white rounded-[12px] w-[280px]">
                      <div className="flex flex-col w-[280px]  h-full">
                        <div className="itemImage relative w-[280px] h-[212px]">
                          <Image
                            src={result?.images[0]?.url || `/house.jpg`}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            alt="house.png"
                            className="object-cover w-full h-full"
                          ></Image>
                        </div>
                        <div className="houseInfo flex-1">
                          <p className="text-lg mt-1 font-semibold">
                            {result.title}
                          </p>
                          <div className="flex items-center gap-x-2">
                            <span className="text-sm">
                              <span className="font-semibold">
                                {new Intl.NumberFormat("vi-VN", config).format(
                                  result.costPerNight
                                )}
                              </span>
                              / đêm
                            </span>
                            <span>-</span>
                            <p className="text-[#717171] text-sm">
                              {
                                <span>
                                  Ngày {""}
                                  {
                                    result.calenderID.dateFrom
                                      .split("T")[0]
                                      .split("-")[2]
                                  }{" "}
                                  - {""}
                                  {
                                    result.calenderID.dateTo
                                      .split("T")[0]
                                      .split("-")[2]
                                  }{" "}
                                  tháng{" "}
                                  {
                                    result.calenderID.dateTo
                                      .split("T")[0]
                                      .split("-")[1]
                                  }{" "}
                                </span>
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </Popup>
              ) : (
                false
              )}
            </div>
          );
        })}
      </Map>
    </div>
  );
};

export default ViewMap;
