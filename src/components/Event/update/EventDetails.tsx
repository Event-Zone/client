import {
  useGetSubscriptionQuery,
  useGetUserQuery,
  useSearchEventsByUserQuery,
} from "@/store/features/api/apiSlice";
import { selectUser } from "@/store/features/userSlice";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useRouter } from "@/navigation";
import { useDispatch } from "react-redux";
import { setSearchedEvents } from "@/store/features/eventSlice";
import { isArray } from "util";
import { useTranslations } from "next-intl";
import Image from "next/image";
function EventDetails({
  firstFormData,
  secondFormData,
}: {
  firstFormData: any;
  secondFormData: any;
}) {
  const [hovered, setHovered] = useState<number | null>(null);
  const handleMouseEnter = (index: number | null) => setHovered(index);
  const fetchedOrganizer = useSelector(selectUser);
  const [showMobile, setShowMobile] = useState<boolean>(false);

  const router = useRouter();
  const getImageUrl = (image: File | string) => {
    if (image instanceof File) {
      return URL.createObjectURL(image);
    }
    return `${process.env.NEXT_PUBLIC_SERVER_URL}event/image/${image}`;
  };
  const user = useSelector(selectUser);

  const [subscriptionData, setSubscriptionData] = useState<any>(null);
  const {
    data: fetchedSubscription,
    error: subscriptionError,
    isLoading: subscriptionIsLoading,
    refetch,
  } = useGetSubscriptionQuery(user?.subscription, {
    skip: !user,
  });
  useEffect(() => {
    if (subscriptionIsLoading) {
      console.log("Loading events...");
    } else if (subscriptionError) {
      console.error("Error fetching events:", subscriptionError);
    } else if (fetchedSubscription) {
      console.log("Fetched subscription:", fetchedSubscription);
      setSubscriptionData(fetchedSubscription);
    }
  }, [fetchedSubscription, subscriptionError, subscriptionIsLoading]);
  const [currentImage, setCurrentImage] = useState(0);
  const [currentBar, setCurrentBar] = useState(0);
  useEffect(() => {
    console.log(firstFormData);
  }, [firstFormData]);
  const handleBarClick = (index: number) => {
    setCurrentBar(index);
    setCurrentImage(index);
  };
  const [videoId, setVideoId] = useState<string | null>(null);

  const t = useTranslations("Event");
  const getYouTubeId = (url: string) => {
    const urlParams = new URL(url).searchParams;
    return urlParams.get("v");
  };

  useEffect(() => {
    if (secondFormData.get("videoUrl")) {
      const pp = getYouTubeId(secondFormData.get("videoUrl"));
      if (pp) {
        setCurrentBar(-1);
        setVideoId(pp);
      }
    }
  }, [secondFormData.get("videoUrl")]);
  useEffect(() => {
    if (!secondFormData.getAll("eventImages")?.length) return; // Check if images exist

    const interval = setInterval(() => {
      if (currentBar >= 0) {
        setCurrentImage((prev) =>
          prev === secondFormData.getAll("eventImages").length - 1
            ? 0
            : prev + 1
        );
      }
    }, 7000);

    return () => clearInterval(interval);
  }, [secondFormData.getAll("eventImages"), currentBar]);
  return (
    <div className="flex flex-col w-full items-center ">
      <div className="flex flex-col w-full items-center">
        <div className="flex flex-col w-full md:w-[90%] lg:w-[1050px] px-2 md:px-4 lg:px-0 py-16">
          <div className="relative flex items-center justify-center rounded-xl overflow-hidden h-[179px] md:h-[460px] w-full">
            {secondFormData?.get("videoUrl") && videoId && currentBar === -1 ? (
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
              <div className="relative flex items-center w-full h-full">
                {/* Blurred Background Image */}
                <Image
                  key={1}
                  alt="coverImg"
                  className="absolute blur-md top-0 h-full w-full object-cover"
                  src={getImageUrl(
                    secondFormData.getAll("eventImages")[currentImage]
                  )}
                  width={500}
                  height={300}
                  quality={10}
                />
                {/* Foreground Image */}
                <Image
                  key={2}
                  alt="coverImg"
                  className="z-40 w-auto h-full max-w-full object-contain md:object-cover mx-auto" // Use object-contain for small screens, object-cover for larger
                  src={getImageUrl(
                    secondFormData.getAll("eventImages")[currentImage]
                  )}
                  width={500}
                  height={300}
                  quality={75}
                />
              </div>
            )}
          </div>
          <div className="  flex flex-row z-30 justify-center items-center w-full p-4">
            <>
              <div className=" flex items-center justify-center h-[50px]">
                <div className=" opacity-100 flex z-30  transform rotate-[-90deg]">
                  <div className=" flex flex-col z-30 justify-center items-end  w-full p-4">
                    {secondFormData.get("videoUrl") && videoId && (
                      <>
                        <div
                          key={0}
                          className={`progress-bar w-[5px] md:h-[100px] xl:h-[200px]  bg-gray-300 mb-2 rounded-md cursor-pointer`}
                          onClick={() => handleBarClick(-1)}
                        >
                          {-1 <= currentImage && (
                            <div className=" w-full h-full rounded-md  bg-mainBlue"></div>
                          )}{" "}
                        </div>
                      </>
                    )}
                    {secondFormData
                      .getAll("eventImages")
                      .map((_: any, index: number) => (
                        <div
                          key={index}
                          className={`progress-bar w-[5px] h-[60px] md:h-[100px] xl:h-[200px]  bg-gray-300 mb-2 rounded-md cursor-pointer ${
                            index < currentImage && "bg-mainBlue"
                          }`}
                          onClick={() => handleBarClick(index)}
                        >
                          {index <= currentImage && (
                            <div
                              className={`fill-bar-horizontal w-full h-full rounded-md bg-gray-700 `}
                            ></div>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              {/* {secondFormData
                .getAll("eventImages")
                .map((_: any, index: number) => (
                  <div
                    key={index}
                    className={`progress-bar mr-4 flex-1 h-[10px] mb-2 bg-gray-700 rounded-md cursor-pointer`}
                    onClick={() => handleBarClick(index)}
                  >
                    {index === currentBar && (
                      <div className=" w-full h-full rounded-md bg-gray-300  "></div>
                    )}
                  </div>
                ))}{" "} */}
            </>
          </div>
          <div className="flex mt-3 element-with-scrollbar w-full overflow-x-auto whitespace-nowrap">
            <p className="poppins-medium text-mainBlue bg-[#E9F1FC] rounded-lg px-4 py-2 mr-3">
              {firstFormData.type}
            </p>
            {Array.isArray(firstFormData?.Categorie) ? (
              firstFormData?.Categorie.map((categorie: any) => (
                <p
                  key={categorie}
                  className="poppins-medium text-mainBlue bg-[#E9F1FC] rounded-lg px-4 py-2 mr-3"
                >
                  {categorie}
                </p>
              ))
            ) : (
              <p className="poppins-medium text-mainBlue bg-[#E9F1FC] rounded-lg px-4 py-2 mr-3">
                {firstFormData?.Categorie}
              </p>
            )}
          </div>

          <div className=" md:block hidden">
            <p className="poppins-medium text-gray-600 rounded-lg px-4 py-2">
              {new Date(firstFormData.startdate).toLocaleDateString(undefined, {
                day: "2-digit",
                month: "short",
              })}{" "}
              -{" "}
              {new Date(firstFormData.enddate).toLocaleDateString(undefined, {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
          <div className=" mt-4 poppins-semibold text-titles md:text-3xl">
            {firstFormData.eventAcronym ? (
              <h1>
                {firstFormData.eventAcronym} - {firstFormData.eventName}
              </h1>
            ) : (
              <h1>{firstFormData.eventName}</h1>
            )}
          </div>
          <div className="relative z-10 my-6 ">
            <p className="flex flex-row text-titles poppins-medium items-center">
              <img
                alt="location-icon"
                src="/icons/LocationGray.svg"
                className="w-[20px] h-[20px] mr-2"
              />
              {firstFormData?.location ? (
                firstFormData?.location.address.commercial ? (
                  <>
                    {firstFormData?.location.address.commercial}{" "}
                    {firstFormData?.location.address.state}
                  </>
                ) : (
                  firstFormData?.location.address.state
                )
              ) : (
                <>Online</>
              )}
            </p>
            <p className="flex flex-row text-titles poppins-medium items-center">
              <img
                alt="calendar-icon"
                src="/icons/CalendarGray.svg"
                className="w-[18px] h-[18px] mr-2"
              />
              {new Date(firstFormData?.startdate).toLocaleDateString(
                undefined,
                {
                  day: "2-digit",
                  month: "short",
                }
              )}{" "}
              -{" "}
              {new Date(firstFormData?.enddate).toLocaleDateString(undefined, {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
          <div className="flex md:justify-start  justify-center mt-4 flex-wrap">
            {firstFormData?.linkInscription ? (
              <div className="md:w-auto w-[128px] mb-2 mr-2 rounded-3xl poppins-regular px-3 py-5  max-h-[33px]  text-white bg-mainBlue flex items-center justify-center ">
                <img
                  alt="icon"
                  src="/icons/Edit Square.svg"
                  className="max-w-[30px] max-h-[30px]"
                />{" "}
                <a
                  target="_blank"
                  href={firstFormData?.linkInscription}
                  className="rounded-xl ml-2 poppins-regular  "
                >
                  {t("Participer")}
                </a>
              </div>
            ) : null}
            {firstFormData?.website && (
              <div
                onMouseEnter={() => handleMouseEnter(0)}
                onMouseLeave={() => handleMouseEnter(null)}
                className="md:w-auto w-[128px] mb-2 mr-2 rounded-3xl poppins-regular px-3 py-5 hover:bg-titles  max-h-[33px]  text-titles hover:text-white border-[1.3px] border-titles flex items-center justify-center "
              >
                <img
                  alt="icon"
                  src={`${
                    hovered === 0
                      ? "/icons/globalW.svg"
                      : "/icons/globalDark.svg"
                  }`}
                  className="max-w-[30px] max-h-[30px]"
                />{" "}
                <Link
                  target="_blank"
                  href={firstFormData?.website}
                  className="rounded-xl ml-2 poppins-regular  "
                >
                  Web Site
                </Link>
              </div>
            )}
            {firstFormData?.mobile && (
              <div
                onClick={() => setShowMobile((prev) => !prev)}
                className="md:w-auto w-[128px] mb-2 mr-2 rounded-3xl poppins-regular px-3 py-5 hover:bg-titles max-h-[33px] text-titles hover:text-white border-[1.3px] border-titles flex items-center justify-center"
                onMouseEnter={() => handleMouseEnter(1)}
                onMouseLeave={() => handleMouseEnter(null)}
              >
                <img
                  alt="icon"
                  src={`${
                    hovered === 1 ? "/icons/mobileW.svg" : "/icons/mobileB.svg"
                  }`}
                  className="max-w-[30px] max-h-[30px]"
                />
                <button className="rounded-xl ml-2 poppins-regular">
                  {showMobile ? firstFormData?.mobile : <>Mobile</>}
                </button>
              </div>
            )}

            {firstFormData?.location && (
              <div
                onMouseEnter={() => handleMouseEnter(2)}
                onMouseLeave={() => handleMouseEnter(null)}
                className="md:w-auto w-[128px] mb-2 rounded-3xl poppins-regular px-3 py-5 hover:bg-titles   max-h-[33px]  texttitles hover:text-white  border-[1.3px] border-titles flex items-center justify-center "
              >
                <img
                  alt="icon"
                  src={`${
                    hovered === 2 ? "/icons/gpsWhite.svg" : "/icons/gps.svg"
                  }`}
                  className="max-w-[30px] max-h-[30px]"
                />{" "}
                <a
                  target="_blank"
                  href={`https://www.google.com/maps/place/${firstFormData?.location?.lat},${firstFormData?.location?.lon}`}
                  className="rounded-xl ml-2 poppins-regular  "
                >
                  Maps
                </a>
              </div>
            )}
          </div>
          {fetchedOrganizer && (
            <div className="mt-4 bg-mainBlue bg-opacity-[5%] rounded-lg">
              <div className="flex md:flex-row flex-col items-center justify-between p-8">
                <div className="mb-2 flex md:flex-row flex-col items-center">
                  <img
                    className="md:mr-2 h-[50px] w-[50px] rounded-full object-cover flex-shrink-0" // Ensure the image doesn't shrink
                    src={`${process.env.NEXT_PUBLIC_SERVER_URL}event/image/${fetchedOrganizer?.profilePicture}`}
                    alt="Profile"
                  />
                  <div className="text-gray-600">
                    <h3 className="poppins-regular text-[12px]">
                      {t("Organisateur")}
                    </h3>

                    <div className="flex">
                      <p className="poppins-semibold text-titles">
                        {fetchedSubscription?.company}
                      </p>{" "}
                      {fetchedSubscription?.pack === "Business" ? (
                        <div className="flex ">
                          <img
                            alt="icon"
                            src="/icons/ph_seal-check-fill (1).svg"
                            className="max-w-[20px] max-h-[20px]"
                          />
                        </div>
                      ) : null}
                    </div>
                  </div>{" "}
                </div>
                <div className="flex justify-between items-center cursor-pointer bg-[#DAE6F4] rounded-md p-2">
                  <p className="text-mainBlue poppins-regular text-sm  flex  ">
                    <img alt="calendaricon" src="/icons/calendar-edit.svg" />
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
                src="/icons/CalendarGray.svg"
                className="w-[15px] h-[15px] mr-2"
              />{" "}
              <p className="poppins-regular text-gray-600 rounded-lg px-4 py-2">
                {" "}
                {new Date(firstFormData.startdate).toLocaleDateString(
                  undefined,
                  {
                    day: "2-digit",
                    month: "short",
                  }
                )}{" "}
                -{" "}
                {new Date(firstFormData.enddate).toLocaleDateString(undefined, {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
            <div className="flex items-center">
              <img
                alt="icon"
                src="/icons/clock.svg"
                className="w-[15px] h-[15px] mr-2"
              />{" "}
              <p className="poppins-regular text-gray-600">
                {firstFormData.startHour} - {firstFormData.endHour}
              </p>{" "}
            </div>
            <div className="flex items-center">
              <img
                alt="icon"
                src="/icons/Frame 1170.svg"
                className="w-[15px] h-[15px] mr-2"
              />{" "}
              <a
                target="_blank"
                href={`https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
                  firstFormData.eventName
                )}&dates=${new Date(firstFormData.startdate)
                  .toISOString()
                  .replace(/-|:|\.\d+/g, "")}/${new Date(firstFormData.enddate)
                  .toISOString()
                  .replace(/-|:|\.\d+/g, "")}&details=${encodeURIComponent(
                  firstFormData.eventDescription
                )}&location=${encodeURIComponent(
                  firstFormData.location?.address?.state || "Online"
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
                  firstFormData.location ? "Location.svg" : "globalDark.svg"
                }`}
                className="w-[20px] h-[20px] mr-2"
              />{" "}
              <p className="poppins-regular text-gray-800">
                {firstFormData?.location ? (
                  firstFormData?.location?.address?.commercial ? (
                    <>
                      {firstFormData?.location?.address?.commercial}{" "}
                      {<>, {firstFormData?.location?.address?.state}</>}
                    </>
                  ) : (
                    firstFormData?.location?.address?.state
                  )
                ) : firstFormData.link ? (
                  <a
                    href={firstFormData.link}
                    className="text-mainBlue cursor-pointer poppins-regular"
                  >
                    {t("enLign")}
                  </a>
                ) : (
                  <> {t("enLign")}</>
                )}
              </p>
            </div>
            {firstFormData?.location ? (
              <div className="flex items-center">
                <img
                  alt="icon"
                  src="/icons/gps.svg"
                  className="w-[20px] h-[20px] mr-2"
                />{" "}
                <a
                  target="_blank"
                  href={`https://www.google.com/maps/place/${firstFormData?.location?.lat},${firstFormData?.location?.lon}`}
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
            <div className="flex flex-wrap mb-4 mt-3 ">
              {secondFormData.get("lieu") &&
              secondFormData.get("lieu") !== "null" ? (
                <div className="flex mr-4">
                  <img
                    alt="icon"
                    src="/icons/bank.svg"
                    className="max-w-[20px] max-h-[20px]"
                  />
                  <p className="poppins-medium">{secondFormData.get("lieu")}</p>
                </div>
              ) : null}
              {secondFormData.get("accessibilite") &&
              secondFormData.get("accessibilite") !== "null" ? (
                <div className="flex mr-4 ">
                  <img
                    alt="icon"
                    src="/icons/Ticket.svg"
                    className="max-w-[20px] max-h-[20px]"
                  />
                  <p className="poppins-medium">
                    {secondFormData.get("accessibilite")}
                  </p>
                </div>
              ) : null}
              {fetchedSubscription?.pack === "Business" ? (
                <div className="flex ">
                  <img
                    alt="icon"
                    src="/icons/ph_seal-check-fill (1).svg"
                    className="max-w-[20px] max-h-[20px]"
                  />
                  <p className="poppins-medium">Premium Organiser</p>
                </div>
              ) : null}
            </div>
            <p
              dangerouslySetInnerHTML={{
                __html: firstFormData.eventDescription,
              }}
              className="poppins-regular text-gray-800 list-disc list-inside"
            />
          </div>
          <div className="mt-4 poppins-semibold text-titles mb-t">
            {secondFormData?.getAll("sponsorImages")?.length !== 0 && (
              <h3 className="text-2xl mb-3">Sponsors</h3>
            )}{" "}
            <div className="flex w-full flex-wrap element-with-scrollbar items-center justify-center ">
              {secondFormData
                ?.getAll("sponsorImages")
                .map((img: any, index: number) => (
                  <div className="mb-2 flex items-center justify-center md:w-[128px]  md:h-[128px] w-[100px] h-[100px] rounded-lg border-[1.3px] mr-3 border-gray-300 p-[12px]">
                    <img
                      className="max-h-[90px] "
                      key={index}
                      alt={`sponsor-${index}`}
                      src={`${process.env.NEXT_PUBLIC_SERVER_URL}event/image/${img}`}
                    />
                  </div>
                ))}
            </div>
          </div>
          <div className="mt-4 poppins-meduim w-full  md:overflow-scroll element-with-scrollbar">
            <h3 className="poppins-semibold text-2xl text-titles mb-3">Tags</h3>
            <div className="flex flex-wrap">
              {firstFormData?.tags?.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="mb-3 tag mr-4 poppins-meduim text-titles rounded-lg px-3 bg-gray-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetails;
