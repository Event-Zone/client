"use client";
import Search from "@/components/Search";
import Ads from "@/components/Search/Ads";
import {
  useSearchEventsByCategorieQuery,
  useSearchEventsByTypeQuery,
} from "@/store/features/api/apiSlice";
import { selectSearchedEvents } from "@/store/features/eventSlice";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Page({
  params: { categorie },
}: {
  params: { categorie: string | string[] };
}) {
  const [initEvents, setInitEvents] = useState<any[] | null>([]);
  const {
    data: eventsByCategorie,
    isLoading: eventsByCategorieIsLoading,
    isError: eventsByCategorieIsError,
  } = useSearchEventsByCategorieQuery(categorie as string[], {
    skip: (categorie as string[])?.length === 0,
  });
  useEffect(() => {
    if (eventsByCategorieIsLoading) {
      console.log("Loading events by Categorie...");
    } else if (eventsByCategorieIsError) {
      alert("Error fetching events by Categorie: " + eventsByCategorieIsError);
    } else if (eventsByCategorie) {
      console.log("Fetched events by Categorie:", eventsByCategorie);
      setInitEvents(eventsByCategorie);
    }
  }, [eventsByCategorieIsLoading, eventsByCategorieIsError, eventsByCategorie]);
  return (
    <div className="flex  xl:flex-row  flex-col-reverse h-screen overflow-scroll element-with-scrollbar">
      <div>
        <Search initEvents={initEvents} />
      </div>
      <div className="flex-shrink-0 w-full xl:w-[450px] h-full xl:sticky top-1 right-1 overflow-y-auto">
        <Ads />
      </div>
    </div>
  );
}

export default Page;
