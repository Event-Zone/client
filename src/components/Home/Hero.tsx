"use client";
import React, { useEffect, useState } from "react";
import {
  useGetHeroAddsQuery,
  useGetEventAddQuery,
} from "@/store/features/api/apiSlice";
import { useRouter } from "next/navigation";
import { isArray } from "util";
const Hero = () => {
  const router = useRouter();
  const [adds, setAdds] = useState<string[]>([]);
  const [eventAdds, setEventAdds] = useState<any[]>([]);
  const {
    data: fetchedEventAdds,
    error: eventAddsError,
    isLoading: eventAddsIsLoading,
  } = useGetEventAddQuery(adds, {
    skip: adds.length === 0,
  });
  const {
    data: fetchedAdds,
    error: addsError,
    isLoading: addsIsLoading,
    refetch,
  } = useGetHeroAddsQuery();
  useEffect(() => {
    console.log(eventAdds, adds);
  }, [adds, eventAdds]);
  useEffect(() => {
    if (addsIsLoading) {
      console.log("Loading events H...");
    } else if (addsError) {
      console.error("Error  fetchedAddsH:", addsError);
    } else if (fetchedAdds) {
      setAdds(
        fetchedAdds
          .filter((ad: any) => ad.status === "running")
          .map((add: any, index: number) => {
            return add.eventId;
          })
      );
    }
  }, [fetchedAdds, addsError, addsIsLoading]);
  useEffect(() => {
    if (eventAddsIsLoading) {
      console.log("Loading events...");
    } else if (eventAddsError) {
      console.error("Error  eventAddsError:", eventAddsError);
    } else if (fetchedEventAdds) {
      setEventAdds(fetchedEventAdds);
      console.log(" fetchedEventAdds:", fetchedEventAdds);
    }
  }, [fetchedEventAdds, eventAddsError, eventAddsIsLoading]);

  const [currentImage, setCurrentImage] = useState(0);
  const [currentBar, setCurrentBar] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBar((prev) => {
        if (prev === adds.length - 1) {
          return 0;
        }
        return prev + 1;
      });
      setCurrentImage((prevImage) => {
        if (prevImage === 3) return 0;
        else return prevImage + 1;
      });
    }, 3000); // Set interval to 3000 milliseconds (3 seconds)
    return () => clearInterval(interval);
  }, [adds.length]);

  const handleBarClick = (index: number) => {
    setCurrentBar(index);
    setCurrentImage(index);
  };

  return (
    <div className="flex flex-col">
      <div
        className="relative  bg-cover bg-center md:px-44 md:py-20 flex flex-row  items-center"
        style={{
          backgroundImage: `url(${process.env.NEXT_PUBLIC_SERVER_URL}event/image/${eventAdds[currentBar]?.eventImages[0]})`,
        }}
      >
        <div className="hero-overlay"></div>
        <div className="md:opacity-100 opacity-0  z-30  mr-4">
          {adds.map((_, index) => (
            <div
              key={index}
              className={`progress-bar w-[10px] h-[50px] bg-gray-300 mb-2 rounded-md cursor-pointer`}
              onClick={() => handleBarClick(index)} // Wrap the function call in an anonymous function
            >
              {index <= currentBar && (
                <div className="fill-bar w-full h-full rounded-md bg-gray-700"></div>
              )}
            </div>
          ))}
        </div>
        <div className="z-30 absolute bottom-1 left-3 md:hidden flex">
          <div className="flex mt-3">
            <p className="poppins-regular text-sm text-mainBlue bg-[#E9F1FC]  rounded-lg px-4 py-1 mr-3">
              {eventAdds[currentBar]?.type}
            </p>
            {isArray(eventAdds[currentBar]?.Categorie) ? (
              eventAdds[currentBar]?.Categorie.map((categorie: any) => (
                <p className="poppins-medium text-mainBlue bg-[#E9F1FC]  rounded-lg px-4 py-2 mr-3">
                  {categorie}
                </p>
              ))
            ) : (
              <p className="poppins-medium text-mainBlue bg-[#E9F1FC]  rounded-lg px-4 py-2 mr-3">
                {eventAdds[currentBar]?.Categorie}
              </p>
            )}
          </div>
        </div>
        <div className="hidden md:flex flex-col justify-between ">
          <div className="flex flex-row relative z-10">
            <div>
              <h2 className="mb-10 text-white font-poppins md:text-[30px] font-semibold text-left">
                {eventAdds.length > 0 && eventAdds[currentBar]?.eventName}
              </h2>
            </div>
          </div>
          <div className="relative z-10 mb-6">
            <p className="flex flex-row text-white items-center">
              <img
                alt="location-icon"
                src="/icons/LocationLight.png"
                className="w-[18px] h-[18px] mr-2"
              />{" "}
              {eventAdds[currentBar]?.location ? (
                eventAdds[currentBar]?.location.address.commercial ? (
                  <>
                    {eventAdds[currentBar]?.location.address.commercial}{" "}
                    {eventAdds[currentBar]?.location.address.state}
                  </>
                ) : (
                  eventAdds[currentBar]?.location.address.state
                )
              ) : (
                <>Online</>
              )}
            </p>
            <p className="flex flex-row text-white items-center">
              <img
                alt="location-icon"
                src="/icons/Calendar.png"
                className="w-[18px] h-[18px] mr-2"
              />{" "}
              {new Date(eventAdds[currentBar]?.startdate).toLocaleDateString(
                "fr-FR",
                {
                  day: "2-digit",
                  month: "short",
                }
              )}{" "}
              -{" "}
              {new Date(eventAdds[currentBar]?.enddate).toLocaleDateString(
                "fr-FR",
                {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }
              )}
            </p>
          </div>
          <div className="mb-2 flex flex-row justify-between w-fit relative z-10">
            <button className="mr-2 rounded-[30px] p-2 bg-transparent text-white text-center border border-white">
              {eventAdds[currentBar]?.type}
            </button>
            {isArray(eventAdds[currentBar]?.Categorie) ? (
              eventAdds[currentBar]?.Categorie.map((categorie: any) => (
                <button className="rounded-[30px] p-2 bg-transparent text-white text-center border border-white">
                  {categorie}
                </button>
              ))
            ) : (
              <button className="rounded-[30px] p-2 bg-transparent text-white text-center border border-white">
                {eventAdds[currentBar]?.Categorie}
              </button>
            )}
          </div>
          <div className="relative z-10">
            <button
              onClick={() =>
                router.replace(`/events/details/${eventAdds[currentBar]?._id}`)
              }
              className="mr-2 rounded-[10px] px-6 py-3 bg-mainBlue text-white text-center"
            >
              Voir plus
            </button>
          </div>
        </div>
      </div>

      <div className=" mx-1 md:hidden   flex flex-col justify-between ">
        <div className="flex flex-row relative z-10">
          <div>
            <h2 className="mb-10 text-titles poppins-medium font-poppins md:text-[30px] font-semibold text-left">
              {eventAdds.length > 0 && eventAdds[currentBar]?.eventName}
            </h2>
          </div>
        </div>
        <div className="relative z-10 mb-6">
          <p className="flex flex-row text-titles poppins-medium items-center">
            <img
              alt="location-icon"
              src="/icons/LocationGray.png"
              className="w-[18px] h-[18px] mr-2"
            />{" "}
            {eventAdds[currentBar]?.location ? (
              eventAdds[currentBar]?.location.address.commercial ? (
                <>
                  {eventAdds[currentBar]?.location.address.commercial}{" "}
                  {eventAdds[currentBar]?.location.address.state}
                </>
              ) : (
                eventAdds[currentBar]?.location.address.state
              )
            ) : (
              <>Online</>
            )}
          </p>
          <p className="flex flex-row text-titles poppins-medium items-center">
            <img
              alt="location-icon"
              src="/icons/CalendarGray.png"
              className="w-[18px] h-[18px] mr-2"
            />{" "}
            {new Date(eventAdds[currentBar]?.startdate).toLocaleDateString(
              "fr-FR",
              {
                day: "2-digit",
                month: "short",
              }
            )}{" "}
            -{" "}
            {new Date(eventAdds[currentBar]?.enddate).toLocaleDateString(
              "fr-FR",
              {
                day: "2-digit",
                month: "short",
                year: "numeric",
              }
            )}
          </p>
        </div>

        <div className="relative z-10">
          <button
            onClick={() =>
              router.replace(`/events/details/${eventAdds[currentBar]?._id}`)
            }
            className="mr-2 rounded-[10px] px-4 py-1 bg-mainBlue text-titles poppins-medium text-center"
          >
            Voir plus
          </button>
        </div>
      </div>
      <div className="md:opacity-0 opacity-100 flex  z-30  mr-4 transform rotate-[-90deg]">
        <div className="flex flex-col z-30 justify-center items-center w-full p-4">
          {adds.map((_, index) => (
            <div
              key={index}
              className={`progress-bar w-[10px] h-[50px] bg-gray-300 mb-2 rounded-md cursor-pointer`}
              onClick={() => handleBarClick(index)} // Wrap the function call in an anonymous function
            >
              {index <= currentBar && (
                <div className="fill-bar-horizontal w-full h-full rounded-md bg-gray-700"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
