"use client";
import Search from "@/components/Search";
import { selectSearchedEvents } from "@/store/features/eventSlice";
import React from "react";
import { useSelector } from "react-redux";

function page() {
  const initEvents = useSelector(selectSearchedEvents);
  return (
    <div>
      <Search initEvents={initEvents} />
    </div>
  );
}

export default page;
