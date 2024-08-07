"use client";
import withAuth from "@/components/shared/WithAuth";
import Subscription from "@/components/Subscription";
import CreateEvent from "@/components/Event/CreateEvent";
import { useGetSubscriptionQuery } from "@/store/features/api/apiSlice";
import { selectUser } from "@/store/features/userSlice";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

function page() {
  const user = useSelector(selectUser);
  const { pack } = useParams();
  const {
    data: fetchedSubscription,
    error,
    isLoading,
    refetch,
  } = useGetSubscriptionQuery(user.subscription);

  useEffect(() => {
    if (isLoading) {
      console.log("Loading events...");
    } else if (error) {
      console.error("Error fetching events:", error);
    } else if (fetchedSubscription) {
      console.log("Fetched subscription:", fetchedSubscription);
    }
  }, [fetchedSubscription, error, isLoading]);

  console.log(fetchedSubscription);
  if (fetchedSubscription?.validated) {
    return <CreateEvent />;
  } else {
    return <Subscription pack={pack as string} />;
  }
}

export default withAuth(page);
