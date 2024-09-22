"use client";
// import { useParams } from "next/navigation";
import React from "react";
import { useUpdateUserPasswordMutation } from "@/store/features/api/apiSlice";
import EditPassword from "@/components/EditPassword";
import withAuth from "@/components/shared/WithAuth";
import Footer from "@/components/Footer";

function Page({ params: { id } }: { params: { id: string } }) {
  return (
    <>
      <EditPassword id={id as string} />{" "}
    </>
  );
}

export default withAuth(Page);
