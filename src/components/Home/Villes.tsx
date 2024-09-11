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
    <div className="w-full py-4 ">
      <h2 className="text-titles ml-1 mb-4 poppins-semibold md:text-[24px]">
        Villes populaires à <span className="text-mainBlue">EventZone</span>
      </h2>
      <div className="flex flex-row justify-start items-center w-full overflow-x-auto element-with-scrollbar space-x-4">
        <div
          onClick={() => setSelectedLocations(["Alger"])}
          className="flex-shrink-0 md:px-4 ville-container"
        >
          <div className="relative">
            <img
              alt="event-img"
              className="object-cover w-[150px] h-[150px] md:w-full md:h-48 md:rounded-md rounded-full"
              src="/Frame 920.png"
            />
            <div className="ville-overlay">
              <div className="flex justify-between ">
                <p>Alger</p>
                <p>{"→"}</p>
              </div>
            </div>
          </div>
        </div>
        <div
          onClick={() => setSelectedLocations(["Oran"])}
          className="flex-shrink-0 md:px-4 ville-container"
        >
          <div className="relative">
            <img
              alt="event-img"
              className="object-cover w-[150px] h-[150px] md:w-full md:h-48 md:rounded-md rounded-full"
              src="/Frame 643.png"
            />
            <div className="ville-overlay">
              <div className="flex justify-between ">
                <p> Oran</p>
                <p>{"→"}</p>
              </div>
            </div>
          </div>
        </div>
        <div
          onClick={() => setSelectedLocations(["Annaba"])}
          className="flex-shrink-0 md:px-4 ville-container"
        >
          <div className="relative">
            <img
              alt="event-img"
              className="object-cover w-[150px] h-[150px] md:w-full md:h-48 md:rounded-md rounded-full"
              src="/Frame 921.png"
            />

            <div className="ville-overlay">
              <div className="flex justify-between ">
                <p> Annaba</p>
                <p>{"→"}</p>
              </div>
            </div>
          </div>
        </div>
        <div
          onClick={() => setSelectedLocations(["Constantine"])}
          className="flex-shrink-0 md:px-4 ville-container"
        >
          <div className="relative">
            <img
              alt="event-img"
              className="object-cover w-[150px] h-[150px] md:w-full md:h-48 md:rounded-md rounded-full"
              src="/Frame 922.png"
            />
            <div className="ville-overlay">
              {" "}
              <div className="flex justify-between ">
                <p> Constantine</p>
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
