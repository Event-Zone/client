import { selectUser } from "@/store/features/userSlice";
import { useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

function PostPublish() {
  const router = useRouter();
  const user = useSelector(selectUser);

  return (
    <div className="flex flex-col justify-center items-center ">
      {user ? (
        <>
          <div className="flex flex-col items-center justify-center mb-8">
            <img
              alt="confirmedIcon"
              src="/icons/ph_seal-check.png"
              className="w-[100px] h-[100px] rounded-3xl"
            />
            <img alt="logo" src="/icons/Logo.png" className="" />
          </div>
          <div>
            <h3 className="mb-8 text-center text-3xl poppins-semibold text-titles">
              Votre événement est en cours de revision
            </h3>
            <p className=" mb-8 text-center text-md text-gray-500 poppins-regular">
              Merci d'avoir soumis votre événement sur EventZone ! Votre
              publication d'événement est actuellement en cours de révision par
              notre équipe. Vous recevrez une notification par e-mail une fois
              que votre événement sera publié et visible sur notre plateforme.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <button
              onClick={() => router.push(`/profile/${user._id}`)}
              className="border-[1.4px] mr-4 border-gray-500  hover:bg-mainBlue-dark text-gray-500 font-medium text-sm rounded-md py-2 px-10"
            >
              Mes evenement{" "}
            </button>
            <button
              onClick={() => router.replace("/")}
              className="bg-mainBlue hover:bg-mainBlue-dark text-white font-medium text-sm rounded-md py-2 px-10"
            >
              page d'accueil
            </button>
          </div>
        </>
      ) : (
        <>Loading</>
      )}
    </div>
  );
}

export default PostPublish;
