"use client";

import Link from "next/link";
import React from "react";
import { useRouter } from "@/navigation";
import { useTranslations } from "next-intl";

function Collaborer() {
  const router = useRouter();

  const handleAddEventClick = () => {
    router.push("/tarification");
  };
  const t = useTranslations("Collaborer");
  return (
    <div className="">
      <div className="w-[90%] my-3">
        <h2 className="text-titles lg:ml-2 mb-4  poppins-semibold lg:text-[24px]">
          {t.rich("description", {
            span: (chunks) => <span className="text-mainBlue">{chunks}</span>,
          })}
        </h2>
      </div>
      <div className="flex w-full lg:flex-row flex-col justify-around ">
        <div
          className="mt-2 sm:mt-0 lg:p-10 lg:m-1 p-4 flex flex-row bg-[#0052B408] rounded-3xl cursor-pointer"
          onClick={() => router.push("/search")}
        >
          <div>
            <img alt="search-icon" src="/icons/ion_search.svg" />
          </div>
          <div>
            <div className="lg:pl-8 pl-2 flex items-start flex-col">
              <h2 className="text-titles mb-4 poppins-semibold lg:text-[24px]">
                {t("discover")}
              </h2>
              <p className="text-gray-500 poppins-regular">
                {t("discoverDescription")}
              </p>{" "}
              <button className="text-mainBlue poppins-medium lg:text-[16px]">
                {t("rechercherEvenement")}
              </button>
            </div>
          </div>
        </div>
        <div
          className="mt-2 sm:mt-0 lg:p-10 lg:m-1 p-4 flex flex-row bg-[#0052B408] rounded-3xl cursor-pointer"
          onClick={handleAddEventClick}
        >
          <div>
            <img alt="plus-icon" src="/icons/ph_plus-bold.svg" />
          </div>
          <div>
            <div className="pl-8 flex items-start flex-col">
              <h2 className="text-titles mb-4 poppins-semibold lg:text-[24px]">
                {t("add")}
              </h2>
              <p className="text-gray-500 poppins-regular">
                {t("addDescription")}
              </p>{" "}
              <button className="text-mainBlue poppins-medium lg:text-[16px]">
                {t("ajoutEvenement")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Collaborer;
