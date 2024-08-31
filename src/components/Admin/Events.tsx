import { IEvent } from "@/types/Event";
import React, { useEffect, useState } from "react";
import Event from "./Event";
import { useGetEventsQuery } from "@/store/features/api/apiSlice";
import Progress from "../shared/Progress";
import Message from "../shared/Message";

function Events() {
  const [status, setStatus] = useState("pending");
  const [message, setMessage] = useState<any | null>(null);
  const {
    data: events,
    isLoading: eventsLoading,
    error: eventsError,
    refetch: refetchevents,
  } = useGetEventsQuery(status);
  useEffect(() => {
    refetchevents();
  }, [status]);
  useEffect(() => {
    if (eventsError) {
      setMessage({ type: 0, content: "Error evets" });
    }
  }, [eventsError]);
  return (
    <div className="bg-[#1A202C] p-6 rounded-lg h-[400px] ">
      {/* Tabs */}
      <div className="flex space-x-8 text-white text-lg mb-4">
        <button
          onClick={() => setStatus("pending")}
          className={` border-blue-500 ${status === "pending" && "border-b-4"}`}
        >
          Pending
        </button>
        <button
          onClick={() => setStatus("approved")}
          className={` border-blue-500 ${
            status === "approved" && "border-b-4"
          }`}
        >
          Approved
        </button>
        <button
          onClick={() => setStatus("rejected")}
          className={` border-blue-500 ${
            status === "rejected" && "border-b-4"
          }`}
        >
          Rejected
        </button>
        <button
          onClick={() => setStatus("passed")}
          className={` border-blue-500 ${status === "passed" && "border-b-4"}`}
        >
          Passed
        </button>
      </div>
      {/* Events Header */}
      <div className="grid grid-cols-6 text-[#94A3B8] py-3 border-b border-[#364153]">
        <div className="col-span-2">Events ({events?.length})</div>
        <div>Company</div>
        <div>Publish Date ⇵</div>
        <div>Event Date ⇵</div>
        <div>Action</div>
      </div>
      {/* Events List */}
      <div className="overflow-y-scroll h-[90%]">
        {events ? (
          events.map((event: any) => {
            return (
              <Event
                status={status}
                refetchEvents={refetchevents}
                key={event._id}
                event={event}
              />
            );
          })
        ) : (
          <>Loading events</>
        )}
      </div>
      {eventsLoading && <Progress />}
      {message && <Message message={message} />}
    </div>
  );
}

export default Events;
