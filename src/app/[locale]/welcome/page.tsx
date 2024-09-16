"use client";

import Register from "@/components/Auth/Register";
import Footer from "@/components/Footer";
import withAuth from "@/components/shared/WithAuth";
import WelcomeComponent from "@/components/Welcome";
import React from "react";

function Welcome() {
  return (
    <>
      <WelcomeComponent /> <Footer />
    </>
  );
}

export default withAuth(Welcome);
