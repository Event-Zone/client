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
      />
      <div className="py-4">
        <div className="flex w-full overflow-scroll element-with-scrollbar">
          <p className="whitespace-nowrap bg-[#206FDF1A] rounded-2xl text-mainBlue poppins-medium text-[12px] py-2 px-2">
            {event?.Categorie[0]}
          </p>
        </div>
        <h3 className="sm:text-xl poppins-semibold text-ellipsis text-[14px] line-clamp-3 text-titles">
          {event?.eventAcronym && <>{event.eventAcronym} - </>}
          {event?.eventName}
        </h3>
        {fetchedSubscription?.pack === "Business" ? (
          <div className=" my-2 flex text-[12px] sm:text-[14px] text-gray-600">
            <img
              alt="icon"
              src="/icons/ph_seal-check-fill (1).png"
              className=" max-w-[20px] max-h-[20px]"
            />
            {fetchedSubscription?.company}
          </div>
        ) : null}
        <p className="my-2 text-gray-600 text-[12px] sm:text-[14px] flex flex-row items-center">
          {event.location?.address?.commercial ? (
            <>
              <img alt="location-icon" src="/icons/LocationGray.png" />
              {event.location?.address?.commercial}
            </>
          ) : (
            event.location?.address?.state && (
              <>
                <img alt="location-icon" src="/icons/LocationGray.png" />
                {event.location?.address?.state}
              </>
            )
          )}
        </p>
        <p className="my-2 text-gray-600 text-[12px] sm:text-[14px] flex flex-row items-center">
          <img alt="calendar-icon" src="/icons/CalendarGray.png" />
          {event.startdate
            ? formatDate(event.startdate as unknown as string)
            : null}
        </p>
      </div>
    </>
  );
}

export default NextEventCard;
