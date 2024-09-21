"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "@/navigation";
import { useSelector, useDispatch } from "react-redux";
import { selectToken, selectUser } from "@/store/features/userSlice";
import {
  useGetSubscriptionQuery,
  useSearchEventsQuery,
  useGetEventsQuery,
  useSearchEventsLocationsQuery,
} from "@/store/features/api/apiSlice";
import {
  resetSearchedEvents,
  selectInitialEvents,
  setInitialEvents,
  setSearchedEvents,
} from "@/store/features/eventSlice";
import Progress from "./Progress";
import { useTranslation } from "@/hooks/useTranslation";
import LocalSwitcher from "../LocalSwitcher";
import Ads from "../Search/Ads";
import { selectSubscription } from "@/store/features/subscriptionSlice";
function Navbar() {
  const [showSearchs, setShowSearchs] = useState<boolean>(false);
  const allInitEvents = useSelector(selectInitialEvents);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [locations, setLocations] = useState<any[] | null>([]);
  const [stateName, setStateName] = useState<string | undefined>(undefined);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);

  const isAuth = useSelector(selectToken);
  const user = useSelector(selectUser);
  const router = useRouter();
  const pathname = usePathname();
  const isV1 = pathname === "/welcome" || pathname === "/tarification";
  const fetchedSubscription = useSelector(selectSubscription);

  useEffect(() => {
    console.log("fetchedSubscriptionNav", fetchedSubscription);
  }, [fetchedSubscription, user]);
  const {
    data: searchedEvents,
    error: searchedEventsError,
    isLoading: searchedEventsLoading,
    refetch: refetchSearch,
  } = useSearchEventsQuery(
    { searchTerm, stateName },
    { skip: searchTerm?.length === 0 }
  );

  useEffect(() => {
    if (searchTerm === "") dispatch(setSearchedEvents(allInitEvents));
  }, [searchTerm]);
  useEffect(() => {
    console.log("searchedEvents", searchedEvents);
    dispatch(setSearchedEvents(searchedEvents));
    setShowSearchs(true);
    // if (searchedEvents) router.push("/search");
  }, [searchedEvents]);
  const {
    data: allEvents,
    error: allEventsError,
    isLoading: allEventsLoading,
    refetch: refetchAllEvents,
  } = useGetEventsQuery("approved");

  const {
    data: locationsFetched,
    isLoading: locationsIsLoading,
    isError: locationsIsError,
  } = useSearchEventsLocationsQuery();
  const { t, changeLanguage } = useTranslation();

  useEffect(() => {
    if (allEvents) dispatch(setInitialEvents(allEvents));
  }, [allEvents, allEventsError, allEventsLoading, dispatch]);

  useEffect(() => {
    if (locationsFetched) setLocations(locationsFetched);
  }, [locationsFetched, locationsIsLoading, locationsIsError]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (searchedEvents) {
      console.log("searched ");
      dispatch(setSearchedEvents(searchedEvents));
    }
  };
  const [inputLocation, setInputocation] = useState("");
  const [matchingLocations, setMatchingLocations] = useState<any>([]);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const handleStateSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputocation(e.target.value);
  };
  useEffect(() => {
    const matchingLocations = locations?.filter((location) =>
      location.toLowerCase().includes(inputLocation.toLowerCase())
    );
    setMatchingLocations(matchingLocations);

    // Do something with matchingLocations, such as setting state
    console.log(matchingLocations);
  }, [inputLocation, locations]); // Add 'locations' to the dependency array

  const handlSearchClick = () => {
    setSearchOpen((prev) => !prev);
  };

  const handleMenuToggle = () => {
    setMenuOpen((prev) => !prev);
  };

  const [canAdd, setCanAdd] = useState(false);
  useEffect(() => {
    switch (fetchedSubscription?.pack) {
      case "Business":
        setCanAdd(false);
        break;
      case "Starter":
        setCanAdd(user?.eventsIds?.length >= 1);
        break;
      case "Student":
        setCanAdd(user?.eventsIds?.length >= 5);
        break;
      default:
        setCanAdd(false);
        break;
    }
  }, [user, fetchedSubscription]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        // setCategorieSelectorVisible(false);
        setMenuOpen(false);
        setMatchingLocations(false);
      }
    };

    if (true) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="border-b-[1px] border-[#BCC6CE] ">
      {/* Search Input for Small Screens */}
      {searchOpen && (
        <div
          onClick={() => setShowSearchs((prev) => !prev)}
          className=" md:hidden md:mt-0 mt-[56px]  lg:hidden z-50 absolute w-screen h-screen bg-white p-2 flex flex-col   "
        >
          <div className="h-[380px]">
            <Ads />
          </div>
          <div className="flex-grow flex flex-col ">
            {" "}
            <div className="flex items-center border-[1.4px] border-gray-200 mb-1 rounded-md">
              {" "}
              <img
                onClick={() => {
                  setSearchOpen(false);

                  router.push("/search");
                }}
                src={"/icons/Search.svg"}
                className="w-[20px] h-[20px] ml-2 "
              />
              <input
                value={searchTerm}
                onChange={handleSearch}
                type="text"
                placeholder="Rechercher des événements"
                className="p-2 pl-8 text-gray-500 focus:outline-none w-full bg-transparent"
              />
              <div className="absolute w-fit top-14   bg-white"></div>{" "}
            </div>
            <div className="relative lg:w-[70px] z-10 border-[1.4px] rounded-md border-gray-200">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <img
                  src="/icons/Location.svg"
                  alt="Location Icon"
                  className="h-5 w-5 text-gray-500"
                />
              </span>
              <input
                onClick={() => {
                  setStateName("");
                  setShowSearch(!showSearch);
                }}
                onChange={handleStateSearch}
                className="p-2 pl-8 text-gray-500 focus:outline-none w-full bg-transparent"
                value={stateName !== "" ? stateName : inputLocation}
              />
              <div className="absolute  z-50 bg-white">
                <div className="relative w-fit">
                  {matchingLocations &&
                    showSearch &&
                    matchingLocations.map((state: string) => (
                      <div
                        ref={dropdownRef}
                        key={state}
                        onClick={() => {
                          setStateName(state);
                          setShowSearch(false);
                        }}
                        className="text-gray-500   pippins-regular px-4 py-1 hover:bg-mainBlue bg-opacity-5"
                      >
                        {state}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div
        className={`flex items-center justify-between p-4 text-white max-w-full sticky top-0 bg-white z-50 ${
          isV1 ? "border-b-gray-500 border-[1.5px]" : ""
        }`}
      >
        {searchedEventsLoading && <Progress />}
        {/* Logo */}

        <div
          className="flex items-center cursor-pointer"
          onClick={() => router.push("/")}
        >
          <img
            src="/images/footerLogo.png"
            alt="Navbar Logo"
            className="max-w-[160px]"
          />
        </div>

        {/* Mobile Menu Icon */}

        {/* Desktop Search and Menu */}
        <div
          onClick={() => setShowSearchs((prev) => !prev)}
          className=" element-with-scrollbar  hidden md:flex flex-grow items-center max-w-[550px] rounded-[10px] border-gray-500 border "
        >
          <div className="ml-2 relative flex-grow">
            <div className="flex items-center ">
              {" "}
              <img
                src={"/icons/Search.svg"}
                className="w-[20px] h-[20px] ml-2 mr-2"
              />
              <input
                value={searchTerm}
                onChange={handleSearch}
                type="text"
                placeholder="Rechercher des événements"
                className="p-2 pl-4 w-full text-gray-700 poppins-regular outline-none focus:outline-none border-0"
              />
              <div className="absolute w-fit top-14   bg-white">
                <div className="relative w-fit z-50">
                  {searchedEvents &&
                    showSearchs &&
                    searchedEvents.map((event: any) => (
                      <div
                        ref={dropdownRef}
                        key={event?._id}
                        onClick={() => {
                          router.push("/search");
                        }}
                        className="text-gray-500   pippins-regular px-4 py-1 hover:bg-mainBlue bg-opacity-5"
                      >
                        {event.eventAcronym}
                        {" - "}
                        {event.eventName}
                      </div>
                    ))}
                </div>
              </div>{" "}
            </div>
          </div>
          <div className="border-l border-[.1] h-[28px] border-gray-700 rounded-3xl"></div>

          <div className="relative sm:w-1/4 z-10">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <img
                src="/icons/Location.svg"
                alt="Location Icon"
                className="h-5 w-5 text-gray-500"
              />
            </span>
            <input
              onClick={() => {
                setStateName("");
                setShowSearch(!showSearch);
              }}
              onChange={handleStateSearch}
              className="md:w-full  pl-8 text-gray-500 focus:outline-none"
              value={stateName !== "" ? stateName : inputLocation}
            />
            <div className="absolute  z-50 bg-white">
              <div className="relative w-fit">
                {matchingLocations &&
                  showSearch &&
                  matchingLocations.map((state: string) => (
                    <div
                      ref={dropdownRef}
                      key={state}
                      onClick={() => {
                        setStateName(state);
                        setShowSearch(false);
                      }}
                      className="text-gray-500   pippins-regular px-4 py-1 hover:bg-mainBlue bg-opacity-5"
                    >
                      {state}
                    </div>
                  ))}{" "}
              </div>
            </div>
          </div>
          <span
            onClick={() => router.push("/search")}
            className="z-50 h-[40px] rounded-r-lg overflow-hidden flex items-center pl-2 pr-2 bg-mainBlue"
          >
            <img
              src="/icons/Search.svg"
              alt="Search Icon"
              className="h-5 w-5 text-gray-500"
            />
          </span>
        </div>
        <div className="lg:hidden flex items-center">
          {
            <div
              className="md:hidden flex w-[100px] "
              onClick={handlSearchClick}
            >
              <img
                src="/icons/Search.svg"
                alt="Search"
                className="mr-2 w-[18px] h-[18px]"
              />
            </div>
          }
          <img
            src="/icons/menu.png"
            alt="Menu Icon"
            className="cursor-pointer"
            onClick={handleMenuToggle}
          />
          {/* Search Icon for Small Screens */}
        </div>

        {/* Language and Authentication/Profile for Desktop */}
        <div className="hidden lg:flex items-center">
          <div className="border-gray-500 mx-5">
            <div className="relative">
              <LocalSwitcher />
            </div>
          </div>

          {/* Authentication and Profile */}
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
            <div className="flex items-center">
              <button
                onClick={() => {
                  if (canAdd) {
                    router.replace(`/profile/${user?._id}`);
                  } else
                    router.replace(
                      fetchedSubscription?.pack
                        ? `/events/create/${fetchedSubscription?.pack}`
                        : "/tarification"
                    );
                }}
                className="mx-4 text-gray-500 poppins-medium text-center"
              >
                + Ajouter Evenement
              </button>
              <img
                onClick={() => router.push(`/profile/${user?._id}`)}
                alt="profile"
                className="rounded-full bg-gray-200 mr-2 w-[50px] h-[50px] cursor-pointer"
                src={
                  user?.profilePicture
                    ? `${process.env.NEXT_PUBLIC_SERVER_URL}event/image/${user.profilePicture}`
                    : "/icons/Profile.png"
                }
              />
            </div>
          )}
        </div>

        {/* Mobile Menu Dropdown */}
        {menuOpen && !searchOpen && (
          <div
            ref={dropdownRef}
            className="lg:hidden absolute top-[5px] right-0 bg-white border border-gray-300 rounded-md shadow-lg z-10"
          >
            <ul className="py-1">
              {!isAuth ? (
                <>
                  <li>
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        router.push("/auth/login");
                      }}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Se connecter
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        setMenuOpen(false);

                        router.push("/auth/register");
                      }}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      S'inscrire
                    </button>
                  </li>
                </>
              ) : (
                <div className="lg:hidden absolute top-[60px] right-0 bg-white border border-gray-300 rounded-md shadow-lg z-50">
                  <div className="flex flex-col items-start p-4">
                    {/* Search Icon */}

                    {/* Language Selection */}
                    <div className="w-full mb-2">
                      <div className="relative">
                        <LocalSwitcher />
                      </div>
                    </div>

                    {/* Authentication and Profile */}
                    {!isAuth ? (
                      <div className="flex flex-col w-full">
                        <button
                          onClick={() => router.push("/auth/login")}
                          className="py-2 text-mainBlue rounded-md"
                        >
                          Se connecter
                        </button>
                        <button
                          onClick={() => router.push("/auth/register")}
                          className="py-2 bg-mainBlue rounded-md"
                        >
                          S'inscrire
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-start w-full">
                        <button
                          onClick={() => {
                            if (canAdd) {
                              router.replace(`/profile/${user?._id}`);
                            } else
                              router.replace(
                                fetchedSubscription?.pack
                                  ? `/events/create/${fetchedSubscription?.pack}`
                                  : "/tarification"
                              );
                          }}
                          className="text-gray-500 poppins-medium text-left mb-2"
                        >
                          + Ajouter Evenement
                        </button>
                        <div className="flex items-center">
                          <img
                            onClick={() => router.push(`/profile/${user?._id}`)}
                            alt="profile"
                            className="rounded-full bg-gray-200 mr-2 w-[50px] h-[50px] cursor-pointer"
                            src={
                              user?.profilePicture
                                ? `${process.env.NEXT_PUBLIC_SERVER_URL}event/image/${user.profilePicture}`
                                : "/icons/Profile.png"
                            }
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </ul>
          </div>
        )}
        {searchedEventsLoading && <Progress />}
      </div>{" "}
    </div>
  );
}

export default Navbar;
