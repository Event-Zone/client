"use client";

import ExploreComponent from "@/components/Explore";
import withAuth from "@/components/shared/WithAuth";
import React from "react";

function Explore() {
  return <ExploreComponent />;
}

export default withAuth(Explore);
