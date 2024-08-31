"use client";

import { selectUser } from "@/store/features/userSlice";
import { useSearchEventsQuery } from "@/store/features/api/apiSlice"; // Assuming you have this API hook
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Progress from "../shared/Progress";
import Events from "./Events";
import Ads from "./Ads";
import Message from "../shared/Message";
import { selectInitialEvents } from "@/store/features/eventSlice";
import EventCard from "./EventCard";
import { IEvent } from "@/types/Event";
import Users from "./Users";

function Admin() {
  const [showSidebar, setShowSidebar] = useState(false); // New state for sidebar visibility
  const [refetchHero, setRefetchHero] = useState(false); // New state for sidebar visibility
  const initialEvents = useSelector(selectInitialEvents);
  const user = useSelector(selectUser);
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState<string>("");
  useEffect(() => {
    setSearchedEvents(initialEvents);
  }, []);
  const {
    data: fetchedEvents,
    error: fetchedEventsError,
    isLoading: fetchedEventsLoading,
  } = useSearchEventsQuery(
    { searchTerm: searchTerm as string },
    {
      skip: searchTerm === "", // Skip the query if searchTerm is empty
    }
  );
  useEffect(() => {
    if (fetchedEvents) {
      console.log("Fetched events", fetchedEvents);
      setSearchedEvents(fetchedEvents);
    }
  }, [fetchedEvents]);
  // Fetch events and users
  const [searchedEvents, setSearchedEvents] = useState<any>([]);
  if (!user) return <Progress />;
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);

    if (searchedEvents) setSearchedEvents(searchedEvents);
    if (searchTerm === "") setSearchedEvents(initialEvents);
  };

  return (
    <div className="flex bg-[#1A202C] h-screen w-full">
      <div className="bg-[#001029] h-screen w-1/4 py-8">
        {showSidebar && (
          <div className="absolute  overflow-y-scroll mt-[87px] top-0 right-0 w-[300px] h-full bg-[#2D3748] p-4 z-10">
            <h2 className="text-white mb-4 ">Add New Event</h2>
            {/* Add your form or content here */}
            <button
              onClick={() => setShowSidebar(false)} // Close sidebar
              className="absolute top-1 right-1 text-white p-2 rounded"
            >
              X
            </button>
            <div className="bg-transparent flex flex-grow w-full   rounded-[10px] border-gray-500 border overflow-hidden">
              <div className="relative w-full flex-grow">
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
                  className="p-2 pl-10 w-full bg-transparent  text-white outline-none focus:outline-none border-0"
                />
              </div>
            </div>
            {searchedEvents?.map((event: IEvent) => (
              <EventCard setRefetchHero={setRefetchHero} event={event} />
            ))}
          </div>
        )}
        {/* Sidebar */}
        <div className="flex justify-center items-center">
          <img alt="logo" src="/Frame 1 (1).png" />
        </div>
        <div className="bg-[#001029] px-3 flex flex-col items-center min-h-[300px] justify-around">
          <div
            onClick={() => setPage(0)}
            className={`flex w-full rounded-xl hover:bg-[#203F6F] p-3 ${
              page === 0 && "bg-[#203F6F]"
            }`}
          >
            <img alt="icon" src="/icons/category.png" className="mr-3" />
            <p className="poppins-medium text-blewishGrey">Dashboard</p>
          </div>
          <div
            onClick={() => setPage(1)}
            className={`flex w-full rounded-xl hover:bg-[#203F6F] p-3 ${
              page === 1 && "bg-[#203F6F]"
            }`}
          >
            <img alt="icon" src="/icons/document-normal.png" className="mr-3" />
            <p className="poppins-medium text-blewishGrey">Events</p>
          </div>
          <div
            onClick={() => setPage(2)}
            className={`flex w-full rounded-xl hover:bg-[#203F6F] p-3 ${
              page === 2 && "bg-[#203F6F]"
            }`}
          >
            <img alt="icon" src="/icons/video-octagon.png" className="mr-3" />
            <p className="poppins-medium text-blewishGrey">Media & Ads</p>
          </div>
          <div
            onClick={() => setPage(3)}
            className={`flex w-full rounded-xl hover:bg-[#203F6F] p-3 ${
              page === 3 && "bg-[#203F6F]"
            }`}
          >
            <img alt="icon" src="/icons/profile-2user.png" className="mr-3" />
            <p className="poppins-medium text-blewishGrey">Users Management</p>
          </div>
        </div>
      </div>

      <div className="w-full h-screen  py-4">
        {/* User Profile */}
        <div className="w-fit flex mb-6">
          <div className="mr-2">
            <img
              alt="profile icon"
              src="/icons/Profile.png"
              className="bg-[#364153] rounded-full p-2"
            />
          </div>
          <div>
            <p className="poppins-regular text-white">{user.fullname}</p>
            <p className="text-[#364153]">Admin</p>
          </div>
        </div>

        {/* Events Section */}
        {page === 1 ? (
          <div className="mb-10">
            <div className="bg-[#2D3748]  rounded-lg">
              <Events />
            </div>
          </div>
        ) : page === 2 ? (
          <div className="mb-10">
            <div
              onClick={() => setShowSidebar(true)} // Show the sidebar on click
              className="flex-grow flex items-center justify-center border-2 border-dashed cursor-pointer border-mainBlue"
            >
              <img
                alt="plusIcon"
                className="w-[20px] h-[20px]"
                src="/icons/ph_plus-bold.png"
              />
              <button>New Ad</button>
            </div>
            <div className=" bg-[#2D3748]  rounded-lg">
              <Ads refetchHero={refetchHero} />
            </div>
          </div>
        ) : page === 3 ? (
          <div className="mb-10">
            {/* Users Section */}

            <div className=" bg-[#2D3748]  rounded-lg">
              <Users />
            </div>
          </div>
        ) : null}
      </div>
      {fetchedEventsLoading && <Progress />}
      {fetchedEventsError && (
        <Message
          message={{ type: 0, content: "Error while fetching events" }}
        />
      )}
    </div>
  );
}

export default Admin;
