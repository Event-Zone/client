"use client";
import { selectUser } from "@/store/features/userSlice";
import { useRouter } from "@/navigation";
import React from "react";
import { useSelector } from "react-redux";

function Validation() {
  const router = useRouter();
  const user = useSelector(selectUser);
  return (
    <div className="flex flex-col justify-around items-center flex-1">
      <img
        alt="eventzone-logo"
        src="/images/Logo.png"
        className="md:block hidden"
      />
      <h3 className="text-titles text-center poppins-semibold text-[24px] md:text-4xl ">
        Bienvenue sur EventZone!
      </h3>
      <p className="text-sm text-center text-gray-600 poppins-medium mx-4 md:mx-44">
        Votre compte a été créé et est en cours de vérification par notre
        équipe. Vous recevrez un appel de notre part dans les 24 prochaines
        heures pour finaliser la vérification de votre compte.
      </p>

      <div className=" md:p-10 m-5 flex flex-col md:flex-row justify-between items-center  rounded-lg cursor-pointer">
        <button
          onClick={() => router.replace(`/profile/${user?._id}`)}
          className="poppins-medium text-gray-500  md:mr-2 md:mb-0 mb-[3px] hover:bg-mainBlue hover:text-white border-gray-600 border-[1.4px] rounded-md px-9 py-[9px]"
        >
          Complète ton Profile{" "}
        </button>
        <button
          onClick={() => router.replace("/")}
          className="w-full poppins-medium  bg-mainBlue text-white rounded-md px-9 py-[9px]"
        >
          Page d'accueil{" "}
        </button>
      </div>
    </div>
  );
}

export default Validation;
