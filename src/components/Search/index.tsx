"use client";
import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  useSearchEventsByLocationQuery,
  useSearchEventsByMonthQuery,
  useSearchEventsByDateRangeQuery,
  useSearchEventsByTypeQuery,
  useGetSearchPageAddsQuery,
  useGetEventsQuery,
  useSearchEventsLocationsQuery,
  useSearchEventsByCategorieQuery,
  useGetCategoriesQuery,
  useGetTypesQuery,
} from "@/store/features/api/apiSlice";
import EventCard from "./EventCard";
import Calendar from "../shared/Calendar";
import {
  selectInitialEvents,
  selectSearchedEvents,
  setSearchedEvents,
} from "@/store/features/eventSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Locations from "../shared/Locations";
import Ads from "./Ads";
import Progress from "../shared/Progress";
import { useTranslations } from "next-intl";
import { selectlocation, setlocation } from "@/store/features/locationSlice";
import NextEventCard from "../Home/NextEventCard";
import { useRouter } from "@/navigation";

function Search({ initEvents = [] }: { initEvents: any[] | null }) {
  const dispatch = useDispatch();
  const locationHeader = useSelector(selectlocation);
  const [tmpLocation, setTmpLocation] = useState<string | null>(null);
  useEffect(() => {
    if (locationHeader) setTmpLocation(locationHeader);
    dispatch(setlocation(null));
  }, [locationHeader]);
  const {
    data: CategoriesList,
    isLoading: CategoriesLoading,
    error: CategoriesError,
  } = useGetCategoriesQuery();
  const allEvents = useSelector(selectInitialEvents);
  const seachedEvents = useSelector(selectSearchedEvents);

  const [isTypeSelectorVisible, setTypeSelectorVisible] = useState(false);
  const [isCategorieSelectorVisible, setCategorieSelectorVisible] =
    useState(false);
  const [isLocationSelectorVisible, setIsLocationSelectorVisible] =
    useState(false);
  const [typeTerminer, setTypeTerminer] = useState(false);
  const [categorieTerminer, setCategorieTerminer] = useState(false);
  const [LocationTerminer, setLocationTerminer] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<
    string | undefined | 0
  >();

  const [events, setEvents] = useState<any[] | null>([]);
  const router = useRouter();
  useEffect(() => {
    setEvents(seachedEvents);
    console.log("seachedEvents", seachedEvents);
  }, [seachedEvents]);
  // useEffect(() => {
  //   if (initEvents)
  //     if (initEvents?.length >= 1) setEvents(initEvents);
  //     else setEvents([]);
  // }, [initEvents]);

  const [adds, setAdds] = useState<any[] | null>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [selectionType, setSelectionType] = useState<"month" | "range">(
    "month"
  );
  const [type, setType] = useState<string[] | undefined | 0>([]);
  const [categorie, setCategorie] = useState<string[] | undefined | 0>([]);

  // Fetch the adds

  const {
    data: AddsFetched,
    isLoading: AddsIsLoading,
    isError: AddsIsError,
  } = useGetSearchPageAddsQuery();

  useEffect(() => {
    if (AddsIsLoading) {
      console.log("Loading  AddsIsLoading...");
    } else if (AddsIsError) {
      alert("Error fetching AddsIsError : " + AddsIsError);
    } else if (AddsFetched) {
      setAdds(AddsFetched);
    }
  }, [AddsIsLoading, AddsIsError, AddsFetched]);
  // Fetch data using the queries

  const {
    data: eventsByMonth,
    isLoading: eventByMonthIsLoading,
    isError: EventByMonthIsError,
  } = useSearchEventsByMonthQuery(
    {
      month: startDate && startDate.getMonth() + 1,
      year: startDate && startDate.getFullYear(),
    },
    {
      skip: !startDate,
    }
  );
  useEffect(() => {
    if (eventByMonthIsLoading) {
      console.log("Loading events by month...");
    } else if (EventByMonthIsError) {
      alert("Error fetching events by month: " + EventByMonthIsError);
    } else if (eventsByMonth) {
      setEvents(eventsByMonth);
    }
  }, [eventByMonthIsLoading, EventByMonthIsError, eventsByMonth]);
  useEffect(() => {
    if (eventByMonthIsLoading) {
      console.log("Loading events by month...");
    } else if (EventByMonthIsError) {
      alert("Error fetching events by month: " + EventByMonthIsError);
    } else if (eventsByMonth) {
      setEvents(eventsByMonth);
    }
  }, [eventByMonthIsLoading, EventByMonthIsError, eventsByMonth]);

  const {
    data: eventsByDateRange,
    isError: eventBuDateRangeError,
    isLoading: eventByDateRangeIsLoading,
  } = useSearchEventsByDateRangeQuery(
    {
      startDate: startDate && startDate!.toISOString(),

      endDate: endDate && endDate!.toISOString(),
    },
    { skip: !startDate || !endDate }
  );
  useEffect(() => {
    if (eventByDateRangeIsLoading) {
      console.log("Loading events by date range...");
    } else if (eventBuDateRangeError) {
      alert("Error fetching events by date range: " + eventBuDateRangeError);
    } else if (eventsByDateRange) {
      setEvents(eventsByDateRange);
    }
  }, [eventByDateRangeIsLoading, eventBuDateRangeError, eventsByDateRange]);
  const {
    data: eventsByType,
    isLoading: eventsByTypeIsLoading,
    isError: eventsByTypeIsError,
  } = useSearchEventsByTypeQuery(type as string[], {
    skip: (type as string[])?.length === 0 || !typeTerminer,
  });
  useEffect(() => {
    if (eventsByTypeIsLoading) {
      console.log("Loading events by type...");
    } else if (eventsByTypeIsError) {
      alert("Error fetching events by type: " + eventsByTypeIsError);
    } else if (eventsByType) {
      setEvents(eventsByType);
      setTypeSelectorVisible(false);
      setTypeTerminer(false);
    }
  }, [eventsByTypeIsLoading, eventsByTypeIsError, eventsByType]);
  const {
    data: eventsByCategorie,
    isLoading: eventsByCategorieIsLoading,
    isError: eventsByCategorieIsError,
  } = useSearchEventsByCategorieQuery(categorie as string[], {
    skip: (categorie as string[])?.length === 0 || !categorieTerminer,
  });
  useEffect(() => {
    if (eventsByCategorieIsLoading) {
      console.log("Loading events by Categorie...");
    } else if (eventsByCategorieIsError) {
      alert("Error fetching events by Categorie: " + eventsByCategorieIsError);
    } else if (eventsByCategorie) {
      console.log("Fetched events by Categorie:", eventsByCategorie);
      setEvents(eventsByCategorie);

      setCategorieTerminer(false);
      setCategorieSelectorVisible(false);
      // setInitEvents(eventsByCategorie);
    }
  }, [eventsByCategorieIsLoading, eventsByCategorieIsError, eventsByCategorie]);
  // Handler functions

  const toggleDialog = () => {
    setShowDialog(!showDialog);

    setIsLocationSelectorVisible(false);
    setCategorieSelectorVisible(false);
    setTypeSelectorVisible(false);
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    let updatedTypes = [...(type as string[])];

    if (updatedTypes.includes(value)) {
      updatedTypes = updatedTypes.filter((item) => item !== value);
    } else {
      updatedTypes.push(value);
    }

    setType(updatedTypes);
    // setLocation(0);
  };
  const handleCategorieChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    let updatedCategorie = [...(categorie as string[])];

    if (updatedCategorie.includes(value)) {
      updatedCategorie = updatedCategorie.filter((item) => item !== value);
    } else {
      updatedCategorie.push(value);
    }

    setCategorie(updatedCategorie);
    // setLocation(0);
  };

  useEffect(() => {
    console.log(categorie);
  }, [categorie]);
  useEffect(() => {
    console.log("selectedLocation: ", selectedLocation);
  }, [selectedLocation]);
  const {
    data: types,
    isLoading: typesLoading,
    error: typesError,
    refetch: refetchTypes,
  } = useGetTypesQuery();
  const t = useTranslations("Search");
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setCategorieSelectorVisible(false);
        setTypeSelectorVisible(false);
        setShowDialog(false);
        setIsLocationSelectorVisible(false);
      }
    };

    if (
      isCategorieSelectorVisible ||
      isTypeSelectorVisible ||
      isLocationSelectorVisible ||
      showDialog
    ) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [
    isCategorieSelectorVisible,
    isTypeSelectorVisible,
    isLocationSelectorVisible,

    showDialog,
  ]);

  return (
    <div className="relative p-1 md:px-20 ">
      <div className="max-w-full h-fit">
        {tmpLocation && (
          <p className="poppins-semibold text-[24px] my-4 text-titles">
            {t("header")}
            <span className="text-mainBlue">{tmpLocation}</span>
          </p>
        )}
        <div
          ref={dropdownRef}
          className="flex mt-5 overflow-scroll element-with-scrollbar  justify-around lg:w-[700px] w-full md:w-[88%]"
        >
          <button
            className=" poppins-regular bg-gray-200 whitespace-nowrap mr-[5px] text-gray-500  px-4 md:py-2 rounded-md mb-2"
            onClick={() => {
              setIsLocationSelectorVisible(false);
              setShowDialog(false);
              setCategorieSelectorVisible(false);
              setTypeSelectorVisible(!isTypeSelectorVisible);
            }}
          >
            {t("type")}
            <select
              disabled
              className="bg-transparent border-0 outline-none"
            ></select>
          </button>
          {isTypeSelectorVisible && (
            <div
              ref={dropdownRef}
              className="bg-gray-50 p-4 whitespace-nowrap mr-[5px]  rounded-md shadow-md z-30 absolute left-4"
            >
              <p className="poppins-semibold text-gray-700 mb-2">{t("type")}</p>
              <div className="flex flex-col space-y-2">
                {types?.map((Type: any) => (
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={Type?.name}
                      checked={(type as string[])?.includes(Type?.name)}
                      onChange={handleTypeChange}
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                    <span>{Type?.name}</span>
                  </label>
                ))}
              </div>
              {/* Add your filter and cancel buttons */}
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => {
                    setTypeSelectorVisible(false);
                  }}
                  className="text-red-500"
                >
                  {" "}
                  {t("Annuler")}
                </button>
                <button
                  onClick={() => {
                    setTypeTerminer(true);
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  {t("Filtrer")}
                </button>
              </div>
            </div>
          )}

          {/* Trigger for the date picker dialog */}
          <div
            onClick={toggleDialog}
            className=" poppins-regular whitespace-nowrap mr-[5px]  bg-gray-200 text-gray-500  px-4 py-2 rounded-md mb-2"
          >
            {" "}
            {t("date")}
            <select
              disabled
              className="bg-transparent border-0 outline-none"
            ></select>
          </div>
          <div
            onClick={() => {
              setIsLocationSelectorVisible(true);
              setShowDialog(false);

              setCategorieSelectorVisible(false);
              setTypeSelectorVisible(false);
            }}
            className=" poppins-regular whitespace-nowrap mr-[5px]  bg-gray-200 text-gray-500  px-4 py-2 rounded-md mb-2"
          >
            {t("place")}{" "}
            <select
              disabled
              className="bg-transparent border-0 outline-none"
            ></select>
          </div>
          <div className="flex flex-wrap justify-between w-fit ">
            <button
              className=" poppins-regular whitespace-nowrap mr-[5px]  bg-gray-200 text-gray-500  px-4 py-2 rounded-md mb-2"
              onClick={() => {
                setIsLocationSelectorVisible(false);
                setShowDialog(false);

                setTypeSelectorVisible(false);
                setCategorieSelectorVisible(!isTypeSelectorVisible);
              }}
            >
              {t("category")}{" "}
              <select
                disabled
                className="bg-transparent border-0 outline-none"
              ></select>
            </button>
            {isCategorieSelectorVisible && (
              <div
                ref={dropdownRef}
                className="p-4  rounded-md shadow-md z-30 absolute bg-gray-50 "
              >
                <div className="flex flex-col space-y-2 h-[400px] overflow-scroll element-with-scrollbar ">
                  {CategoriesList?.map((category: any) => (
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        value={category.name}
                        checked={(categorie as string[])?.includes(
                          category.name
                        )}
                        onChange={handleCategorieChange}
                        className="form-checkbox h-4 w-4 text-blue-600"
                      />
                      <span>{category.name}</span>
                    </label>
                  ))}
                </div>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => {
                      setCategorieSelectorVisible(false);
                    }}
                    className="text-red-500"
                  >
                    {" "}
                    {t("Annuler")}
                  </button>
                  <button
                    onClick={() => {
                      setCategorieTerminer(true);
                    }}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  >
                    {t("Filtrer")}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Dialog */}
      {showDialog && (
        <div ref={dropdownRef}>
          <Calendar setShowDialog={setShowDialog} />
        </div>
      )}
      {isLocationSelectorVisible && (
        <div ref={dropdownRef}>
          <Locations setShowDialog={setIsLocationSelectorVisible} />
        </div>
      )}

      {/* Display Results */}
      <div className="hidden md:flex">
        <div className="mt-4">
          {events && events?.length > 0 ? (
            events.map((event) => <EventCard key={event._id} event={event} />)
          ) : (
            <p className="poppins-medium"> {t("noEvents")}</p>
          )}
        </div>
      </div>
      {/* small screen */}
      <div className=" md:hidden flex">
        <div className="mt-4">
          {events && events?.length > 0 ? (
            events.map((event: any, index: number) => (
              <div
                onClick={() => router.push(`/events/details/${event._id}`)}
                key={index}
                className="md:mb-0 mb-3 md:border-0 border-[1.3px] border-gray-300 md:m-0 pb-1  lg:w-[23%] w-full h-fit  md:h-[460px] flex-shrink-0 bg-white rounded-lg overflow-hidden"
              >
                <NextEventCard event={event} />
              </div>
            ))
          ) : (
            <p className="poppins-medium"> {t("noEvents")}</p>
          )}
        </div>
      </div>
      {(CategoriesLoading || typesLoading) && <Progress />}
    </div>
  );
}

export default Search;
