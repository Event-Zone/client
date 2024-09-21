"use client";
import React, { useEffect, useState } from "react";
import {
  useGetHeroAddsQuery,
  useGetEventAddQuery,
} from "@/store/features/api/apiSlice";
import { useRouter } from "@/navigation";
import { isArray } from "util";
import Progress from "../shared/Progress";
import Image from "next/image";
import { useTranslations } from "next-intl";
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
        if (prev === eventAdds?.length - 1) {
          return 0;
        }
        return prev + 1;
      });
    }, 7000); // Set interval to 3000 milliseconds (3 seconds)
    return () => clearInterval(interval);
  }, [eventAdds.length]);

  const handleBarClick = (index: number) => {
    setCurrentBar(index);
  };
  useEffect(() => {
    console.log(eventAdds.length);
  }, [eventAdds]);

  const t = useTranslations("Hero");
  return (
    <div className="w-full flex flex-col md:mt-0 mt-3">
      <div
        className="relative w-full h-[179px] sm:h-[450px] md:py-20 flex flex-row items-center rounded-md overflow-hidden" // Added overflow-hidden
      >
        <Image
          src={`${process.env.NEXT_PUBLIC_SERVER_URL}event/image/${eventAdds[currentBar]?.eventImages[0]}`}
          alt={`eventHeroImage${currentBar}`}
          width={1920} // Specify a large width for better responsiveness
          height={1080} // Specify a large height to maintain aspect ratio
          quality={75}
          className="absolute top-0 left-0 w-full h-full object-cover" // Ensure the image covers the container
        />
        <div className="hero-overlay md:block hidden"></div>
        <div className="md:opacity-100 opacity-0 md:ml-16 z-30  mr-[6%]">
          {eventAdds.map((_, index) => (
            <div
              key={index}
              className={`progress-bar w-[10px] md:h-[65px] bg-gray-300 mb-2 rounded-md cursor-pointer`}
              onClick={() => handleBarClick(index)} // Wrap the function call in an anonymous function
            >
              {index <= currentBar && (
                <div className="fill-bar w-full h-full rounded-md bg-gray-700"></div>
              )}
            </div>
          ))}
        </div>
        <div className="z-30 absolute w-[95%] mx-[2px] my-[6px] overflow-scroll element-with-scrollbar bottom-1 left-3 md:hidden flex">
          <div className="flex mt-3 ">
            <p className="mr-2 text-[12px] poppins-regular inline-block rounded-md  px-2 py-1 h-[28px]  bg-[#E9F1FC] text-mainBlue text-center border border-white whitespace-nowrap box-border">
              {eventAdds[currentBar]?.type}
            </p>
            {isArray(eventAdds[currentBar]?.Categorie) ? (
              eventAdds[currentBar]?.Categorie.map((categorie: any) => (
                <p
                  key={categorie}
                  className="mr-2 text-[12px] poppins-regular inline-block rounded-md  px-2 py-1 h-[28px]  bg-[#E9F1FC] text-mainBlue text-center border border-white whitespace-nowrap box-border"
                >
                  {categorie}
                </p>
              ))
            ) : (
              <p className="poppins-medium text-center h-[28px]  text-mainBlue bg-[#E9F1FC]  rounded-lg md:px-4 md:py-2 px-[5px] mr-3">
                {eventAdds[currentBar]?.Categorie}
              </p>
            )}
          </div>
        </div>
        <div className="hidden md:flex flex-col justify-between ">
          <div className="flex flex-row relative z-10">
            <div>
              <h2 className="mb-1 text-ellipsis line-clamp-2 text-white text-[16px] md:text-[48px] poppins-semibold text-left leading-[65px]">
                {eventAdds.length > 0 && (
                  <>
                    {
                      <>
                        {eventAdds[currentBar]?.eventAcronym && (
                          <>
                            {eventAdds[currentBar]?.eventAcronym}
                            {" - "}
                          </>
                        )}
                      </>
                    }{" "}
                    {eventAdds[currentBar]?.eventName}
                  </>
                )}
              </h2>
            </div>
          </div>
          {eventAdds[currentBar]?.eventAcronym}
          <div className=" relative z-10 mb-6">
            <p className="flex flex-row text-white poppins-regular  text-md  mt-1 items-center">
              <img
                alt="location-icon"
                src="/icons/LocationLight.png"
                className="w-[20px] h-[20px] mr-2"
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
            <p className="flex flex-row text-white poppins-regular  text-md  mt-1 items-center">
              <img
                alt="location-icon"
                src="/icons/Calendar.png"
                className="w-[20px] h-[20px] mr-2"
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
          <div className="mb-8 flex flex-row w-[200px]  md:w-full overflow-scroll element-with-scrollbar    relative z-10">
            <button className="mr-2 rounded-[30px] px-6 py-2 bg-transparent text-white text-center border border-white">
              {eventAdds[currentBar]?.type}
            </button>
            {isArray(eventAdds[currentBar]?.Categorie) ? (
              eventAdds[currentBar]?.Categorie.map(
                (categorie: any, index: number) => {
                  if (index <= 2)
                    return (
                      <button
                        key={index}
                        className="mr-2 inline-block rounded-[30px] px-6 max-h-[41px] py-2 bg-transparent text-white text-center border border-white whitespace-nowrap box-border"
                      >
                        {categorie}
                      </button>
                    );
                }
              )
            ) : (
              <button className="inline-block rounded-[30px] max-h-[40px] px-6 py-2 bg-transparent text-white text-center border border-white whitespace-nowrap box-border">
                {eventAdds[currentBar]?.Categorie}
              </button>
            )}
          </div>
          <div className="relative z-10">
            <button
              onClick={() =>
                router.replace(`/events/details/${eventAdds[currentBar]?._id}`)
              }
              className="mr-2 rounded-[10px] px-10 py-3 bg-mainBlue text-white text-center"
            >
              {t("button")}
            </button>
          </div>
        </div>
      </div>

      <div className="mx-1 md:hidden flex flex-col justify-between">
        <div className="flex flex-row relative z-10">
          <div>
            <h2 className="my-[10px] text-titles poppins-medium md:text-[30px] poppins-semibold text-left">
              {eventAdds.length > 0 && (
                <>
                  {
                    <>
                      {eventAdds[currentBar]?.eventAcronym && (
                        <>
                          {eventAdds[currentBar]?.eventAcronym}
                          {" - "}
                        </>
                      )}
                    </>
                  }{" "}
                  {eventAdds[currentBar]?.eventName}
                </>
              )}
            </h2>
          </div>
        </div>
        <div className="text-[14px]  border-2 rounded-xl border-gray-300  relative z-10 mb-3">
          <p className="p-2 border-b-2 border-gray-300 flex flex-row text-titles poppins-medium items-center">
            <img
              alt="location-icon"
              src="/icons/LocationGray.png"
              className="w-[18px] h-[18px] mr-2"
            />
            <p className="text-ellipsis line-clamp-1">
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
              )}{" "}
            </p>
          </p>
          <p className="p-2 flex flex-row text-titles poppins-medium items-center">
            <img
              alt="calendar-icon"
              src="/icons/CalendarGray.png"
              className="w-[18px] h-[18px] mr-2"
            />
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

        <div className="w-full flex items-center justify-between relative z-10">
          <a
            target="_blank"
            href={eventAdds[currentBar]?.website}
            className="flex justify-center items-center mr-3 flex-1 rounded-[30px] px-4 py-1 bg-white h-[40px] text-titles border-titles border-[1.4px] poppins-medium text-[12px] text-center"
          >
            <img
              alt="globe-icon"
              src="/icons/globalDark.png"
              className="w-[20px] h-[20px] mr-2"
            />
            Web Site
          </a>
          <button
            onClick={() => {
              router.replace(`/events/details/${eventAdds[currentBar]?._id}`);
            }}
            className=" flex-1 rounded-[30px] px-4 py-1 bg-mainBlue text-white h-[40px] poppins-medium text-[12px] text-center"
          >
            Voir plus
          </button>
        </div>

        {/* Progress bars should be below the buttons */}
        <div className=" flex items-center justify-center h-[50px]">
          <div className="md:opacity-0 opacity-100 flex z-30  transform rotate-[-90deg]">
            <div className="md:hidden flex flex-col z-30 justify-center items-end  w-full p-4">
              {eventAdds.map((_, index) => (
                <div
                  key={index}
                  className={`progress-bar w-[10px] h-[50px] bg-gray-300 mb-2 rounded-md cursor-pointer`}
                  onClick={() => handleBarClick(index)}
                >
                  {index <= currentBar && (
                    <div className="fill-bar-horizontal w-full h-full rounded-md bg-gray-700"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {(addsIsLoading || eventAddsIsLoading) && <Progress />}
    </div>
  );
};

export default Hero;
