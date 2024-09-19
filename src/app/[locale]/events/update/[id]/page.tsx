"use client";
import EventPage from "@/components/Event/EventPage";
import React, { useEffect } from "react";
import {
  useGetEventQuery,
  useGetSubscriptionQuery,
} from "@/store/features/api/apiSlice";
import EditEvent from "@/components/Event/update/EditEvent";
import Progress from "@/components/shared/Progress";
import withAuth from "@/components/shared/WithAuth";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/features/userSlice";
function Page({ params: { id } }: { params: { id: string } }) {
  const {
    data: fetchedEvent,
    error,
    isLoading,
    refetch,
  } = useGetEventQuery(id as unknown as string);
  const user = useSelector(selectUser);
  useEffect(() => {
    if (isLoading) {
      console.log("Loading event...");
    } else if (error) {
      console.error("Error fetching event:", error);
    } else if (fetchedEvent) {
      console.log("Fetched subscription:", fetchedEvent);
    }
  }, [fetchedEvent, error, isLoading]);
  const {
    data: fetchedSubscription,
    error: subsError,
    isLoading: subsLoading,
  } = useGetSubscriptionQuery(user.subscription, { skip: !user?.subscription });
  useEffect(() => {
    if (isLoading) {
      console.log("Loading events...");
    } else if (error) {
      console.error("Error fetching events:", error);
    } else if (fetchedSubscription) {
      console.log("Fetched subscription://///", fetchedSubscription);
    }
  }, [fetchedSubscription, error, isLoading]);

  if (isLoading || subsLoading) return <Progress />;
  return (
    <div>
      <EditEvent
        fetchedSubscription={fetchedSubscription}
        event={fetchedEvent}
      />
    </div>
  );
}

export default withAuth(Page);
