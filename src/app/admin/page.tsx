"use client";
import Admin from "@/components/Admin";
import withAuthAdmin from "@/components/shared/WithAuthAdmin";
import React from "react";

function admin() {
  return <Admin />;
}

export default withAuthAdmin(admin);
