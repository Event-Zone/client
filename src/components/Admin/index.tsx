import {
  useNewAdMutation,
  useSearchEventsQuery,
} from "@/store/features/api/apiSlice";
import { selectUser } from "@/store/features/userSlice";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Progress from "../shared/Progress";
import Events from "./Events";
import Ads from "./Ads";
import Message from "../shared/Message";
import EventCard from "./EventCard";
import { IEvent } from "@/types/Event";
import Users from "./Users";
import Image from "next/image";

function Admin() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [refetchHero, setRefetchHero] = useState(false);
  const user = useSelector(selectUser);
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState(0);

  const {
    data: fetchedEvents,
    error: fetchedEventsError,
    isLoading: fetchedEventsLoading,
  } = useSearchEventsQuery(
    { searchTerm: searchTerm as string },
    { skip: searchTerm === "" }
  );

  useEffect(() => {
    if (fetchedEvents) {
      console.log("Fetched events:", fetchedEvents);
      setSearchedEvents(fetchedEvents);
    }
  }, [fetchedEvents]);

  const [searchedEvents, setSearchedEvents] = useState<IEvent[]>([]);

  if (!user) return <Progress />;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);

    if (searchedEvents) setSearchedEvents(searchedEvents);
  };

  const [newAd, newAdResult] = useNewAdMutation();

  const handleAd = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("picture", e.target.files![0]);

    newAd(formData)
      .unwrap()
      .then((response) => {
        console.log("Ad created successfully:", response);
        if (status === 0) {
          setStatus(1);
        } else {
          setStatus(0);
        }
      })
      .catch((error) => {
        console.error("Error creating ad:", error);
      });
  };

  return (
    <div className="flex bg-[#1A202C] h-screen w-full">
      <div className="bg-[#001029] h-screen w-1/4 py-8">
        {showSidebar && (
          <div className="absolute overflow-y-scroll mt-[87px] top-0 right-0 w-[300px] h-full bg-[#2D3748] p-4 z-10">
            <h2 className="text-white mb-4">Add New Event</h2>
            <button
              onClick={() => setShowSidebar(false)}
              className="absolute top-1 right-1 text-white p-2 rounded"
            >
              X
            </button>
            <div className="bg-transparent flex flex-grow w-full rounded-[10px] border-gray-500 border overflow-hidden">
              <div className="relative w-full flex-grow">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <Image
                    src="/icons/Search.svg"
                    alt="Search Icon"
                    className="h-5 w-5 text-gray-500"
                    width={500} // Specify width
                    height={300} // Specify height
                    quality={75} // Adjust quality to improve performance (default is 75)
                    // placeholder="blur" // Optionally use a low-quality placeholder
                  />
                </span>
                <input
                  value={searchTerm as string}
                  onChange={handleSearch}
                  type="text"
                  placeholder="Search"
                  className="p-2 pl-10 w-full bg-transparent text-white outline-none focus:outline-none border-0"
                />
              </div>
            </div>
            {searchedEvents?.map((event: IEvent) => (
              <EventCard setRefetchHero={setRefetchHero} event={event} />
            ))}
          </div>
        )}
        <div className="flex justify-center items-center">
          <img src="/Frame 1 (1).png" alt="logo" />
        </div>
        <div className="bg-[#001029] px-3 flex flex-col items-center min-h-[300px] justify-around">
          <div
            onClick={() => setPage(0)}
            className={`flex w-full rounded-xl hover:bg-[#203F6F] p-3 ${
              page === 0 && "bg-[#203F6F]"
            }`}
          >
            <img src="/icons/category.png" alt="icon" className="mr-3" />
            <p className="poppins-medium text-blewishGrey hidden md:block">
              Dashboard
            </p>
          </div>
          <div
            onClick={() => setPage(1)}
            className={`flex w-full rounded-xl hover:bg-[#203F6F] p-3 ${
              page === 1 && "bg-[#203F6F]"
            }`}
          >
            <img src="/icons/document-normal.png" alt="icon" className="mr-3" />
            <p className="poppins-medium text-blewishGrey hidden md:block">
              Events
            </p>
          </div>
          <div
            onClick={() => setPage(2)}
            className={`flex w-full rounded-xl hover:bg-[#203F6F] p-3 ${
              page === 2 && "bg-[#203F6F]"
            }`}
          >
            <img src="/icons/video-octagon.png" alt="icon" className="mr-3" />
            <p className="poppins-medium text-blewishGrey hidden md:block">
              Media & Ads
            </p>
          </div>
          <div
            onClick={() => setPage(3)}
            className={`flex w-full rounded-xl hover:bg-[#203F6F] p-3 ${
              page === 3 && "bg-[#203F6F]"
            }`}
          >
            <img src="/icons/profile-2user.png" alt="icon" className="mr-3" />
            <p className="poppins-medium text-blewishGrey hidden md:block">
              Users Management
            </p>
          </div>
        </div>
      </div>
      <div className="w-full h-screen py-4">
        <div className="w-fit flex mb-6">
          <div className="mr-2">
            <img
              src="/icons/Profile.png"
              alt="profile icon"
              className="bg-[#364153] rounded-full p-2"
            />
          </div>
          <div>
            <p className="poppins-regular text-white">{user.fullname}</p>
            <p className="text-[#364153]">Admin</p>
          </div>
        </div>
        {page === 1 ? (
          <div className="mb-10">
            <div className="bg-[#2D3748] rounded-lg">
              <Events />
            </div>
          </div>
        ) : page === 2 ? (
          <div className="mb-10">
            <div
              onClick={() => {
                if (status === 0) setShowSidebar(true);
              }}
              className="flex-grow flex items-center justify-center border-2 border-dashed cursor-pointer border-mainBlue"
            >
              <img
                src="/icons/ph_plus-bold.png"
                alt="plusIcon"
                className="w-[20px] h-[20px]"
              />
              <button className="relative">
                {status === 1 && (
                  <input
                    type="file"
                    onChange={handleAd}
                    accept="image/*"
                    name="picture"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      opacity: 0,
                    }}
                  />
                )}
                New Ad
              </button>
            </div>
            <div className="bg-[#2D3748] rounded-lg">
              <Ads setStatus={setStatus} status={status} />
            </div>
          </div>
        ) : page === 3 ? (
          <div className="mb-10">
            <div className="bg-[#2D3748] rounded-lg">
              <Users />
            </div>
          </div>
        ) : (
          <>dashboard</>
        )}
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
