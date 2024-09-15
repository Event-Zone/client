import React, { useEffect, useState } from "react";
import { useRouter } from "@/navigation";
import Image from "next/image";
import Progress from "../shared/Progress";
import { useSelector } from "react-redux";
import {
  useGetCategoriesQuery,
  useGetTypesQuery,
  useSearchEventsByCategorieQuery,
  useSearchEventsByTypeQuery,
} from "@/store/features/api/apiSlice";
import { selectInitialEvents } from "@/store/features/eventSlice";
import { IEvent } from "@/types/Event";
import { useTranslations } from "next-intl";

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const options = { day: "numeric", month: "long", year: "numeric" } as const;
  return new Intl.DateTimeFormat("en-US", options).format(date);
}

function NextEvent({ events }: { events: IEvent[] }) {
  const {
    data: Categories,
    isLoading: CategoriesLoading,
    error: CategoriesError,
  } = useGetCategoriesQuery();
  const {
    data: Types,
    isLoading: TypesLoading,
    error: TypesError,
  } = useGetTypesQuery();

  const [selectedCategory, setCategory] = useState<string[] | null>(["Tout"]);
  const [searchedEvents, setSearchedEvents] = useState<any>([]);
  const [visibleEventsCount, setVisibleEventsCount] = useState<number>(4);
  const [selectedType, setType] = useState<string[] | null>(null);
  const initialEvents = useSelector(selectInitialEvents);

  const router = useRouter();

  useEffect(() => {
    if (selectedCategory?.includes("Tout")) {
      setSearchedEvents(initialEvents);
    }
  }, [initialEvents, selectedCategory]);

  const {
    data: eventsByCategory,
    isLoading: eventsByCategoryIsLoading,
    isError: eventsByCategoryIsError,
  } = useSearchEventsByCategorieQuery(selectedCategory as string[], {
    skip: !selectedCategory || selectedCategory.includes("Tout"),
  });

  const {
    data: eventsByType,
    isLoading: eventsByTypeIsLoading,
    isError: eventsByTypeIsError,
  } = useSearchEventsByTypeQuery(selectedType as string[], {
    skip: !selectedType,
  });

  useEffect(() => {
    if (eventsByCategory) {
      setSearchedEvents(eventsByCategory);
    }
  }, [eventsByCategory]);

  useEffect(() => {
    if (eventsByType) {
      setSearchedEvents(eventsByType);
    }
  }, [eventsByType]);

  const handleShowMore = () => {
    setVisibleEventsCount((prevCount) => prevCount + 8);
  };
  const t = useTranslations("NextEvents");
  return (
    <div className="w-full py-4">
      <div className="w-[90%] ml-1 my-3">
        <h2 className="text-titles mb-4 poppins-semibold md:text-[24px]">
          {t("description")}
        </h2>
      </div>

      {/* Horizontal scrollable category list */}
      <div className="flex space-x-4 w-full overflow-x-auto element-with-scrollbar mb-4 md:ml-1">
        <label
          key={"Tout"}
          className={`px-4 text-gray-500 text-center cursor-pointer whitespace-nowrap ${
            selectedCategory && selectedCategory[0] === "Tout"
              ? "border-b-2 border-b-mainBlue"
              : ""
          }`}
          onClick={() => setCategory(["Tout"])}
        >
          <span>Tout</span>
        </label>

        {Categories?.map((category: any) => (
          <label
            key={category.name}
            className={`px-4 text-gray-500 text-center cursor-pointer whitespace-nowrap ${
              selectedCategory && selectedCategory[0] === category.name
                ? "border-b-2 border-b-mainBlue"
                : ""
            }`}
            onClick={() => setCategory([category.name])}
          >
            <span>{category.name}</span>
          </label>
        ))}

        {Types?.map((type: any) => (
          <label
            key={type.name}
            className={`px-4 text-gray-500 text-center cursor-pointer whitespace-nowrap ${
              selectedType && selectedType[0] === type.name
                ? "border-b-2 border-b-mainBlue"
                : ""
            }`}
            onClick={() => setType([type.name])}
          >
            <span>{type.name}</span>
          </label>
        ))}
      </div>

      {/* Horizontal scrollable events list */}
      <div className="flex-col  md:flex-row flex-wrap  md:flex overflow-x-auto md:pl-0 pl-10 items-center justify-between w-full py-4 element-with-scrollbar">
        {searchedEvents && searchedEvents.length !== 0 ? (
          searchedEvents
            .slice(0, visibleEventsCount)
            .map((event: any, index: number) => (
              <div
                onClick={() => router.push(`/events/details/${event._id}`)}
                key={index}
                className="md:m-0 ml-20 lg:w-[23%] w-[270px]  h-[400px] flex-shrink-0 bg-white rounded-lg overflow-hidden"
              >
                <Image
                  alt="event-img"
                  className="lg:w-full  md:h-[187px] md:w-full max-h-[187px] w-[270px] object-cover"
                  src={
                    event.eventImages
                      ? `${process.env.NEXT_PUBLIC_SERVER_URL}event/image/${event.eventImages[0]}`
                      : "https://via.placeholder.com/300x200"
                  }
                  width={500}
                  height={300}
                  quality={75}
                />
                <div className="py-4">
                  <div className="flex w-full overflow-scroll element-with-scrollbar">
                    <p className="whitespace-nowrap bg-[#206FDF1A] rounded-2xl text-mainBlue poppins-medium text-[12px] py-2 px-2">
                      {event?.Categorie[0]}
                    </p>
                  </div>
                  <h3 className="text-xl poppins-semibold text-ellipsis text-[16px] line-clamp-3 text-titles">
                    {event?.eventAcronym && <>{event.eventAcronym} - </>}
                    {event?.eventName}
                  </h3>
                  <p className="text-gray-600 flex flex-row items-center">
                    {event.location?.address?.commercial ? (
                      <>
                        <img
                          alt="location-icon"
                          src="/icons/LocationGray.png"
                        />
                        {event.location?.address?.commercial}
                      </>
                    ) : (
                      event.location?.address?.state && (
                        <>
                          <img
                            alt="location-icon"
                            src="/icons/LocationGray.png"
                          />
                          {event.location?.address?.state}
                        </>
                      )
                    )}
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
          <div className="w-full p-4 text-gray-400 poppins-regular">
            Aucun événement à afficher
          </div>
        )}
      </div>

      <div className="w-full flex justify-center items-center">
        <button
          onClick={handleShowMore}
          className="mr-2 rounded-[10px] px-10 py-3 bg-mainBlue text-white text-center"
        >
          {t("button")}
        </button>
      </div>

      {(eventsByCategoryIsLoading || eventsByTypeIsLoading) && <Progress />}
    </div>
  );
}

export default NextEvent;
