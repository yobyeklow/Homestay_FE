"use client";
import React, { useEffect, useRef, useState } from "react";

export default function useClickOutside() {
  const [show, setShow] = useState(false);
  const nodeRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    function handleDropdown(e: any) {
      if (nodeRef.current && !nodeRef.current.contains(e.target)) {
        setShow(false);
      }
    }
    document.addEventListener("click", handleDropdown);
    return () => {
      document.removeEventListener("click", handleDropdown);
    };
  }, []);
  return {
    show,
    setShow,
    nodeRef,
  };
}
