"use client";
import EventPage from "@/components/Event/EventPage";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useGetEventQuery } from "@/store/features/api/apiSlice";
import EditEvent from "@/components/Event/update/EditEvent";
import Progress from "@/components/shared/Progress";
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
  if (isLoading) return <Progress />;
  return (
    <div>
      <EditEvent event={fetchedEvent} />
    </div>
  );
}

export default page;
