import {
  useGetSubscriptionQuery,
  useGetUserQuery,
} from "@/store/features/api/apiSlice";
import { IEvent } from "@/types/Event";
import Image from "next/image";
import { useRouter } from "@/navigation";
import React, { useEffect, useState } from "react";

interface EventCardProps {
  event: IEvent;
}

function EventCard({ event }: EventCardProps) {
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
  const [subscritionData, setSubscriptionData] = useState<any>(null);
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

  useEffect(() => {
    if (fetchedOrganizerIsLoading) {
      console.log("Loading events...");
    } else if (fetchedOrganizerError) {
      console.error("Error fetching events:", fetchedOrganizerError);
    } else if (fetchedOrganizer) {
      console.log(" fetchedOrganizer:", fetchedOrganizer);
    }
  }, [fetchedOrganizer, fetchedOrganizerError, fetchedOrganizerIsLoading]);
  const router = useRouter();
  return (
    <>
      <div
        onClick={() => router.replace(`/events/details/${event._id}`)}
        className="  flex flex-col sm:flex-row items-start sm:items-center mb-4  rounded-lg overflow-hidden "
      >
        <Image
          src={`${process.env.NEXT_PUBLIC_SERVER_URL}event/image/${event?.eventImages[0]}`}
          alt={event.eventName}
          className="w-full sm:w-[200px] md:w-[245px] rounded-md"
          width={500} // Specify width
          height={300} // Specify height
          quality={75} // Adjust quality to improve performance (default is 75)
          // placeholder="blur" // Optionally use a low-quality placeholder
        />
        <div className="p-4 w-full sm:w-2/3">
          <p className="text-gray-500 text-sm sm:text-base poppins-regular">
            {new Date(event.startdate).toLocaleDateString("fr-FR", {
              day: "2-digit",
              month: "short",
            })}{" "}
            -{" "}
            {new Date(event.enddate).toLocaleDateString("fr-FR", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </p>
          <h3 className="text-lg sm:text-lg poppins-semibold mb-2 text-ellipsis line-clamp-2 ">
            {event.eventAcronym && (
              <>
                {event.eventAcronym}
                {" - "}
              </>
            )}
            {event.eventName}
          </h3>
          <p className="text-gray-500 text-sm sm:text-md poppins-medium mb-2 flex">
            {event.location &&
              (event.location.address.commercial
                ? event.location.address.commercial
                : event.location.address.state)}
          </p>
          <div className="flex flex-wrap ">
            {event.lieu ? (
              <div className="flex items-center mr-4 mb-2">
                <img
                  alt="icon"
                  src="/icons/globalBlue.png"
                  className="w-[15px] h-[15px] sm:w-[20px] sm:h-[20px]"
                />
                <p className="poppins-medium text-mainBlue ml-2 text-sm sm:text-md">
                  Evenement {event.lieu}
                </p>
              </div>
            ) : null}
            {event.accessibilite ? (
              <div className="flex items-center mr-4 mb-2">
                <img
                  alt="icon"
                  src="/icons/Ticket.png"
                  className="w-[15px] h-[15px] sm:w-[20px] sm:h-[20px]"
                />
                <p className="poppins-medium text-mainBlue ml-2 text-sm sm:text-md">
                  {event.accessibilite}
                </p>
              </div>
            ) : null}
            {subscritionData?.pack === "Business" ? (
              <div className="flex items-center mb-2">
                <img
                  alt="icon"
                  src="/icons/ph_seal-check-fill (1).png"
                  className="w-[15px] h-[15px] sm:w-[20px] sm:h-[20px]"
                />
                <p className="poppins-medium text-mainBlue ml-2 text-sm sm:text-md">
                  {subscritionData?.company}
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default EventCard;
