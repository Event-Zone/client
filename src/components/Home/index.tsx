import React, { useEffect, useState } from "react";
import Hero from "./Hero";
import Categorie from "./Categorie";
import Villes from "./Villes";
import NextEvent from "./NextEvent";
import Collaborer from "./Collaborer";
import { useGetEventsQuery } from "@/store/features/api/apiSlice";

function Home() {
  const [events, setEvents] = useState([]);
  const {
    data: fetchedEvents,
    error,
    isLoading,
    refetch,
  } = useGetEventsQuery();

  useEffect(() => {
    if (isLoading) {
      console.log("Loading events...");
    } else if (error) {
      console.error("Error fetching events:", error);
    } else if (fetchedEvents) {
      console.log("Fetched events:", fetchedEvents);
      setEvents(fetchedEvents);
    }
  }, [fetchedEvents, error, isLoading]);

  return (
    <div className="min-h-screen">
      <Hero />
      <Categorie />
      <Villes />
      <NextEvent events={events.slice(0, 4)} />
      <Collaborer />
    </div>
  );
}

export default Home;
