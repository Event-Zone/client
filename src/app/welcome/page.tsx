"use client";

import Register from "@/components/Auth/Register";
import withAuth from "@/components/shared/WithAuth";
import WelcomeComponent from "@/components/Welcome";
import React from "react";

function Welcome() {
  return <WelcomeComponent />;
}

export default withAuth(Welcome);
