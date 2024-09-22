"use client";
import { useRouter } from "@/navigation";
import { useTranslations } from "next-intl";
import React from "react";

function Welcome() {
  const router = useRouter();
  const t = useTranslations("welcome");

  return (
    <div className="flex flex-col justify-around items-center flex-1 mt-8">
      <img
        alt="eventzone-logo"
        src="/images/Logo.svg"
        className="md:w-auto md:h-auto w-[120px] h-[16px]"
      />
      <h3 className="text-titles text-md poppins-semibold my-3 ">
        {t("Bienvenue sur EventZone!")}
      </h3>
      <p className="  text-sm text-gray-600 text-center my-2">
        {t("salutation")}
      </p>
      <div className=" flex flex-col md:flex-row items-center justify-between">
        <div
          onClick={() => router.push("/explore")}
          className="mb-2 border-gray-600 border-[1.4px] md:p-10 p-5 md:m-5 flex flex-col justify-center items-center rounded-lg cursor-pointer"
        >
          <div>
            <img alt="plus-icon" src="/icons/ion_search.svg" />
          </div>
          <h2 className="text-titles md:ml-14 mb-4 poppins-extrabold md:text-[30px]">
            {t("Explorer des événements")}{" "}
          </h2>

          <button className="hover:bg-mainBlue hover:text-white border-gray-600 border-[1.4px] rounded-md px-5 py-2">
            {t("Découvrez Nos événements")}{" "}
          </button>
        </div>
        <div
          onClick={() => router.push("/tarification")}
          className="md:w-auto w-full border-gray-600 border-[1.4px] md:p-10 p-5 md:m-5 flex flex-col justify-center items-center rounded-lg cursor-pointer"
        >
          <div>
            <img alt="plus-icon" src="/icons/ph_plus-bold.svg" />
          </div>
          <h2 className="text-titles md:ml-14 mb-4 poppins-extrabold md:text-[30px]">
            {t("Organiser des événements")}{" "}
          </h2>

          <button className="hover:bg-mainBlue hover:text-white border-gray-600 border-[1.4px] rounded-md px-5 py-2">
            {t("Ajoutez vos événements")}{" "}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
