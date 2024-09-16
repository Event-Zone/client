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
import NextEventCard from "./NextEventCard";

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
          className={`px-4 py-2 text-gray-500 text-center cursor-pointer whitespace-nowrap`}
          onClick={() => setCategory(["Tout"])}
        >
          <span
            className={` ${
              selectedCategory && selectedCategory[0] === "Tout"
                ? "border-b-[2px] border-b-mainBlue"
                : ""
            }`}
          >
            Tout
          </span>
        </label>

        {Categories?.map((category: any) => (
          <label
            key={category.name}
            className={`px-4 py-2 text-gray-500 text-center cursor-pointer whitespace-nowrap `}
            onClick={() => setCategory([category.name])}
          >
            <span
              className={`${
                selectedCategory && selectedCategory[0] === category.name
                  ? "border-b-[2px] border-b-mainBlue"
                  : ""
              }`}
            >
              {category.name}
            </span>
          </label>
        ))}

        {Types?.map((type: any) => (
          <label
            key={type.name}
            className={`px-4 py-2 text-gray-500 text-center cursor-pointer whitespace-nowrap `}
            onClick={() => setType([type.name])}
          >
            <span
              className={`${
                selectedType && selectedType[0] === type.name
                  ? "border-b-[2px] border-b-mainBlue"
                  : ""
              }`}
            >
              {type.name}
            </span>
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
                className="md:m-0 ml-20 lg:w-[23%] w-[270px]  h-[460px] flex-shrink-0 bg-white rounded-lg overflow-hidden"
              >
                <NextEventCard event={event} />
              </div>
            ))
        ) : (
          <div className="w-full p-4 text-gray-400 poppins-regular">
            Aucun événement à afficher
          </div>
        )}
      </div>

      <div
        className={`"w-full flex justify-center items-center" ${
          searchedEvents?.length <= visibleEventsCount && "hidden"
        }`}
      >
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
