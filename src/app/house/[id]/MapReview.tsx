"use client";
import React, { useState } from "react";
import Map, { Marker, ViewState } from "react-map-gl";
interface ICoordinate {
  x: number;
  y: number;
}
const MapReview = ({ location }: any) => {
  const MAPBOX_TOKEN =
    "pk.eyJ1IjoibXV0cmFuZzIzIiwiYSI6ImNsbjNpbHF5ajBncHEycm1zbng3M2w4amkifQ.TRlgiGA9ZFY6pQQHB5ip7w";
  const [viewport, setViewPort] = useState({
    latitude: location?.coordinates?.x,
    longitude: location?.coordinates?.y,
    zoom: 17,
  });
  return (
    <div className="map relative pt-[48px] pb-[32px] w-full h-full">
      <h3 className="text-2xl font-bold mb-5">Địa điểm mà bạn sẽ đến</h3>
      <p className="mb-5 text-base">{location?.streetAddress}</p>
      <Map
        style={{ position: "relative", height: "480px", width: "100%" }}
        mapboxAccessToken={MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mutrang23/clnlyjumv005501qycd790a42"
        {...viewport}
        onMove={(evt) => {
          setViewPort(evt.viewState);
        }}
      >
        <Marker
          latitude={location?.coordinates?.x}
          longitude={location?.coordinates?.y}
          anchor="bottom"
          offset={[-15, -15]}
        ></Marker>
      </Map>
      <div className="pb-[32px]"></div>
    </div>
  );
};

export default MapReview;
