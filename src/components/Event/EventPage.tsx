import React, { useEffect, useState } from "react";
import {
  useGetSubscriptionQuery,
  useGetUserQuery,
  useSearchEventsByUserQuery,
} from "@/store/features/api/apiSlice";
import { useDispatch } from "react-redux";
import { setSearchedEvents } from "@/store/features/eventSlice";
import { Link, useRouter } from "@/navigation";
import { isArray } from "util";
import Image from "next/image";
import { useTranslations } from "next-intl";

function EventPage({ data }: { data: any }) {
  const [showMobile, setShowMobile] = useState<boolean>(false);
  // geting the organizer data
  const {
    data: fetchedOrganizer,
    error: fetchedOrganizerError,
    isLoading: fetchedOrganizerIsLoading,
  } = useGetUserQuery(data.organizerId);

  // getting the subscription data
  const {
    data: fetchedSubscription,
    error: subscriptionError,
    isLoading: subscriptionIsLoading,
    refetch,
  } = useGetSubscriptionQuery(fetchedOrganizer?.subscription, {
    skip: !fetchedOrganizer,
  });
  const [videoId, setVideoId] = useState<string | null>(null);
  const [subscritionData, setSubscriptionData] = useState<any>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const handleMouseEnter = (index: number | null) => setHovered(index);

  useEffect(() => {
    if (subscriptionIsLoading) {
      console.log("Loading subs...");
    } else if (subscriptionError) {
      console.error("Error fetching subs:", subscriptionError);
    } else if (fetchedSubscription) {
      console.log("Fetched subscription:", fetchedSubscription);
      setSubscriptionData(fetchedSubscription);
    }
  }, [fetchedSubscription, subscriptionError, subscriptionIsLoading]);

  useEffect(() => {
    if (fetchedOrganizerIsLoading) {
      console.log("Loading fetchedOrganizerIsLoading...");
    } else if (fetchedOrganizerError) {
      console.error(
        "Error fetching fetchedOrganizerError:",
        fetchedOrganizerError
      );
    } else if (fetchedOrganizer) {
      console.log(" fetchedOrganizer:", fetchedOrganizer);
    }
  }, [fetchedOrganizer, fetchedOrganizerError, fetchedOrganizerIsLoading]);

  const [currentBar, setCurrentBar] = useState(() => (videoId ? -1 : 0));
  const handleBarClick = (index: number) => {
    setCurrentBar(index);
  };
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    data: events,
    isError: eventsError,
    isLoading: eventsLoading,
    refetch: refetchEvents, // Access the refetch function
  } = useSearchEventsByUserQuery(data?.organizerId as string, {
    skip: !data?.organizerId,
  });
  const handleSearch = async () => {
    if (events) {
      dispatch(setSearchedEvents(events));
      router.push(`/search`);
    }
  };
  const getYouTubeId = (url: string) => {
    const urlParams = new URL(url).searchParams;
    return urlParams.get("v");
  };

  useEffect(() => {
    if (data.videoUrl) {
      const pp = getYouTubeId(data.videoUrl);
      if (pp) {
        setCurrentBar(-1);
        setVideoId(pp);
      }
    }
  }, [data?.videoUrl]);
  useEffect(() => {
    console.log(currentBar);
  }, [currentBar]);
  useEffect(() => {
    if (!data.eventImages?.length) return; // Check if images exist

    const interval = setInterval(() => {
      if (currentBar >= 0) {
        setCurrentBar((prev) =>
          prev === data.eventImages.length - 1 ? 0 : prev + 1
        );
      }
    }, 7000);

    return () => clearInterval(interval);
  }, [data.eventImages, currentBar]);
  const t = useTranslations("Event");
  return (
    <div className="flex flex-col w-full items-center ">
      <div className="flex flex-col w-auto lg:w-[1050px] px-2  md:px-4 lg:px-0  py-16">
        <div className="relative flex items-center justify-center rounded-xl overflow-hidden h-[460px] w-full ">
          {data?.videoUrl && videoId && currentBar === -1 ? (
            <div className="absolute w-full h-full z-20">
              <iframe
                id="yt-video"
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}?rel=0&autoplay=1&showinfo=0&controls=1&mute=1`}
                title="YouTube video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <Image
              alt="coverImg"
              className="h-full w-full"
              src={
                data.eventImages
                  ? `${process.env.NEXT_PUBLIC_SERVER_URL}event/image/${data.eventImages[currentBar]}`
                  : "https://via.placeholder.com/300"
              }
              width={500} // Specify width
              height={300} // Specify height
              quality={75} // Adjust quality to improve performance (default is 75)
              // placeholder="blur" // Optionally use a low-quality placeholder
            />
          )}

          <div className="absolute bottom-3 flex flex-row z-30 justify-center items-center w-full p-4">
            <>
              {data?.videoUrl && videoId && (
                <>
                  <div
                    key={0}
                    className={`progress-bar mr-4 flex-1 h-[10px] mb-2 bg-gray-700 rounded-md cursor-pointer ${
                      currentBar === -1 && "bg-white"
                    }`}
                    onClick={() => handleBarClick(-1)}
                  ></div>
                </>
              )}
              {data.eventImages.map((_: any, index: number) => (
                <div
                  key={index}
                  className={`progress-bar md:mr-4 flex-1 h-[10px] mb-2 bg-gray-700 rounded-md cursor-pointer`}
                  onClick={() => handleBarClick(index)}
                >
                  {index === currentBar && (
                    <div className=" w-full h-full rounded-md bg-gray-300  "></div>
                  )}
                </div>
              ))}
            </>
          </div>
        </div>
        <div className="flex mt-3 element-with-scrollbar w-full overflow-scroll">
          <p className="poppins-medium text-mainBlue bg-[#E9F1FC]  rounded-lg px-4 py-2 mr-3">
            {data.type}
          </p>
          {isArray(data?.Categorie) ? (
            data?.Categorie.map((categorie: any) => (
              <p className="poppins-medium text-mainBlue bg-[#E9F1FC]  rounded-lg px-4 py-2 mr-3">
                {categorie}
              </p>
            ))
          ) : (
            <p className="poppins-medium text-mainBlue bg-[#E9F1FC]  rounded-lg px-4 py-2 mr-3">
              {data?.Categorie}
            </p>
          )}
        </div>
        <div className=" ">
          <p className="poppins-medium text-gray-600 rounded-lg px-4 py-2">
            {new Date(data.startdate).toLocaleDateString("fr-FR", {
              day: "2-digit",
              month: "short",
            })}{" "}
            -{" "}
            {new Date(data.enddate).toLocaleDateString("fr-FR", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
        <div className=" mt-4 poppins-semibold text-titles md:text-3xl">
          {data.eventAcronym ? (
            <h1>
              {data.eventAcronym} - {data.eventName}
            </h1>
          ) : (
            <h1>{data.eventName}</h1>
          )}
        </div>

        <div className="flex justify-start mt-4 flex-wrap">
          {data?.linkInscription ? (
            <div className="mb-2 mr-2 rounded-3xl poppins-regular p-3  max-h-[33px]  text-white bg-mainBlue flex items-center justify-center ">
              <img
                alt="icon"
                src="/icons/Edit Square.png"
                className="max-w-[30px] max-h-[30px]"
              />{" "}
              <a
                target="_blank"
                href={data?.linkInscription}
                className="rounded-xl ml-2 poppins-regular  "
              >
                {t("Participer")}
              </a>
            </div>
          ) : null}
          {data?.website && (
            <div
              onMouseEnter={() => handleMouseEnter(0)}
              onMouseLeave={() => handleMouseEnter(null)}
              className="mb-2 mr-2 rounded-3xl poppins-regular p-3 hover:bg-titles  max-h-[33px]  text-titles hover:text-white border-[1.3px] border-titles flex items-center justify-center "
            >
              <img
                alt="icon"
                src={`${
                  hovered === 0 ? "/icons/globalW.png" : "/icons/globalDark.png"
                }`}
                className="max-w-[30px] max-h-[30px]"
              />{" "}
              <Link
                target="_blank"
                href={data?.website}
                className="rounded-xl ml-2 poppins-regular  "
              >
                Web Site
              </Link>
            </div>
          )}
          {data?.mobile && (
            <div
              onClick={() => setShowMobile((prev) => !prev)}
              className="mb-2 mr-2 rounded-3xl poppins-regular p-3 hover:bg-titles max-h-[33px] text-titles hover:text-white border-[1.3px] border-titles flex items-center justify-center"
              onMouseEnter={() => handleMouseEnter(1)}
              onMouseLeave={() => handleMouseEnter(null)}
            >
              <img
                alt="icon"
                src={`${
                  hovered === 1 ? "/icons/mobileW.png" : "/icons/mobileB.png"
                }`}
                className="max-w-[30px] max-h-[30px]"
              />
              <button className="rounded-xl ml-2 poppins-regular">
                {showMobile ? data?.mobile : <>Mobile</>}
              </button>
            </div>
          )}

          {data?.location && (
            <div
              onMouseEnter={() => handleMouseEnter(2)}
              onMouseLeave={() => handleMouseEnter(null)}
              className="mb-2 rounded-3xl poppins-regular p-3 hover:bg-titles   max-h-[33px]  texttitles hover:text-white  border-[1.3px] border-titles flex items-center justify-center "
            >
              <img
                alt="icon"
                src={`${
                  hovered === 2 ? "/icons/gpsWhite.png" : "/icons/gps.png"
                }`}
                className="max-w-[30px] max-h-[30px]"
              />{" "}
              <a
                target="_blank"
                href={`https://www.google.com/maps/place/${data?.location?.lat},${data?.location?.lon}`}
                className="rounded-xl ml-2 poppins-regular  "
              >
                Maps
              </a>
            </div>
          )}
        </div>
        {fetchedOrganizer && (
          <div className="mt-4 bg-mainBlue bg-opacity-[5%] rounded-lg">
            <div className="flex items-center justify-between p-8">
              <div className="flex flex-row">
                <div className="text-gray-600">
                  <h3 className="poppins-medium">{t("Organisateur")}</h3>

                  <p className="poppins-medium text-titles">
                    {fetchedSubscription?.company}
                  </p>
                </div>{" "}
                {subscritionData?.pack === "Business" ? (
                  <div className="flex ">
                    <img
                      alt="icon"
                      src="/icons/ph_seal-check-fill (1).png"
                      className="max-w-[20px] max-h-[20px]"
                    />
                  </div>
                ) : null}
              </div>
              <div
                onClick={handleSearch}
                className="flex justify-between items-center cursor-pointer bg-[#DAE6F4] rounded-md p-2"
              >
                <p className="text-mainBlue poppins-regular text-sm   ">
                  {t("AutreEvents")}
                </p>
              </div>
            </div>
          </div>
        )}
        <div className="mt-4 poppins-semibold text-titles">
          <h3 className="text-2xl">{t("DateTitle")}</h3>
          <div className="flex items-center mt-3">
            <img
              alt="icon"
              src="/icons/calendarGray.png"
              className="w-[15px] h-[15px] mr-2"
            />{" "}
            <p className="poppins-regular text-gray-600 rounded-lg px-4 py-2">
              {" "}
              {new Date(data.startdate).toLocaleDateString("fr-FR", {
                day: "2-digit",
                month: "short",
              })}{" "}
              -{" "}
              {new Date(data.enddate).toLocaleDateString("fr-FR", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
          <div className="flex items-center">
            <img
              alt="icon"
              src="/icons/clock.png"
              className="w-[15px] h-[15px] mr-2"
            />{" "}
            <p className="poppins-regular text-gray-600">
              {data.startHour} - {data.endHour}
            </p>{" "}
          </div>
          <div className="flex items-center">
            <img
              alt="icon"
              src="/icons/Frame 1170.png"
              className="w-[15px] h-[15px] mr-2"
            />{" "}
            <a
              target="_blank"
              href={`https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
                data.eventName
              )}&dates=${new Date(data.startdate)
                .toISOString()
                .replace(/-|:|\.\d+/g, "")}/${new Date(data.enddate)
                .toISOString()
                .replace(/-|:|\.\d+/g, "")}&details=${encodeURIComponent(
                data.eventDescription
              )}&location=${encodeURIComponent(
                data.location?.address?.state || "Online"
              )}`}
              className="poppins-regular text-sm text-mainBlue"
            >
              {t("addGoogle")}
            </a>{" "}
          </div>
        </div>
        <div className="mt-4 poppins-semibold text-titles">
          <h3 className="text-2xl">Localisation</h3>
          <div className="flex items-center mt-3">
            <img
              alt="icon"
              src={`/icons/${
                data.location ? "Location.svg" : "globalDark.png"
              }`}
              className="w-[20px] h-[20px] mr-2"
            />{" "}
            <p className="poppins-regular text-gray-800">
              {data?.location ? (
                data?.location?.address?.commercial ? (
                  <>
                    {data?.location?.address?.commercial}{" "}
                    {<>, {data?.location?.address?.state}</>}
                  </>
                ) : (
                  data?.location?.address?.state
                )
              ) : data.link ? (
                <a
                  href={data.link}
                  className="text-mainBlue cursor-pointer poppins-regular"
                >
                  {t("enLign")}
                </a>
              ) : (
                <> {t("enLign")}</>
              )}
            </p>
          </div>
          {data?.location ? (
            <div className="flex items-center">
              <img
                alt="icon"
                src="/icons/gps.png"
                className="w-[20px] h-[20px] mr-2"
              />{" "}
              <a
                target="_blank"
                href={`https://www.google.com/maps/place/${data?.location?.lat},${data?.location?.lon}`}
                className="poppins-regular text-sm text-mainBlue"
              >
                {t("seeMaps")}
              </a>{" "}
            </div>
          ) : null}
        </div>
        <div className="mt-4">
          <h3 className="mt-4 poppins-semibold text-titles text-2xl">
            {t("About")}
          </h3>
          <div className="flex mb-4 mt-3 ">
            {data.lieu ? (
              <div className="flex mr-4">
                <img
                  alt="icon"
                  src="/icons/globalBlue.png"
                  className="max-w-[20px] max-h-[20px]"
                />
                <p className="poppins-medium">{data.lieu}</p>
              </div>
            ) : null}
            {data.accessibilite ? (
              <div className="flex mr-4 ">
                <img
                  alt="icon"
                  src="/icons/Ticket.png"
                  className="max-w-[20px] max-h-[20px]"
                />
                <p className="poppins-medium">{data.accessibilite}</p>
              </div>
            ) : null}
            {subscritionData?.pack === "Business" ? (
              <div className="flex ">
                <img
                  alt="icon"
                  src="/icons/ph_seal-check-fill (1).png"
                  className="max-w-[20px] max-h-[20px]"
                />
                <p className="poppins-medium">Premium Organiser</p>
              </div>
            ) : null}
          </div>
          <p
            dangerouslySetInnerHTML={{ __html: data.eventDescription }}
            className="poppins-regular text-gray-800 list-disc list-inside"
          />
        </div>
        <div className="mt-4 poppins-semibold text-titles mb-t">
          <h3 className="text-2xl mb-3">Sponsors</h3>
          <div className="flex w-full flex-wrap element-with-scrollbar ">
            {data?.sponsorImages.map((img: any, index: number) => (
              <div className=" flex items-center justify-center md:w-[128px]  md:h-[128px] w-[100px] h-[100px] rounded-lg border-[1.3px] mr-3 border-gray-300 p-[12px]">
                <img
                  className="max-h-[90px] "
                  key={index}
                  alt={`sponsor-${index}`}
                  src={
                    img
                      ? `${process.env.NEXT_PUBLIC_SERVER_URL}event/image/${img}`
                      : "https://via.placeholder.com/300"
                  }
                />
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 poppins-meduim w-full overflow-scroll element-with-scrollbar">
          <h3 className="poppins-semibold text-2xl text-titles mb-3">Tags</h3>
          <div className="flex">
            {data?.tags?.map((tag: string, index: number) => (
              <span
                key={index}
                className="tag mr-4 poppins-meduim text-titles rounded-lg px-3 bg-gray-200"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventPage;
