"use client";
import Search from "@/components/Search";
import {
  useSearchEventsByCategorieQuery,
  useSearchEventsByTypeQuery,
} from "@/store/features/api/apiSlice";
import { selectSearchedEvents } from "@/store/features/eventSlice";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Page() {
  const { categorie } = useParams();
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
    <div>
      <Search initEvents={initEvents} />
    </div>
  );
}

export default Page;
