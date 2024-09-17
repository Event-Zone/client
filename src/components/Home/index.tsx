import React, { useEffect, useState } from "react";
import Hero from "./Hero";
import Categorie from "./Categorie";
import Villes from "./Villes";
import NextEvent from "./NextEvent";
import Collaborer from "./Collaborer";
import { useGetEventsQuery } from "@/store/features/api/apiSlice";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/features/userSlice";
import Progress from "../shared/Progress";

function Home() {
  const [events, setEvents] = useState([]);
  const [subscription, setSubscription] = useState(null);
  const user = useSelector(selectUser);
  const {
    data: fetchedEvents,
    error,
    isLoading,
    refetch,
  } = useGetEventsQuery("approved");

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
    <div className="min-w-screen md:px-[0px] px-[10px]">
      <Hero />
      <div className="md:px-28 ">
        <Categorie />
        <Villes />
        <NextEvent events={events.slice(0, 4)} />
        <Collaborer />
      </div>

      {isLoading && <Progress />}
    </div>
  );
}

export default Home;
