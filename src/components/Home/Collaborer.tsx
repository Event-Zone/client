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
    <div>
      <div className="w-[90%] ml-14 my-3">
        <h2 className="text-titles ml-14 mb-4 poppins-extrabold text-[30px]">
          Collaborez avec
          <span className="text-mainBlue"> EventZone</span>
        </h2>
      </div>
      <div className="flex flex-row justify-around">
        <div className="p-10 m-5 flex flex-row bg-mainBlue bg-opacity-[.3] rounded-lg">
          <div>
            <img alt="search-icon" src="/icons/ion_search.png" />
          </div>
          <div>
            <h2 className="text-titles ml-9 mb-4 poppins-extrabold text-[30px]">
              Découvrez des événements
            </h2>
            <p className="text-titles">
              Découvrez qui organise des événements dans vos domaines d'intérêt.
            </p>
            <Link href="#" className="text-mainBlue">
              Rechercher des événements
            </Link>
          </div>
        </div>
        <div
          className="p-10 m-5 flex flex-row bg-mainBlue bg-opacity-[.3] rounded-lg cursor-pointer"
          onClick={handleAddEventClick}
        >
          <div>
            <img alt="plus-icon" src="/icons/ph_plus-bold.png" />
          </div>
          <div>
            <h2 className="text-titles ml-14 mb-4 poppins-extrabold text-[30px]">
              Ajoutez votre événement{" "}
            </h2>
            <p className="text-titles">
              Contribuez à l'Excellence Événementielle et Ajoutez Votre
              Événement avec EventZone.{" "}
            </p>
            <button className="text-mainBlue underline">
              Ajoutez votre événement{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Collaborer;
