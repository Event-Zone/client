"use client";
import Profile from "@/components/Profile";
import withAuth from "@/components/shared/WithAuth";
import React from "react";

function Page() {
  return <Profile />;
}

export default withAuth(Page);
