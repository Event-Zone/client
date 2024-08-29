"use client";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { selectToken, selectUser } from "@/store/features/userSlice";
import {
  useGetSubscriptionQuery,
  useSearchEventsQuery,
  useGetEventsQuery,
  useSearchEventsLocationsQuery,
} from "@/store/features/api/apiSlice";
import { useDispatch } from "react-redux";
import {
  resetSearchedEvents,
  selectInitialEvents,
  setInitialEvents,
  setSearchedEvents,
} from "@/store/features/eventSlice";

function Navbar() {
  const allInitEvents = useSelector(selectInitialEvents);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [locations, setLocations] = useState<any[] | null>([]);
  const [stateName, setStateName] = useState<string>("");
  useEffect(() => {
    if (searchTerm == "") {
      dispatch(setSearchedEvents(allInitEvents));
    }
  }, [searchTerm]);
  const isAuth = useSelector(selectToken);
  const user = useSelector(selectUser);

  const {
    data: fetchedSubscription,
    error,
    isLoading,
    refetch,
  } = useGetSubscriptionQuery(user?.subscription, { skip: !isAuth });
  const {
    data: searchedEvents,
    error: searchedEventsError,
    isLoading: searchedEventsLoading,
  } = useSearchEventsQuery(
    { searchTerm: searchTerm as string, stateName: stateName as string },
    {
      skip: searchTerm === "", // Skip the query if searchTerm is empty
    }
  );
  const {
    data: allEvents,
    error: allEventsError,
    isLoading: allEventsLoading,
    refetch: refetchAllEvents,
  } = useGetEventsQuery("approved");

  useEffect(() => {
    refetchAllEvents();
  }, []);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (searchedEvents) dispatch(setSearchedEvents(searchedEvents));
  };
  useEffect(() => {
    if (searchedEventsError) {
      alert("Error whule searching ");
    } else if (searchedEventsLoading) {
      console.log("Loading ...");
    } else if (searchedEvents) {
      dispatch(setSearchedEvents(searchedEvents));
    }
  }, [searchedEventsError, searchedEventsLoading, searchedEvents]);
  useEffect(() => {
    console.log(stateName);
  }, [stateName]);
  useEffect(() => {
    if (allEventsError) {
      alert("Error while all events ");
    } else if (allEventsLoading) {
      console.log("Loading ...");
    } else if (allEvents) {
      dispatch(setInitialEvents(allEvents));
    }
  }, [allEventsError, allEventsLoading, allEvents]);

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

  const router = useRouter();
  const pathname = usePathname();
  const isV1 = pathname === "/welcome" || "/tarification";

  const handlSearchClick = () => {
    if (pathname !== "search") {
      router.replace("/search");
    }
  };
  const handleStateClick = (e: any) => {
    setStateName(e.target.value);
  };
  return (
    // check The responsiveness bug
    <div
      className={`flex-wrap flex z-50 items-center justify-between p-4 text-white max-w-full sticky top-0 bg-white ${
        isV1 ? `border-b-gray-500 border-[1.5px]` : ""
      }`}
    >
      <div
        className="flex items-center ml-10 cursor-pointer"
        onClick={() => router.push("/")}
      >
        <img src="/NavbarLogo.svg" alt="Navbar Logo" className="" />
      </div>
      <div
        onClick={handlSearchClick}
        className="flex flex-grow mx-14 rounded-[10px] border-gray-500 border overflow-hidden"
      >
        <div className="relative flex-grow">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <img
              src="/icons/Search.svg"
              alt="Search Icon"
              className="h-5 w-5 text-gray-500"
            />
          </span>
          <input
            value={searchTerm as string}
            onChange={handleSearch}
            type="text"
            placeholder="Search"
            className="p-2 pl-10 w-full text-gray-700 outline-none focus:outline-none border-0"
          />
        </div>
        <div className="border-l border-gray-500"></div>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <img
              src="/icons/Location.svg"
              alt="Location Icon"
              className="h-5 w-5 text-gray-500"
            />
          </span>
          <select
            onChange={handleStateClick}
            className="p-2 pl-10 text-gray-500 focus:outline-none"
          >
            {locations?.map((state) => (
              <option value={state} className="text-gray-500" defaultChecked>
                {state}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-mainBlue p-2">
          <img
            src="/icons/Search.svg"
            alt="search-icon"
            className="text-white"
          />
        </div>
      </div>
      <div className="border-gray-500 mx-5">
        <div className="relative">
          <select className="p-2 pl-10 text-gray-500 focus:outline-none">
            <option value="en" className="text-gray-500" defaultChecked>
              English
            </option>
            <option value="fr" className="text-gray-500">
              French
            </option>
            <option value="ar" className="text-gray-500">
              Arabic
            </option>
          </select>
        </div>
      </div>
      {!isAuth ? (
        <div className="flex items-center">
          <button
            onClick={() => router.push("/auth/login")}
            className="px-10 py-2 text-mainBlue rounded-md"
          >
            Se connecter
          </button>
          <button
            onClick={() => router.push("/auth/register")}
            className="px-10 py-2 bg-mainBlue rounded-md"
          >
            S'inscrire
          </button>
        </div>
      ) : (
        <div className="flex items-center flex-row">
          <button
            onClick={() =>
              router.replace(
                `${
                  fetchedSubscription?.pack
                    ? `/events/create/${fetchedSubscription?.pack}`
                    : "/tarification"
                }`
              )
            }
            className=" mx-4 text-gray-500 poppins-medium text-center "
          >
            + Ajouter Evenement
          </button>
          <img
            onClick={() => router.push(`/profile/${user?._id}`)}
            alt="profile"
            className="rounded-full bg-gray-200   mr-2 w-[50px] h-[50px] cursor-pointer"
            src={
              user?.profilePicture
                ? `${process.env.NEXT_PUBLIC_SERVER_URL}event/image/${user.profilePicture}`
                : "/icons/Profile.png"
            }
          />
        </div>
      )}
    </div>
  );
}

export default Navbar;
