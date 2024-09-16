"use client";

import Footer from "@/components/Footer";
import withAuth from "@/components/shared/WithAuth";
import TarificationComponenet from "@/components/Tarification";
import React from "react";

function Tarification() {
  return (
    <>
      <TarificationComponenet />
      <Footer />{" "}
    </>
  );
}

export default withAuth(Tarification);
