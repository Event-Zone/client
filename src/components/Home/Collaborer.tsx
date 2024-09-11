"use client";

import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";

function Collaborer() {
  const router = useRouter();

  const handleAddEventClick = () => {
    router.push("/tarification");
  };

  return (
    <div className="">
      <div className="w-[90%] ml-14 my-3">
        <h2 className="text-titles ml-14 mb-4 poppins-extrabold text-[24px]">
          Collaborez avec
          <span className="text-mainBlue"> EventZone</span>
        </h2>
      </div>
      <div className="flex md:flex-row flex-col justify-around md:mx-20">
        <div
          className="p-10 m-5 flex flex-row bg-[#0052B408] rounded-3xl cursor-pointer"
          onClick={() => router.push("/search")}
        >
          <div>
            <img alt="search-icon" src="/icons/ion_search.png" />
          </div>
          <div>
            <div className="md:pl-8 pl-2 flex items-start flex-col">
              <h2 className="text-titles mb-4 poppins-semibold md:text-[24px]">
                Découvrez des événements{" "}
              </h2>
              <p className="text-gray-500 poppins-regular">
                Découvrez qui organise des événements dans vos domaines
                d'intérêt.
              </p>{" "}
              <button className="text-mainBlue poppins-medium md:text-[16px]">
                Rechercher des événements{" "}
              </button>
            </div>
          </div>
        </div>
        <div
          className="p-10 m-5 flex flex-row bg-[#0052B408] rounded-3xl cursor-pointer"
          onClick={handleAddEventClick}
        >
          <div>
            <img alt="plus-icon" src="/icons/ph_plus-bold.png" />
          </div>
          <div>
            <div className="pl-8 flex items-start flex-col">
              <h2 className="text-titles mb-4 poppins-semibold md:text-[24px]">
                Ajoutez votre événement{" "}
              </h2>
              <p className="text-gray-500 poppins-regular">
                Contribuez à l'Excellence Événementielle et Ajoutez Votre
                Événement avec EventZone.{" "}
              </p>{" "}
              <button className="text-mainBlue poppins-medium md:text-[16px]">
                Ajoutez votre événement{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Collaborer;
