"use client";
import React, { useEffect, useState } from "react";
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

function Search({ initEvents = [] }: { initEvents: any[] | null }) {
  const {
    data: CategoriesList,
    isLoading: CategoriesLoading,
    error: CategoriesError,
  } = useGetCategoriesQuery();
  const allEvents = useSelector(selectInitialEvents);
  const seachedEvents = useSelector(selectSearchedEvents);

  const dispatch = useDispatch();
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
  return (
    <div className="relative p-1 md:px-20 ">
      <div className="max-w-full h-fit">
        <div className="flex flex-wrap justify-between w-full">
          <button
            className=" poppins-regular bg-gray-200 text-gray-500  px-4 py-2 rounded-3xl mb-2"
            onClick={() => {
              setIsLocationSelectorVisible(false);
              setShowDialog(false);
              setCategorieSelectorVisible(false);
              setTypeSelectorVisible(!isTypeSelectorVisible);
            }}
          >
            Choose Type
          </button>
          {isTypeSelectorVisible && (
            <div className="bg-gray-50 p-4 rounded-md shadow-md z-30 absolute">
              <p className="poppins-semibold text-gray-700 mb-2">
                Type d'événement
              </p>
              <div className="flex flex-col space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value="salons & exposition"
                    checked={(type as string[])?.includes(
                      "salons & exposition"
                    )}
                    onChange={handleTypeChange}
                    className="form-checkbox h-4 w-4 text-blue-600"
                  />
                  <span>Salons & Exposition</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value="conference & exposition"
                    checked={(type as string[])?.includes(
                      "conference & exposition"
                    )}
                    onChange={handleTypeChange}
                    className="form-checkbox h-4 w-4 text-blue-600"
                  />
                  <span>Conference & Exposition</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value="conference"
                    checked={(type as string[])?.includes("conference")}
                    onChange={handleTypeChange}
                    className="form-checkbox h-4 w-4 text-blue-600"
                  />
                  <span>Conference</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value="workshop"
                    checked={(type as string[])?.includes("workshop")}
                    onChange={handleTypeChange}
                    className="form-checkbox h-4 w-4 text-blue-600"
                  />
                  <span>Workshop</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value="seminaires & ateliers"
                    checked={(type as string[])?.includes(
                      "seminaires & ateliers"
                    )}
                    onChange={handleTypeChange}
                    className="form-checkbox h-4 w-4 text-blue-600"
                  />
                  <span>Seminaires & Ateliers</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value="webinaires"
                    checked={(type as string[])?.includes("webinaires")}
                    onChange={handleTypeChange}
                    className="form-checkbox h-4 w-4 text-blue-600"
                  />
                  <span>Webinaires</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value="convention"
                    checked={(type as string[])?.includes("convention")}
                    onChange={handleTypeChange}
                    className="form-checkbox h-4 w-4 text-blue-600"
                  />
                  <span>Convention</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value="competition"
                    checked={(type as string[])?.includes("competition")}
                    onChange={handleTypeChange}
                    className="form-checkbox h-4 w-4 text-blue-600"
                  />
                  <span>Competition</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value="evenement de resautage"
                    checked={(type as string[])?.includes(
                      "evenement de resautage"
                    )}
                    onChange={handleTypeChange}
                    className="form-checkbox h-4 w-4 text-blue-600"
                  />
                  <span>Evenement De Resautage</span>
                </label>
                {/* Add more checkboxes as needed */}
              </div>
              {/* Add your filter and cancel buttons */}
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => {
                    setTypeSelectorVisible(false);
                  }}
                  className="text-red-500"
                >
                  Annuler
                </button>
                <button
                  onClick={() => {
                    setTypeTerminer(true);
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Filtrer
                </button>
              </div>
            </div>
          )}

          {/* Trigger for the date picker dialog */}
          <div
            onClick={toggleDialog}
            className=" poppins-regular bg-gray-200 text-gray-500  px-4 py-2 rounded-3xl mb-2"
          >
            N'import quand
          </div>
          <div
            onClick={() => {
              setIsLocationSelectorVisible(true);
              setShowDialog(false);

              setCategorieSelectorVisible(false);
              setTypeSelectorVisible(false);
            }}
            className=" poppins-regular bg-gray-200 text-gray-500  px-4 py-2 rounded-3xl mb-2"
          >
            N'import ou
          </div>
          <div className="flex flex-wrap justify-between w-fit ">
            <button
              className=" poppins-regular bg-gray-200 text-gray-500  px-4 py-2 rounded-3xl mb-2"
              onClick={() => {
                setIsLocationSelectorVisible(false);
                setShowDialog(false);

                setTypeSelectorVisible(false);
                setCategorieSelectorVisible(!isTypeSelectorVisible);
              }}
            >
              Choose Categorie
            </button>
            {isCategorieSelectorVisible && (
              <div className="p-4 rounded-md shadow-md z-30 absolute bg-gray-50 ">
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
                    Annuler
                  </button>
                  <button
                    onClick={() => {
                      setCategorieTerminer(true);
                    }}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  >
                    Filtrer
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Dialog */}
      {showDialog && <Calendar setShowDialog={setShowDialog} />}
      {isLocationSelectorVisible && (
        <Locations setShowDialog={setIsLocationSelectorVisible} />
      )}

      {/* Display Results */}
      <div className="flex">
        <div className="mt-4">
          {events && events?.length > 0 ? (
            events.map((event) => <EventCard key={event._id} event={event} />)
          ) : (
            <p className="poppins-medium">no events</p>
          )}
        </div>
      </div>
      {CategoriesLoading && <Progress />}
    </div>
  );
}

export default Search;
