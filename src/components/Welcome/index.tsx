"use client";
import { useRouter } from "next/navigation";
import React from "react";

function Welcome() {
  const router = useRouter();
  return (
    <div className="flex flex-col justify-around items-center flex-1">
      <img alt="eventzone-logo" src="/Logo.png" />
      <h3 className="text-titles text-3xl ">Bienvenue sur EventZone!</h3>
      <p className="text-sm text-gray-600">
        Salutations ! Comment pouvons-nous vous soutenir dans votre parcours
        avec nous ?
      </p>
      <div className="flex flex-row justify-between">
        <div
          onClick={() => router.push("/explore")}
          className="border-gray-600 border-2 p-10 m-5 flex flex-col justify-center items-center rounded-lg cursor-pointer"
        >
          <div>
            <img alt="plus-icon" src="/ion_search.png" />
          </div>
          <h2 className="text-titles ml-14 mb-4 font-extrabold text-[30px]">
            Explorer des événements{" "}
          </h2>

          <button className="hover:bg-mainBlue hover:text-white border-gray-600 border-2 rounded-md px-5 py-2">
            Découvrez Nos événements{" "}
          </button>
        </div>
        <div
          onClick={() => router.push("/tarification")}
          className="border-gray-600 border-2 p-10 m-5 flex flex-col justify-center items-center rounded-lg cursor-pointer"
        >
          <div>
            <img alt="plus-icon" src="/ph_plus-bold.png" />
          </div>

          <h2 className="text-titles ml-14 mb-4 font-extrabold text-[30px]">
            Organiser des événements{" "}
          </h2>

          <button className=" hover:bg-mainBlue hover:text-white border-gray-600 border-2 rounded-md px-5 py-2">
            Ajoutez vos événements{" "}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
