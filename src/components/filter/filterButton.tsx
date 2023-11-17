import React, { useState } from "react";
import { IconFilter } from "../icons";
import ModalFilter from "./ModalFilter";

const FilterButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="px-20 mt-5 flex justify-end">
      <button
        onClick={() => setIsOpen(true)}
        className="flex px-4 gap-x-2 items-center justify-center py-[7xp] rounded-[12px] border-[1px] min-w-[48px] h-[48px] border-[#dddddd] bg-transparent"
      >
        <IconFilter className="w-4 h-4"></IconFilter>
        <span className="text-sm text-black">Bộ lọc</span>
      </button>
      <ModalFilter isOpen={isOpen} setIsOpen={setIsOpen}></ModalFilter>
    </div>
  );
};

export default FilterButton;
