import { IEvent } from "@/types/Event";
import React, { useEffect, useState } from "react";
import {
  useAddEventMutation,
  useAddOneMonthMutation,
  useGetSubscriptionQuery,
  useGetUserQuery,
  useUpdateEventStatusMutation,
} from "@/store/features/api/apiSlice";
import Progress from "../shared/Progress";
import Message from "../shared/Message";
import { useRouter } from "next/navigation";
import { useUpdateAdStatusMutation } from "@/store/features/api/apiSlice";

function Ad({
  setStatus,

  index,
  adds,
  status,
  event,
  refetchHero,
  refetchSearch,
}: {
  setStatus: Function;
  index: number;
  adds: any;
  status: number;
  event: any;
  refetchHero: Function;
  refetchSearch: Function;
}) {
  const [updateStatus, updateStatusResult] = useUpdateAdStatusMutation();
  useEffect(() => {
    console.log("adds", adds);
  }, [adds]);
  const [message, setMessage] = useState<any | null>(null);
  const router = useRouter();
  const handleApprove = async () => {
    try {
      if (status === 0)
        await updateStatus({ _id: adds[index]?._id, status: "running" });
      else await updateStatus({ _id: event?._id, status: "running" });
    } catch (error) {
      console.error("Error updating status", error);
    }
  };
  const handleDecline = async () => {
    try {
      if (status === 0)
        await updateStatus({ _id: adds[index]?._id, status: "ended" });
      else await updateStatus({ _id: event?._id, status: "ended" });
    } catch (error) {
      console.error("Error updating status", error);
    }
  };
  const handlePause = async () => {
    try {
      if (status === 0)
        await updateStatus({ _id: adds[index]?._id, status: "paused" });
      else await updateStatus({ _id: event?._id, status: "paused" });
    } catch (error) {
      console.error("Error updating status", error);
    }
  };
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
  const [add1Month, add1MonthResult] = useAddOneMonthMutation();
  useEffect(() => {
    if (updateStatusResult.status === "fulfilled") {
      console.log("fulfilled", updateStatusResult.data);
      refetchHero();
      refetchSearch();

      if (status === 0) {
        setStatus(1);
      } else setStatus(0);
    } else if (updateStatusResult.status === "rejected") {
      setMessage({
        type: 0,
        content: updateStatusResult.error,
      });
    }
  }, [updateStatusResult]);
  const handleAddMonth = async () => {
    try {
      console.log("add month");
      if (status === 0) await add1Month(adds[index]._id);
      else await add1Month(event._id);
    } catch (error) {
      console.error("Error updating status", error);
    }
  };
  const [showChoices, setShowChoices] = useState(false);
  useEffect(() => {
    if (add1MonthResult.status === "fulfilled") {
      refetchHero();
      refetchSearch();
      if (status === 0) setStatus(1);
      else setStatus(0);
      console.log("added");
    } else if (add1MonthResult.status === "rejected") {
      console.log(add1MonthResult.error);
    }
  }, [add1MonthResult]);
  if (!adds || adds?.length === 0) {
    console.log(adds);

    return null;
  }
  return (
    <div>
      <div
        key={event._id}
        className="grid grid-cols-6 items-center py-3 border-b border-[#364153]"
      >
        <div className="flex col-span-2 items-center">
          <img
            src={`${process.env.NEXT_PUBLIC_SERVER_URL}event/image/${
              status === 0 ? event.eventImages[0] : event.picture
            }`}
            alt={event.eventName}
            className="h-14 w-14 rounded-lg mr-4"
          />
          {status === 0 && (
            <div>
              <p className="text-white font-bold">{event.eventName}</p>
              <p className="text-[#94A3B8]">{event.eventAcronym}</p>
            </div>
          )}
        </div>
        <div className="text-white">
          {subData?.company}
          <br />
        </div>
        {status === 0 ? (
          <>
            <div className="text-white">
              {new Date(adds[index]?.createdAt).toLocaleDateString("fr-FR", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </div>
            <div className="text-white">
              {new Date(adds[index]?.endDate).toLocaleDateString("fr-FR", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </div>
          </>
        ) : (
          <>
            <div className="text-white">
              {new Date(event?.createdAt).toLocaleDateString("fr-FR", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </div>
            <div className="text-white">
              {new Date(event?.endDate).toLocaleDateString("fr-FR", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </div>
          </>
        )}
        <div className="flex space-x-3">
          {status === 0 ? (
            <>
              (
              {adds[index]?.status === "paused" && (
                <div className="w-fit h-fit bg-yellow-300 text-white poppins-regular p-3  rounded-2xl">
                  Paused
                </div>
              )}
              {adds[index]?.status === "running" && (
                <div className="w-fit h-fit bg-green-400 text-white poppins-regular p-3  rounded-2xl">
                  Running
                </div>
              )}
              {adds[index]?.status === "ended" && (
                <div className="w-fit h-fit bg-red-400 text-white poppins-regular p-3  rounded-2xl">
                  Ended
                </div>
              )}
              )
            </>
          ) : (
            <>
              (
              {event?.status === "paused" && (
                <div className="w-fit h-fit bg-yellow-300 text-white poppins-regular p-3  rounded-2xl">
                  Paused
                </div>
              )}
              {event?.status === "running" && (
                <div className="w-fit h-fit bg-green-400 text-white poppins-regular p-3  rounded-2xl">
                  Running
                </div>
              )}
              {event?.status === "ended" && (
                <div className="w-fit h-fit bg-red-400 text-white poppins-regular p-3  rounded-2xl">
                  Ended
                </div>
              )}
              )
            </>
          )}
          <div className="relative">
            <div
              className="cursor-pointer"
              onClick={() => setShowChoices(!showChoices)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
              </svg>
            </div>

            {showChoices && (
              <>
                {status === 0 ? (
                  <div className="text-white absolute top-10 right-0 w-40 z-50 bg-[#001029] p-2 rounded-md shadow-md">
                    {(adds[index]?.status === "paused" ||
                      adds[index]?.status === "ended") && (
                      <div
                        className="flex items-center justify-between py-1 px-2 cursor-pointer hover:bg-[#001022]"
                        onClick={handleApprove}
                      >
                        <span>Run</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                    {adds[index]?.status !== "ended" && (
                      <div
                        className="flex items-center justify-between py-1 px-2 cursor-pointer hover:bg-[#001022]"
                        onClick={handleDecline}
                      >
                        <span>End Ad</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm10-10a1 1 0 00-1-1H7a1 1 0 100 2h6a1 1 0 000-2zm-7 9a1 1 0 011-1h5a1 1 0 110 2H9a1 1 0 01-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                    {adds[index]?.status === "running" && (
                      <div
                        className="flex items-center justify-between py-1 px-2 cursor-pointer hover:bg-[#001022]"
                        onClick={handlePause}
                      >
                        <span>Pause Ad</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 9a1 1 0 000 2v4a1 1 0 11-2 0V9a1 1 0 012 0zm7-1a1 1 0 000 2v4a1 1 0 11-2 0V9a1 1 0 012 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                    {adds[index]?.status !== "ended" && (
                      <div
                        className="flex items-center justify-between py-1 px-2 cursor-pointer hover:bg-[#001022]"
                        onClick={handleAddMonth}
                      >
                        <span>Add 1 Month</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H9V9h2v2h1zm-4-4a1 1 0 100 2v2H7V9h2v2H8zm2 4a1 1 0 100 2v2H9V9h2v2h1zm2-8a1 1 0 111 0v2h2V9h-2v2h-1zm4 0a1 1 0 111 0v2h2V9h-2v2h-1zM3 11a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm10-10a1 1 0 000 2v2h2V9h-2v2h-1zm-4-4a1 1 0 100 2v2H9V9h2v2h1zm-4-4a1 1 0 111 0v2H7V9h2v2H8zm2 4a1 1 0 100 2v2H9V9h2v2h1zm2-8a1 1 0 111 0v2h2V9h-2v2h-1zm4 0a1 1 0 111 0v2h2V9h-2v2h-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-white absolute top-10 right-0 w-40 z-50 bg-[#001029] p-2 rounded-md shadow-md">
                    {(event?.status === "paused" ||
                      event?.status === "ended") && (
                      <div
                        className="flex items-center justify-between py-1 px-2 cursor-pointer hover:bg-[#001022]"
                        onClick={handleApprove}
                      >
                        <span>Run</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                    {event?.status !== "ended" && (
                      <div
                        className="flex items-center justify-between py-1 px-2 cursor-pointer hover:bg-[#001022]"
                        onClick={handleDecline}
                      >
                        <span>End Ad</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm10-10a1 1 0 00-1-1H7a1 1 0 100 2h6a1 1 0 000-2zm-7 9a1 1 0 011-1h5a1 1 0 110 2H9a1 1 0 01-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                    {event?.status === "running" && (
                      <div
                        className="flex items-center justify-between py-1 px-2 cursor-pointer hover:bg-[#001022]"
                        onClick={handlePause}
                      >
                        <span>Pause Ad</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 9a1 1 0 000 2v4a1 1 0 11-2 0V9a1 1 0 012 0zm7-1a1 1 0 000 2v4a1 1 0 11-2 0V9a1 1 0 012 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                    {event?.status !== "ended" && (
                      <div
                        className="flex items-center justify-between py-1 px-2 cursor-pointer hover:bg-[#001022]"
                        onClick={handleAddMonth}
                      >
                        <span>Add 1 Month</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H9V9h2v2h1zm-4-4a1 1 0 100 2v2H7V9h2v2H8zm2 4a1 1 0 100 2v2H9V9h2v2h1zm2-8a1 1 0 111 0v2h2V9h-2v2h-1zm4 0a1 1 0 111 0v2h2V9h-2v2h-1zM3 11a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm10-10a1 1 0 000 2v2h2V9h-2v2h-1zm-4-4a1 1 0 100 2v2H9V9h2v2h1zm-4-4a1 1 0 111 0v2H7V9h2v2H8zm2 4a1 1 0 100 2v2H9V9h2v2h1zm2-8a1 1 0 111 0v2h2V9h-2v2h-1zm4 0a1 1 0 111 0v2h2V9h-2v2h-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      {subIsError && <Message message={{ type: 0, content: "subs error" }} />}
      {(userLoading || subLoading || add1MonthResult.isLoading) && <Progress />}
    </div>
  );
}

export default Ad;
