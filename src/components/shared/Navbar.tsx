"use client";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
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

function Navbar() {
  const allInitEvents = useSelector(selectInitialEvents);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [locations, setLocations] = useState<any[] | null>([]);
  const [stateName, setStateName] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);

  const isAuth = useSelector(selectToken);
  const user = useSelector(selectUser);

  const router = useRouter();
  const pathname = usePathname();
  const isV1 = pathname === "/welcome" || pathname === "/tarification";

  const { data: fetchedSubscription } = useGetSubscriptionQuery(
    user?.subscription,
    { skip: !isAuth }
  );

  const {
    data: searchedEvents,
    error: searchedEventsError,
    isLoading: searchedEventsLoading,
  } = useSearchEventsQuery(
    { searchTerm, stateName },
    { skip: searchTerm === "" }
  );

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

  useEffect(() => {
    if (allEvents) dispatch(setInitialEvents(allEvents));
  }, [allEvents, allEventsError, allEventsLoading, dispatch]);

  useEffect(() => {
    if (locationsFetched) setLocations(locationsFetched);
  }, [locationsFetched, locationsIsLoading, locationsIsError]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (searchedEvents) dispatch(setSearchedEvents(searchedEvents));
  };

  const handleStateClick = (e: any) => {
    setStateName(e.target.value);
  };

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

  return (
    <div
      className={`flex items-center justify-between p-4 text-white max-w-full sticky top-0 bg-white z-50 ${
        isV1 ? "border-b-gray-500 border-[1.5px]" : ""
      }`}
    >
      {/* Logo */}
      {!searchOpen && (
        <div
          className="flex items-center cursor-pointer"
          onClick={() => router.push("/")}
        >
          <img src="/NavbarLogo.svg" alt="Navbar Logo" />
        </div>
      )}

      {/* Search Input for Small Screens */}
      {searchOpen && (
        <div
          onClick={() => router.push("/search")}
          className="flex items-center w-[90%] mx-auto"
        >
          <div className="relative flex-grow">
            <input
              value={searchTerm}
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
                <option key={state} value={state} className="text-gray-500">
                  {state}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Search Icon for Small Screens */}
      {
        <div
          className="lg:hidden flex w-[100px] mb-2"
          onClick={handlSearchClick}
        >
          <img src="/icons/Search.svg" alt="Search" className="mr-2" />
          <span>Search</span>
        </div>
      }

      {/* Mobile Menu Icon */}
      <div className="lg:hidden flex items-center">
        <img
          src="/icons/menu.png"
          alt="Menu Icon"
          className="cursor-pointer"
          onClick={handleMenuToggle}
        />
      </div>

      {/* Desktop Search and Menu */}
      <div
        onClick={() => router.push("/search")}
        className="hidden lg:flex flex-grow items-center mx-14 rounded-[10px] border-gray-500 border overflow-hidden"
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
            value={searchTerm}
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
              <option key={state} value={state} className="text-gray-500">
                {state}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Language and Authentication/Profile for Desktop */}
      <div className="hidden lg:flex items-center">
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
        <div className="lg:hidden absolute top-[5px] right-0 bg-white border border-gray-300 rounded-md shadow-lg z-10">
          <ul className="py-1">
            {!isAuth ? (
              <>
                <li>
                  <button
                    onClick={() => router.push("/auth/login")}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Se connecter
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => router.push("/auth/register")}
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
                    <select className="w-full p-2 text-gray-500 focus:outline-none">
                      <option
                        value="en"
                        className="text-gray-500"
                        defaultChecked
                      >
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
    </div>
  );
}

export default Navbar;
