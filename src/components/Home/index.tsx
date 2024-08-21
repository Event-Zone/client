import React, { useEffect, useState } from "react";
import Hero from "./Hero";
import Categorie from "./Categorie";
import Villes from "./Villes";
import NextEvent from "./NextEvent";
import Collaborer from "./Collaborer";
import {
  useGetEventsQuery,
  useGetSubscriptionQuery,
} from "@/store/features/api/apiSlice";
import { useSelector } from "react-redux";
import { useSelectedLayoutSegment } from "next/navigation";
import { selectUser } from "@/store/features/userSlice";

function Home() {
  const [events, setEvents] = useState([]);
  const [subscription, setSubscription] = useState(null);
  const user = useSelector(selectUser);
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
      {user ? null : <Collaborer />}
    </div>
  );
}

export default Home;
