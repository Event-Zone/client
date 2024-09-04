"use client";
import AdminComponent from "@/components/Admin";
import withAuthAdmin from "@/components/shared/WithAuthAdmin";
import React from "react";

function Admin() {
  return <AdminComponent />;
}

export default withAuthAdmin(Admin);
