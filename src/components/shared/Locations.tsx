import {
  useSearchEventsByLocationQuery,
  useSearchEventsLocationsQuery,
} from "@/store/features/api/apiSlice";
import { setSearchedEvents } from "@/store/features/eventSlice";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function Locations({ setShowDialog }: { setShowDialog: Function }) {
  const t = useTranslations("Search");

  const dispatch = useDispatch();
  const [locations, setLocations] = useState<any[] | null>([]);
  const [searhedLocations, setSearhedLocations] = useState<any>([]);
  const [isFilter, setIsFilter] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const {
    data: eventsByLocation,
    isLoading: eventByLocationIsLoading,
    isError: eventByLocationIsError,
  } = useSearchEventsByLocationQuery(selectedLocations, {
    skip: !isFilter || selectedLocations.length === 0,
  });
  useEffect(() => {
    if (eventByLocationIsLoading) {
      console.log("Loading events by location...");
    } else if (eventByLocationIsError) {
      alert("Error fetching events by location: " + eventByLocationIsError);
    } else if (eventsByLocation && isFilter) {
      console.log("Fetched events by location: ", eventsByLocation);
      dispatch(setSearchedEvents(eventsByLocation));
      setIsFilter(false); // Only reset after dispatch
      setShowDialog(false); // Uncomment if you want to close dialog here
    }
  }, [
    eventByLocationIsLoading,
    eventByLocationIsError,
    eventsByLocation,
    isFilter,
  ]);

  const {
    data: locationsFetched,
    isLoading: locationsIsLoading,
    isError: locationsIsError,
  } = useSearchEventsLocationsQuery();

  useEffect(() => {
    if (locationsIsLoading) {
      console.log("Loading  locationsIsLoading...");
    } else if (locationsIsError) {
      alert("Error fetching locationsIsError : " + locationsIsError);
    } else if (locationsFetched) {
      console.log("Fetched locations: ", locationsFetched);
      setLocations(locationsFetched);
    }
  }, [locationsIsLoading, locationsIsError, locationsFetched]);

  const handleLocationClick = (location: any) => {
    if (selectedLocations.includes(location)) {
      setSelectedLocations(selectedLocations.filter((loc) => loc !== location));
    } else {
      setSelectedLocations([...selectedLocations, location]);
    }
  };
  const [searchedTerm, setSearchedTerm] = useState<string>("");
  const handleInputChange = (e: any) => {
    const { value } = e.target;
    setSearchedTerm(value);
  };
  useEffect(() => {
    console.log(searchedTerm);
    if (searchedTerm === "") {
      return setSearhedLocations(locations);
    }
    // Convert the search term to lowercase for a case-insensitive search
    const lowerCaseTerm = searchedTerm.toLowerCase();
    const tmp = locations?.filter((location: any) =>
      // Assuming 'location' has a 'name' property to search in
      location.toLowerCase().includes(lowerCaseTerm)
    );
    setSearhedLocations(tmp);
  }, [searchedTerm, locations]);

  return (
    <div className="z-30 shadow-md bg-gray-50 absolute w-full max-w-lg mx-auto p-4">
      <div className="flex flex-col md:flex-row md:justify-between ">
        <div className="w-fit">
          <p className="text-titles poppins-medium mb-2">
            Entrer l'empalcement
          </p>
          <div className="p-4 flex border-[1.4px] border-gray-300">
            {" "}
            <img alt="location-icon" src="/icons/Location.svg" />
            <input
              type="text"
              className="w-[90%] "
              placeholder="rechercher un lieu ou une address"
              value={searchedTerm}
              onChange={handleInputChange}
            />
          </div>
          <p className="text-titles poppins-medium my-2">Par Lieu</p>

          <div className="flex justify-around mt-4 mb-4">
            {searhedLocations?.map((location: string, i: number) => (
              <div
                key={i}
                onClick={() => handleLocationClick(location)}
                className={`min-w-[100px] h-[100px] mr-3 mb-3 flex-shrink-0 flex flex-col items-center justify-center border rounded-lg cursor-pointer
                  ${
                    selectedLocations.includes(location)
                      ? "bg-mainBlue text-white"
                      : "hover:bg-blue-300"
                  }`}
              >
                <img
                  alt="locationIcon"
                  src="/icons/mdi_calendar.png"
                  className="w-6 h-6 mb-1"
                />
                <p className="poppins-medium text-base">{location} </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => {
            setShowDialog(false);
            // setIsFilter(false);
          }}
          className="text-gray-500 poppins-regular"
        >
          {t("Annuler")}
        </button>
        <button
          onClick={() => setIsFilter(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center poppins-regular"
        >
          {t("Filtrer")} <span className="ml-2"></span>
        </button>
      </div>
    </div>
  );
}

export default Locations;
