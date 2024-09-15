"use client";
import withAuth from "@/components/shared/WithAuth";
import Subscription from "@/components/Subscription";
import CreateEvent from "@/components/Event/CreateEvent";
import { useGetSubscriptionQuery } from "@/store/features/api/apiSlice";
import { selectUser } from "@/store/features/userSlice";
import { useRouter } from "@/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Tarification from "@/components/Tarification";
import Validation from "@/components/Subscription/Validation";

function Page({ params: { pack } }: { params: { pack: string } }) {
  const user = useSelector(selectUser);
  const {
    data: fetchedSubscription,
    error,
    isLoading,
    refetch,
  } = useGetSubscriptionQuery(user.subscription, { skip: !user?.subscription });
  const router = useRouter();
  useEffect(() => {
    if (isLoading) {
      console.log("Loading events...");
    } else if (error) {
      console.error("Error fetching events:", error);
    } else if (fetchedSubscription) {
      console.log("Fetched subscription://///", fetchedSubscription);
    }
  }, [fetchedSubscription, error, isLoading]);

  console.log(fetchedSubscription);

  if (fetchedSubscription) {
    if (fetchedSubscription.validated) {
      if (
        !(
          (fetchedSubscription.pack === "Student" &&
            user?.eventsIds?.length >= 5) ||
          (fetchedSubscription.pack === "Starter" &&
            user?.eventsIds?.length >= 1)
        )
      )
        return <CreateEvent />;
      else return router.replace(`/profile/${user?._id}`);
    } else {
      return (
        <>
          <Validation />
        </>
      );
    }
  } else {
    return <Subscription pack={pack as string} />;
  }
}

export default withAuth(Page);
