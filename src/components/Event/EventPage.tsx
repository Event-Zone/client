import React, { useEffect, useState } from "react";
import {
  useGetSubscriptionQuery,
  useGetUserQuery,
  useSearchEventsByUserQuery,
} from "@/store/features/api/apiSlice";
import { useDispatch } from "react-redux";
import { setSearchedEvents } from "@/store/features/eventSlice";
import { useRouter } from "next/navigation";
import { isArray } from "util";

function EventPage({ data }: { data: any }) {
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
  const [subscritionData, setSubscriptionData] = useState<any>(null);
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

  const [currentImage, setCurrentImage] = useState(0);
  const [currentBar, setCurrentBar] = useState(0);
  const handleBarClick = (index: number) => {
    setCurrentBar(index);
    setCurrentImage(index);
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
  const [videoId, setVideoId] = useState<string | null>(null);
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
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col w-full px-4 md:px-20 lg:px-44  py-16">
        <div className="relative flex items-center justify-center rounded-xl overflow-hidden h-[460px] w-full ">
          <img
            alt="coverImg"
            className="h-full w-full"
            src={
              data.eventImages
                ? `${process.env.NEXT_PUBLIC_SERVER_URL}event/image/${data.eventImages[currentImage]}`
                : "https://via.placeholder.com/300"
            }
          />
          <div className="absolute bottom-3 flex flex-row z-30 justify-center items-center w-full p-4">
            <>
              {data?.videoUrl && videoId && (
                <>
                  <div
                    key={0}
                    className={`progress-bar mr-4 flex-1 h-[10px] mb-2 bg-gray-700 rounded-md cursor-pointer`}
                    onClick={() => handleBarClick(-1)}
                  ></div>
                </>
              )}
              {data.eventImages.map((_: any, index: number) => (
                <div
                  key={index}
                  className={`progress-bar mr-4 flex-1 h-[10px] mb-2 bg-gray-700 rounded-md cursor-pointer`}
                  onClick={() => handleBarClick(index)}
                >
                  {index === currentBar && (
                    <div className=" w-full h-full rounded-md bg-gray-300  "></div>
                  )}
                </div>
              ))}{" "}
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
        <div className=" mt-4 poppins-semibold text-titles text-3xl">
          {data.eventAcronym ? (
            <h1>
              {data.eventAcronym} - {data.eventName}
            </h1>
          ) : (
            <h1>{data.eventName}</h1>
          )}
        </div>

        <div className="flex justify-start mt-4 flex-wrap">
          {data.linkInscription ? (
            <div className="mb-2 mr-2 rounded-3xl poppins-regular p-3  max-h-[33px]  text-white bg-mainBlue flex items-center justify-center ">
              <img
                alt="icon"
                src="/icons/Edit Square.png"
                className="max-w-[30px] max-h-[30px]"
              />{" "}
              <button className="rounded-xl ml-2 poppins-regular  ">
                Participer{" "}
              </button>
            </div>
          ) : null}
          <div className="mb-2 mr-2 rounded-3xl poppins-regular p-3 hover:bg-titles  max-h-[33px]  text-titles hover:text-white border-[1.3px] border-titles flex items-center justify-center ">
            <img
              alt="icon"
              src="/icons/globalDark.png"
              className="max-w-[30px] max-h-[30px]"
            />{" "}
            <button className="rounded-xl ml-2 poppins-regular  ">
              Site Web
            </button>
          </div>
          <div className="mb-2 mr-2 rounded-3xl poppins-regular p-3 hover:bg-titles  max-h-[33px]  text-titles hover:text-white border-[1.3px] border-titles flex items-center justify-center ">
            <img
              alt="icon"
              src="/icons/mingcute_phone-line.png"
              className="max-w-[30px] max-h-[30px]"
            />{" "}
            <button className="rounded-xl ml-2 poppins-regular  ">
              Mobile{" "}
            </button>
          </div>
          <div className="mb-2 rounded-3xl poppins-regular p-3 hover:bg-titles   max-h-[33px]  texttitles hover:text-white  border-[1.3px] border-titles flex items-center justify-center ">
            <img
              alt="icon"
              src="/icons/gps.png"
              className="max-w-[30px] max-h-[30px]"
            />{" "}
            <button className="rounded-xl ml-2 poppins-regular  ">
              Voir sur la carte{" "}
            </button>
          </div>
        </div>
        {fetchedOrganizer && (
          <div className="mt-4 bg-mainBlue bg-opacity-[5%] rounded-lg">
            <div className="flex items-center justify-between p-8">
              <div className="flex flex-row">
                <div className="text-gray-600">
                  <h3 className="poppins-medium">Organisateur</h3>

                  <p className="poppins-medium text-titles">
                    {fetchedSubscription?.company}
                  </p>
                </div>{" "}
              </div>
              <div
                onClick={handleSearch}
                className="flex justify-between items-center cursor-pointer bg-[#DAE6F4] rounded-md p-2"
              >
                <p className="text-mainBlue poppins-regular text-sm   ">
                  Other Events Hosted
                </p>
              </div>
            </div>
          </div>
        )}
        <div className="mt-4 poppins-semibold text-titles">
          <h3 className="text-2xl">Date et Horaires</h3>
          <div className="flex items-center mt-3">
            <img
              alt="icon"
              src="/icons/calendarGray.png"
              className="w-[15px] h-[15px] mr-2"
            />{" "}
            <p className="poppins-regular text-gray-600 rounded-lg px-4 py-2">
              Du{" "}
              {new Date(data.startdate).toLocaleDateString("fr-FR", {
                day: "2-digit",
                month: "short",
              })}{" "}
              au{" "}
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
              ajouter au calendrie google{" "}
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
                  Online
                </a>
              ) : (
                <>Online</>
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
                voir sur la carte{" "}
              </a>{" "}
            </div>
          ) : null}
        </div>
        <div className="mt-4">
          <h3 className="mt-4 poppins-semibold text-titles text-2xl">
            A propos de cet événement
          </h3>
          <div className="flex mb-4 mt-3 ">
            {data.lieu ? (
              <div className="flex mr-4">
                <img
                  alt="icon"
                  src="/icons/globalBlue.png"
                  className="max-w-[30px] max-h-[30px]"
                />
                <p className="poppins-medium">Evenement {data.lieu}</p>
              </div>
            ) : null}
            {data.accessibilite ? (
              <div className="flex mr-4 ">
                <img
                  alt="icon"
                  src="/icons/Ticket.png"
                  className="max-w-[30px] max-h-[30px]"
                />
                <p className="poppins-medium">{data.accessibilite}</p>
              </div>
            ) : null}
            {subscritionData?.pack === "Business" ? (
              <div className="flex ">
                <img
                  alt="icon"
                  src="/icons/ph_seal-check-fill (1).png"
                  className="max-w-[30px] max-h-[30px]"
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
          <div className="flex  ">
            {data?.sponsorImages.map((img: any, index: number) => (
              <img
                className="rounded-lg w-[100px] h-[100px] mr-3"
                key={index}
                alt={`sponsor-${index}`}
                src={
                  img
                    ? `${process.env.NEXT_PUBLIC_SERVER_URL}event/image/${img}`
                    : "https://via.placeholder.com/300"
                }
              />
            ))}
          </div>
        </div>
        <div className="mt-4 poppins-meduim w-full overflow-scroll element-with-scrollbar">
          <h3 className="poppins-semibold text-2xl text-titles mb-3">Tags</h3>
          <div className="flex">
            {data?.tags?.map((tag: string, index: number) => {
              if (tag !== "")
                return (
                  <span
                    key={index}
                    className="tag mr-4 poppins-meduim text-titles rounded-lg px-3 bg-gray-200"
                  >
                    {tag}
                  </span>
                );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventPage;
