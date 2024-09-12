import { useSearchEventsByLocationQuery } from "@/store/features/api/apiSlice";
import { setSearchedEvents } from "@/store/features/eventSlice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Progress from "../shared/Progress";
import { useRouter } from "next/navigation";

function Villes() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [selectedLocations, setSelectedLocations] = useState<string[] | null>(
    null
  );
  const {
    data: eventsByLocation,
    isLoading: eventByLocationIsLoading,
    isError: eventByLocationIsError,
  } = useSearchEventsByLocationQuery(selectedLocations!, {
    skip: !selectedLocations,
  });

  useEffect(() => {
    if (eventByLocationIsLoading) {
      console.log("Loading events by location...");
    } else if (eventByLocationIsError) {
      alert("Error fetching events by location: " + eventByLocationIsError);
    } else if (eventsByLocation) {
      console.log("Fetched events by location: ", eventsByLocation);

      dispatch(setSearchedEvents(eventsByLocation));
      router.push("/search");
    }
  }, [eventByLocationIsLoading, eventByLocationIsError, eventsByLocation]);

  return (
    <div className="w-full py-4">
      <h2 className="text-titles ml-1 mb-4 poppins-semibold md:text-[24px]">
        Villes populaires à <span className="text-mainBlue">EventZone</span>
      </h2>

      {/* Add horizontal scrolling for the container */}
      <div className="flex flex-row space-x-4 overflow-x-auto element-with-scrollbar">
        <div
          onClick={() => setSelectedLocations(["Alger"])}
          className="flex-shrink-0 w-[150px] md:w-[33%] ville-container"
        >
          <div className="relative w-full">
            <img
              alt="event-img"
              className="object-cover w-full h-[150px] md:h-48 md:rounded-md rounded-full"
              src="/Frame 920.png"
            />
            <div className="ville-overlay">
              <div className="flex justify-between">
                <p>Alger</p>
                <p>{"→"}</p>
              </div>
            </div>
          </div>
        </div>

        <div
          onClick={() => setSelectedLocations(["Oran"])}
          className="flex-shrink-0 w-[150px] md:w-[33%] ville-container"
        >
          <div className="relative w-full">
            <img
              alt="event-img"
              className="object-cover w-full h-[150px] md:h-48 md:rounded-md rounded-full"
              src="/Frame 643.png"
            />
            <div className="ville-overlay">
              <div className="flex justify-between">
                <p>Oran</p>
                <p>{"→"}</p>
              </div>
            </div>
          </div>
        </div>

        <div
          onClick={() => setSelectedLocations(["Annaba"])}
          className="flex-shrink-0 w-[150px] md:w-[33%] ville-container"
        >
          <div className="relative w-full">
            <img
              alt="event-img"
              className="object-cover w-full h-[150px] md:h-48 md:rounded-md rounded-full"
              src="/Frame 921.png"
            />
            <div className="ville-overlay">
              <div className="flex justify-between">
                <p>Annaba</p>
                <p>{"→"}</p>
              </div>
            </div>
          </div>
        </div>

        <div
          onClick={() => setSelectedLocations(["Constantine"])}
          className="flex-shrink-0 w-[150px] md:w-[33%] ville-container"
        >
          <div className="relative w-full">
            <img
              alt="event-img"
              className="object-cover w-full h-[150px] md:h-48 md:rounded-md rounded-full"
              src="/Frame 922.png"
            />
            <div className="ville-overlay">
              <div className="flex justify-between">
                <p>Constantine</p>
                <p>{"→"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Villes;
