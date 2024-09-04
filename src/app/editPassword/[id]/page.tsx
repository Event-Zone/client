"use client";
import { useParams } from "next/navigation";
import React from "react";
import { useUpdateUserPasswordMutation } from "@/store/features/api/apiSlice";
import EditPassword from "@/components/EditPassword";

function Page() {
  const { id } = useParams();
  return <EditPassword id={id as string} />;
}

export default Page;
