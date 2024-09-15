"use client";

import withAuth from "@/components/shared/WithAuth";
import Validation from "@/components/Subscription/Validation";
import React from "react";

function Page() {
  return <Validation />;
}

export default withAuth(Page);
