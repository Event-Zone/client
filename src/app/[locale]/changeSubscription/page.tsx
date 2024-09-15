"use client";

import withAuth from "@/components/shared/WithAuth";
import ChangeSubscriptionComponent from "@/components/Tarification/ChangeSubscription";
import React from "react";

function ChangeSubscription() {
  return (
    <div>
      <ChangeSubscriptionComponent />
    </div>
  );
}

export default withAuth(ChangeSubscription);
