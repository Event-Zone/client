"use client";
import withAuth from "@/components/shared/WithAuth";
import Subscription from "@/components/Subscription";

import { useParams } from "next/navigation";
import React from "react";

function Page() {
  const { packname } = useParams();

  return <Subscription pack={packname as string} />;
}

export default withAuth(Page);
