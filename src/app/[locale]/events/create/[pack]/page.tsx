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
import { selectSubscription } from "@/store/features/subscriptionSlice";

function Page({ params: { pack } }: { params: { pack: string } }) {
  const user = useSelector(selectUser);
  const fetchedSubscription = useSelector(selectSubscription);

  const router = useRouter();

  useEffect(() => {
    if (fetchedSubscription && pack)
      if (fetchedSubscription?.pack !== pack) router.replace("/");
  }, [fetchedSubscription, pack]);

  console.log(fetchedSubscription);

  if (fetchedSubscription && pack) {
    if (fetchedSubscription.validated) {
      if (
        !(
          (fetchedSubscription.pack === "Student" &&
            user?.eventsIds?.length >= 5) ||
          (fetchedSubscription.pack === "Starter" &&
            user?.eventsIds?.length >= 1)
        )
      )
        return <CreateEvent fetchedSubscription={fetchedSubscription} />;
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
