"use client";
import Search from "@/components/Search";
import Ads from "@/components/Search/Ads";
import { selectSearchedEvents } from "@/store/features/eventSlice";
import React from "react";
import { useSelector } from "react-redux";

function Page() {
  const initEvents = useSelector(selectSearchedEvents);
  return (
    <div className="flex md:flex-row  flex-col-reverse h-screen overflow-scroll">
      <div className="flex-grow">
        <Search initEvents={initEvents} />
      </div>
      <div className="flex-shrink-0 w-full md:w-[450px] h-[500px] md:sticky top-1 right-1 overflow-y-auto">
        <Ads />
      </div>
    </div>
  );
}

export default Page;
