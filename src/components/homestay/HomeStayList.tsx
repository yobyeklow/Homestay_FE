import React, { useEffect, useState } from "react";
import HomeStayItem from "./HomeStayItem";
import { useLocalState } from "@/utils/useLocalState";
interface IProps {
  houses: any[];
}
const HomeStayList = ({ houses }: IProps) => {
  const [favorites, setFavorites] = useLocalState<any[]>("favorties", []);

  const handleAddFavorites = (item: any) => {
    const isSelectedItem = favorites.includes(item);
    if (isSelectedItem) {
      const updatedItems = favorites.filter((id: any) => id !== item);
      setFavorites(updatedItems);
    } else {
      setFavorites((prevItem: any) => [...prevItem, item]);
    }
  };
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);
  return (
    <>
      {houses.map((house, index) => {
        return (
          <HomeStayItem
            key={house._id}
            favorites={favorites}
            house={house}
            addFavorites={handleAddFavorites}
          ></HomeStayItem>
        );
      })}
    </>
  );
};

export default HomeStayList;
