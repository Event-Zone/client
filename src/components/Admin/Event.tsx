import { IEvent } from "@/types/Event";
import React, { useEffect, useState } from "react";
import {
  useGetSubscriptionQuery,
  useGetUserQuery,
  useUpdateEventStatusMutation,
} from "@/store/features/api/apiSlice";
import Progress from "../shared/Progress";
import Message from "../shared/Message";
import { useRouter } from "next/navigation";

function Event({
  status,
  event,
  refetchEvents,
}: {
  status: string;
  event: IEvent;
  refetchEvents: Function;
}) {
  useEffect(() => {
    console.log(status);
  }, [status]);
  const [message, setMessage] = useState<any | null>(null);
  const router = useRouter();
  const handleApprove = async () => {
    try {
      await updateStatus({ _id: event._id, status: "approved" });
    } catch (error) {
      console.error("Error updating status", error);
    }
  };
  const handleDecline = async () => {
    try {
      await updateStatus({ _id: event._id, status: "rejected" });
    } catch (error) {
      console.error("Error updating status", error);
    }
  };
  const handlePause = async () => {
    try {
      await updateStatus({ _id: event._id, status: "pending" });
    } catch (error) {
      console.error("Error updating status", error);
    }
  };
  const [updateStatus, updateStatusResult] = useUpdateEventStatusMutation();
  const {
    isLoading: userLoading,
    isError,
    data: userData,
  } = useGetUserQuery(event.organizerId, { skip: !event?.organizerId });
  const {
    isLoading: subLoading,
    isError: subIsError,
    data: subData,
  } = useGetSubscriptionQuery(userData?.subscription, {
    skip: !userData,
  });

  useEffect(() => {
    if (updateStatusResult.status === "fulfilled") {
      console.log(updateStatusResult);
      refetchEvents();
    } else if (updateStatusResult.status === "rejected") {
      setMessage({
        type: 0,
        content: updateStatusResult.error,
      });
    }
  }, [updateStatusResult]);

  return (
    <div>
      {" "}
      <div
        key={event._id}
        className="grid grid-cols-6 items-center py-3 border-b border-[#364153]"
      >
        <div className="flex col-span-2 items-center">
          <img
            src={`${process.env.NEXT_PUBLIC_SERVER_URL}event/image/${event.eventImages[0]}`}
            alt={event.eventName}
            className="h-14 w-14 rounded-lg mr-4"
          />
          <div>
            <p className="text-white poppins-bold">{event.eventName}</p>
            <p className="text-[#94A3B8]">{event.eventAcronym}</p>
          </div>
        </div>
        <div className="text-white">
          {subData?.company}
          <br />
        </div>
        <div className="text-white">
          {new Date(event.createdAt).toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </div>
        <div className="text-white">
          {new Date(event.startdate).toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </div>
        <div className="flex space-x-3">
          {(status === "rejected" || status === "pending") && (
            <button
              onClick={handleApprove}
              className="w-fit h-fit rounded-full"
            >
              <img
                src="/icons/Frame 1229.png"
                className="w-[40px] h-[40px]"
                alt="approve"
              />
            </button>
          )}
          {status === "approved" || status === "pending" ? (
            <button
              onClick={handleDecline}
              className="w-fit h-fit rounded-full"
            >
              <img src="/icons/Frame 1230.png" alt="reject" />
            </button>
          ) : null}
          {status === "approved" ? (
            <button onClick={handlePause} className="w-fit h-fit rounded-full">
              <img src="/icons/Frame 1229 (1).png" alt="reject" />
            </button>
          ) : null}
          <button
            onClick={() => router.push(`/events/details/${event._id}`)}
            className="w-fit h-fit rounded-full"
          >
            <img
              src="/icons/Frame 1303.png"
              className="w-[40px] h-[40px]"
              alt="view"
            />
          </button>
        </div>
      </div>
      {(isError || subIsError) && (
        <Message message={{ type: 0, content: "error" }} />
      )}
      {(userLoading || subLoading) && <Progress />}
    </div>
  );
}

export default Event;
