"use client";

import withAuth from "@/components/shared/WithAuth";
import TarificationComponenet from "@/components/Tarification";
import React from "react";

function Tarification() {
  return <TarificationComponenet />;
}

export default withAuth(Tarification);
