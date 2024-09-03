import { useSearchEventsByCategorieQuery } from "@/store/features/api/apiSlice";
import { setSearchedEvents } from "@/store/features/eventSlice";
import { IEvent } from "@/types/Event";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Progress from "../shared/Progress";

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const options = { day: "numeric", month: "long", year: "numeric" } as const;
  return new Intl.DateTimeFormat("en-US", options).format(date);
}

const categories = [
  "securite",
  "services evenementiels",
  "energies renouvelables",
  "startups et entrepreneuriat",
  "technologie",
  "telecommunications",
  "transport",
  "travaux publics",
  "intelligence artificielle ",
  "machines et outils",
  "aeronautique",
  "agriculture",
  "environnement",
  "industries chimiques",
  "metiers de la Mer",
  "education",
  "finance et comptabilite",
  "medical",
  "logistique",
  "ressources humaines",
];

function NextEvent({ events }: { events: IEvent[] }) {
  const [selectedCategory, setCategory] = useState<string[] | null>(null);
  useEffect(() => {
    console.log(selectedCategory);
  }, [selectedCategory]);

  const router = useRouter();
  const {
    data: eventsByCategory,
    isLoading: eventsByCategoryIsLoading,
    isError: eventsByCategoryIsError,
  } = useSearchEventsByCategorieQuery(selectedCategory as string[], {
    skip: !selectedCategory,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (eventsByCategoryIsLoading) {
      console.log("Loading events by category...");
    } else if (eventsByCategoryIsError) {
      alert("Error fetching events by category: " + eventsByCategoryIsError);
    } else if (eventsByCategory) {
      console.log("Fetched events by category:", eventsByCategory);
      setCategory(null);
      dispatch(setSearchedEvents(eventsByCategory));
      router.push("/search");
    }
  }, [eventsByCategoryIsLoading, eventsByCategoryIsError, eventsByCategory]);

  return (
    <div className="w-full p-4">
      <div className="w-[90%] ml-14 my-3">
        <h2 className="nd:text-3xl text-xl font-extrabold text-titles mb-4">
          Prochains événements
        </h2>
      </div>

      {/* Horizontal scrollable category list */}
      <div className="flex space-x-4 w-[90%] overflow-x-auto element-with-scrollbar mb-4 md:ml-10">
        {categories.map((category) => (
          <label
            key={category}
            className={`px-4 py-2 text-gray-500 rounded text-center cursor-pointer ${
              selectedCategory && selectedCategory[0] === category
                ? "bg-blue-200"
                : ""
            }`}
            onClick={() => setCategory([category])}
          >
            <span>{category}</span>
          </label>
        ))}
      </div>

      {/* Horizontal scrollable events list */}
      <div className="flex-col md:flex-row md:flex md:space-x-4 overflow-x-auto md:pl-0 pl-10 items-center justify-center w-full py-4 scrollbar-hide">
        {events.length !== 0 ? (
          events.map((event, index) => (
            <div
              onClick={() => router.push(`events/details/${event._id}`)}
              key={index}
              className="w-[300px] h-[300px] flex-shrink-0 bg-white shadow-md rounded-lg overflow-hidden"
            >
              <img
                alt="event-img"
                className="h-1/3 w-full object-cover"
                src={
                  event.eventImages
                    ? `${process.env.NEXT_PUBLIC_SERVER_URL}event/image/${event.eventImages[0]}`
                    : "https://via.placeholder.com/300x200"
                }
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold">{event.eventName}</h3>
                <p className="text-gray-600 flex flex-row items-center">
                  <img alt="location-icon" src="/icons/LocationGray.png" />
                  {event.location?.address?.commercial
                    ? event.location?.address?.commercial
                    : event.location?.address?.state}
                </p>
                <p className="text-gray-600 flex flex-row items-center">
                  <img alt="calendar-icon" src="/icons/CalendarGray.png" />
                  {event.startdate
                    ? formatDate(event.startdate as unknown as string)
                    : null}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full p-4">Aucun événement à afficher</div>
        )}
      </div>

      <div className="w-full flex justify-center items-center">
        <button
          onClick={() => router.replace("/search")}
          className="mr-2 rounded-[10px] px-6 py-3 bg-mainBlue text-white text-center"
        >
          Voir plus
        </button>
      </div>

      {eventsByCategoryIsLoading && <Progress />}
    </div>
  );
}

export default NextEvent;
