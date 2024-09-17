import { useSearchEventsByLocationQuery } from "@/store/features/api/apiSlice";
import { setSearchedEvents } from "@/store/features/eventSlice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Progress from "../shared/Progress";
import { useRouter } from "@/navigation";
import { useTranslations } from "next-intl";
import { setlocation } from "@/store/features/locationSlice";

function Villes() {
  const t = useTranslations("Villes");
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
    if (selectedLocations) dispatch(setlocation(selectedLocations[0]));
  }, [selectedLocations]);
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
        {t.rich("description", {
          span: (chunks) => <span className="text-mainBlue">{chunks}</span>,
        })}
      </h2>

      {/* Add horizontal scrolling for the container */}
      <div className="flex flex-row  md:flex-wrap justify-between overflow-x-scroll element-with-scrollbar  md:overflow-hidden w-full">
        <div
          onClick={() => setSelectedLocations(["Alger"])}
          className="flex-shrink-0 w-auto ville-container "
        >
          <div className="flex flex-col items-center relative w-full">
            <img
              alt="event-img"
              className="object-cover w-[76px] h-[76px] md:w-full md:h-[150px]  md:rounded-md rounded-full"
              src="/images/Frame 920.png"
            />{" "}
            <p className="md:hidden block text-gray-500 text-[10px] text-center mt-2 ">
              Alger
            </p>
            <div className="ville-overlay md:block hidden">
              <div className="flex justify-between">
                <p>Alger</p>
                <p>{"→"}</p>
              </div>
            </div>
          </div>
        </div>

        <div
          onClick={() => setSelectedLocations(["Oran"])}
          className="flex-shrink-0 w-auto ville-container"
        >
          <div className="flex flex-col items-center relative w-full">
            <img
              alt="event-img"
              className="object-cover w-[76px] h-[76px] md:w-full md:h-[150px]  md:rounded-md rounded-full"
              src="/images/Frame 643.png"
            />{" "}
            <p className="md:hidden block text-gray-500 text-[10px] text-center mt-2 ">
              Oran
            </p>
            <div className="ville-overlay md:block hidden">
              <div className="flex justify-between">
                <p>Oran</p>
                <p>{"→"}</p>
              </div>
            </div>
          </div>
        </div>

        <div
          onClick={() => setSelectedLocations(["Annaba"])}
          className="flex-shrink-0 w-auto ville-container"
        >
          <div className="flex flex-col items-center relative w-full">
            <img
              alt="event-img"
              className="object-cover w-[76px] h-[76px] md:w-full md:h-[150px]  md:rounded-md rounded-full"
              src="/images/Frame 921.png"
            />{" "}
            <p className="md:hidden block text-gray-500 text-[10px] text-center mt-2 ">
              Annaba
            </p>
            <div className="ville-overlay md:block hidden">
              <div className="flex justify-between">
                <p>Annaba</p>
                <p>{"→"}</p>
              </div>
            </div>
          </div>
        </div>

        <div
          onClick={() => setSelectedLocations(["Constantine"])}
          className="flex-shrink-0 w-auto ville-container"
        >
          <div className="flex flex-col items-center relative w-full">
            <img
              alt="event-img"
              className="object-cover w-[76px] h-[76px] md:w-full md:h-[150px]  md:rounded-md rounded-full"
              src="/images/Frame 922.png"
            />
            <p className="md:hidden block text-gray-500 text-[10px] text-center mt-2 ">
              Constantine
            </p>
            <div className="ville-overlay md:block hidden">
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
