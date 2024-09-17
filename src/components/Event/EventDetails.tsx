import { Link } from "@/navigation";
import { useGetSubscriptionQuery } from "@/store/features/api/apiSlice";
import { selectUser } from "@/store/features/userSlice";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { isArray } from "util";

function EventDetails({
  firstFormData,
  secondFormData,
}: {
  firstFormData: any;
  secondFormData: any;
}) {
  const [hovered, setHovered] = useState<number | null>(null);
  const handleMouseEnter = (index: number | null) => setHovered(index);
  const [showMobile, setShowMobile] = useState<boolean>(false);

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
  const getYouTubeId = (url: string) => {
    const urlParams = new URL(url).searchParams;
    return urlParams.get("v");
  };
  const [videoId, setVideoId] = useState<string | null>(null);
  useEffect(() => {
    console.log(secondFormData?.get("videoUrl"));
    if (secondFormData?.get("videoUrl")) {
      const pp = getYouTubeId(secondFormData?.get("videoUrl"));
      if (pp) {
        setCurrentBar(-1);
        setVideoId(pp);
      }
    }
  }, [secondFormData]);
  const t = useTranslations("Event");
  return (
    <div className="flex flex-col w-full items-center ">
      <div className="flex flex-col w-auto lg:w-[1050px] px-2  md:px-4 lg:px-0  py-16">
        <div className="relative flex items-center justify-center rounded-xl overflow-hidden h-[460px] w-full ">
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
            <Image
              alt="coverImg"
              className="h-full w-full"
              src={
                secondFormData.get("eventImages")
                  ? URL.createObjectURL(
                      secondFormData.getAll("eventImages")[currentImage]
                    )
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
              {secondFormData?.get("videoUrl") && videoId && (
                <>
                  <div
                    key={0}
                    className={`progress-bar mr-4 flex-1 h-[10px] mb-2 bg-gray-700 rounded-md cursor-pointer`}
                    onClick={() => handleBarClick(-1)}
                  ></div>
                </>
              )}
              {secondFormData
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
                ))}{" "}
            </>
          </div>
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

        <div className=" ">
          <p className="poppins-medium text-gray-600 rounded-lg px-4 py-2">
            {new Date(firstFormData.startdate).toLocaleDateString("fr-FR", {
              day: "2-digit",
              month: "short",
            })}{" "}
            -{" "}
            {new Date(firstFormData.enddate).toLocaleDateString("fr-FR", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
        <div className=" mt-4 poppins-semibold text-titles text-3xl">
          {firstFormData.eventAcronym ? (
            <h1>
              {firstFormData.eventAcronym} - {firstFormData.eventName}
            </h1>
          ) : (
            <h1>{firstFormData.eventName}</h1>
          )}
        </div>

        <div className="flex justify-start mt-4 flex-wrap">
          {firstFormData?.linkInscription ? (
            <div className="mb-2 mr-2 rounded-3xl poppins-regular p-3  max-h-[33px]  text-white bg-mainBlue flex items-center justify-center ">
              <img
                alt="icon"
                src="/icons/Edit Square.png"
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
                href={firstFormData?.website}
                className="rounded-xl ml-2 poppins-regular  "
              >
                Web Site
              </Link>
            </div>
          )}
          {firstFormData?.mobile && (
            <div
              onMouseEnter={() => handleMouseEnter(1)}
              onMouseLeave={() => handleMouseEnter(null)}
              onClick={() => setShowMobile((prev) => !prev)}
              className="mb-2 mr-2 rounded-3xl poppins-regular p-3 hover:bg-titles max-h-[33px] text-titles hover:text-white border-[1.3px] border-titles flex items-center justify-center"
            >
              <img
                alt="icon"
                src={`${
                  hovered === 1 ? "/icons/mobileW.png" : "/icons/mobileB.png"
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
                href={`https://www.google.com/maps/place/${firstFormData?.location?.lat},${firstFormData?.location?.lon}`}
                className="rounded-xl ml-2 poppins-regular  "
              >
                Maps
              </a>
            </div>
          )}
        </div>
        {user && (
          <div className="mt-4 bg-mainBlue bg-opacity-[5%] rounded-lg">
            <div className="flex items-center justify-between p-8">
              <div className="flex flex-row">
                <Image
                  width={30}
                  height={30}
                  className="mr-4 h-[50px] w-[50px] rounded-full object-cover"
                  src={
                    user?.profilePicture
                      ? `${process.env.NEXT_PUBLIC_SERVER_URL}event/image/${user.profilePicture}`
                      : "https://via.placeholder.com/150"
                  }
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
                          src="/icons/ph_seal-check-fill (1).png"
                          className="max-w-[20px] max-h-[20px]"
                        />
                      </div>
                    ) : null}
                  </div>
                </div>{" "}
              </div>
              <div className="flex justify-between items-center cursor-pointer bg-[#DAE6F4] rounded-md p-2">
                <p className="text-mainBlue poppins-regular text-sm  flex  ">
                  <img alt="calendaricon" src="/icons/calendar-edit.png" />
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
              {new Date(firstFormData.startdate).toLocaleDateString("fr-FR", {
                day: "2-digit",
                month: "short",
              })}{" "}
              -{" "}
              {new Date(firstFormData.enddate).toLocaleDateString("fr-FR", {
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
              {firstFormData.startHour} - {firstFormData.endHour}
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
                firstFormData.location ? "Location.svg" : "globalDark.png"
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
                ) : null
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
                src="/icons/gps.png"
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
            {t("About")}{" "}
          </h3>
          <div className="flex mb-4 mt-3 ">
            {secondFormData.get("lieu") ? (
              <div className="flex mr-4">
                <img
                  alt="icon"
                  src="/icons/globalBlue.png"
                  className="max-w-[20px] max-h-[20px]"
                />
                <p className="poppins-medium">{secondFormData.get("lieu")}</p>
              </div>
            ) : null}
            {secondFormData.get("accessibilite") ? (
              <div className="flex mr-4 ">
                <img
                  alt="icon"
                  src="/icons/Ticket.png"
                  className="max-w-[20px] max-h-[20px]"
                />
                <p className="poppins-medium">
                  {secondFormData.get("accessibilite")}
                </p>
              </div>
            ) : null}
            {subscriptionData?.pack === "Business" ? (
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
            dangerouslySetInnerHTML={{ __html: firstFormData.eventDescription }}
            className="poppins-regular text-gray-800 list-disc list-inside"
          />
        </div>
        <div className="mt-4 poppins-semibold text-titles mb-t">
          <h3 className="text-2xl mb-3">Sponsors</h3>
          <div className="flex  ">
            {secondFormData
              ?.getAll("sponsorImages")
              .map((img: any, index: number) => (
                <div className=" flex items-center justify-center md:w-[128px]  md:h-[128px] w-[100px] h-[100px] rounded-lg border-[1.3px] mr-3 border-gray-300 p-[12px]">
                  <img
                    className="max-h-[90px] "
                    key={index}
                    alt={`sponsor-${index}`}
                    src={
                      img
                        ? URL.createObjectURL(img)
                        : "https://via.placeholder.com/300"
                    }
                  />
                </div>
              ))}
          </div>
        </div>
        <div className="mt-4 poppins-meduim">
          <h3 className="poppins-semibold text-2xl text-titles mb-3">Tags</h3>
          <div className="flex">
            {firstFormData?.tags?.map((tag: string, index: number) => (
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

export default EventDetails;
