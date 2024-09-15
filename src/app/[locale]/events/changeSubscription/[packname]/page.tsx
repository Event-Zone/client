"use client";
import withAuth from "@/components/shared/WithAuth";
import Subscription from "@/components/Subscription";
import React from "react";

function Page({ params: { packname } }: { params: { packname: string } }) {
  return <Subscription pack={packname as string} />;
}

export default withAuth(Page);
