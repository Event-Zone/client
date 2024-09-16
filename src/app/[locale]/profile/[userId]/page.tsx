"use client";
import Footer from "@/components/Footer";
import Profile from "@/components/Profile";
import withAuth from "@/components/shared/WithAuth";
import React from "react";

function Page({ params: { userId } }: { params: { userId: string } }) {
  return (
    <>
      <Profile params={{ userId }} />
      <Footer />
    </>
  );
}

export default withAuth(Page);
