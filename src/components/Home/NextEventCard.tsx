import {
  useGetSubscriptionQuery,
  useGetUserQuery,
} from "@/store/features/api/apiSlice";
import Image from "next/image";
import React from "react";

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const options = { day: "numeric", month: "long", year: "numeric" } as const;
  return new Intl.DateTimeFormat("en-US", options).format(date);
}
function NextEventCard({ event }: { event: any }) {
  const {
    data: fetchedOrganizer,
    error: fetchedOrganizerError,
    isLoading: fetchedOrganizerIsLoading,
  } = useGetUserQuery(event.organizerId);

  // getting the subscription data
  const {
    data: fetchedSubscription,
    error: subscriptionError,
    isLoading: subscriptionIsLoading,
    refetch,
  } = useGetSubscriptionQuery(fetchedOrganizer?.subscription, {
    skip: !fetchedOrganizer,
  });
  return (
    <>
      <div className=" relative  h-fit">
        <Image
          alt="event-img"
          className="lg:w-full  md:h-[187px] w-full max-h-[187px] object-cover"
          src={
            event.eventImages
              ? `${process.env.NEXT_PUBLIC_SERVER_URL}event/image/${event.eventImages[0]}`
              : "https://via.placeholder.com/300x200"
          }
          width={500}
          height={300}
          quality={75}
        />{" "}
        <div className=" absolute bottom-3 left-3  w-fit overflow-scroll element-with-scrollbar">
          <p className="whitespace-nowrap bg-[#E9F1FC]  rounded-md text-mainBlue poppins-medium text-[12px] py-2 px-2">
            {event?.Categorie[0]}
          </p>
        </div>{" "}
      </div>
      <div className="md:mx-0 mx-4 ">
        <h3 className="mt-2 sm:text-md poppins-semibold text-ellipsis text-[14px] line-clamp-3 text-titles">
          {event?.eventAcronym && <>{event.eventAcronym} - </>}
          {event?.eventName}
        </h3>
        {fetchedSubscription?.pack === "Business" ? (
          <div className=" md:w-auto w-fit px-1 md:bg-transparent bg-[#F9F9F9] rounded-md md:mx-0  my-2 flex text-[12px] sm:text-[14px] text-gray-600">
            <img
              alt="icon"
              src="/icons/ph_seal-check-fill (1).svg"
              className="mr-2 max-w-[20px] max-h-[20px]"
            />
            {fetchedSubscription?.company}
          </div>
        ) : null}
        {event.location?.address?.commercial && (
          <p className="    md:w-auto w-fit px-1 pl-1 py-1 my-2 md:bg-transparent bg-[#F9F9F9] rounded-md md:mx-0   text-gray-600 text-[12px] sm:text-[14px] flex flex-row items-center">
            {event.location?.address?.commercial ? (
              <>
                <img
                  className="mr-2"
                  alt="location-icon"
                  src="/icons/LocationGray.svg"
                />
                <p className="text-ellipsis line-clamp-1">
                  {event.location?.address?.commercial}
                </p>
              </>
            ) : (
              event.location?.address?.state && (
                <>
                  <img
                    className="mr-2"
                    alt="location-icon"
                    src="/icons/LocationGray.svg"
                  />{" "}
                  <p className="text-ellipsis line-clamp-1">
                    {event.location?.address?.state}
                  </p>
                </>
              )
            )}
          </p>
        )}
        <p className="md:w-auto w-fit px-1 md:bg-transparent bg-[#F9F9F9] rounded-md md:mx-0  py-1 pl-1 my-2 text-gray-600 text-[12px] sm:text-[14px] flex flex-row items-center">
          <img
            className="mr-2"
            alt="calendar-icon"
            src="/icons/CalendarGray.svg"
          />
          {event.startdate
            ? formatDate(event.startdate as unknown as string)
            : null}
        </p>
      </div>
    </>
  );
}

export default NextEventCard;
