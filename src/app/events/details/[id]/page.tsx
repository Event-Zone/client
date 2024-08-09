"use client";
import EventPage from "@/components/Event/EventPage";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useGetEventQuery } from "@/store/features/api/apiSlice";
function page() {
  const { id } = useParams();
  const {
    data: fetchedEvent,
    error,
    isLoading,
    refetch,
  } = useGetEventQuery(id as unknown as string);

  useEffect(() => {
    if (isLoading) {
      console.log("Loading event...");
    } else if (error) {
      console.error("Error fetching event:", error);
    } else if (fetchedEvent) {
      console.log("Fetched subscription:", fetchedEvent);
    }
  }, [fetchedEvent, error, isLoading]);
  if (isLoading)
    return <p className="text-3xl pippins-medium text-titles">Loading...</p>;
  return (
    <div>
      <EventPage data={fetchedEvent} />
    </div>
  );
}

export default page;
