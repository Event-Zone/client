"use client";
import React, { useEffect, useState } from "react";
import Cards from "./Card";
import Questions from "./Questions";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/features/userSlice";
import { useRouter } from "next/navigation";
import Progress from "@/components/shared/Progress"; // Import the Progress component
import Message from "@/components/shared/Message"; // Import the Message component
import Changecards from "./ChangeCards";

function ChangeSubscription() {
  const user = useSelector(selectUser);

  const [message, setMessage] = useState<{
    type: 0 | 1;
    content: string;
  } | null>(null);

  const router = useRouter();
  const [selected, setSelected] = useState("mensuel");
  const [selectedPrice, setSelectedPrice] = useState(4000);

  return (
    <div className="flex flex-col justify-center items-center">
      {message && <Message message={message} />}{" "}
      {/* Conditionally render the message dialog */}
      <h3 className="text-mainBlue font-extrabold font-poppins text-xl">
        Forfaits
      </h3>
      <h3 className="text-titles font-poppins text-[40px] font-normal leading-[60px] text-center">
        Tarification Simple et Transparente
      </h3>
      <p className="text-sm text-gray-600 font-poppins ">
        Des prix qui suivent la croissance de votre événement, vous ne paierez
        donc jamais plus que ce dont vous avez besoin, et entièrement gratuits
        pour les étudiants.
      </p>
      <div className="rounded-[20px] flex mt-4 overflow-hidden p-2 shadow-[0_0_10px_0_rgba(0,0,0,0.4)]">
        <button
          className={`rounded-[20px] p-5 flex-1 py-2 text-center transition-colors duration-700 ease-in-out ${
            selected === "mensuel"
              ? "bg-mainBlue text-white"
              : "bg-transparent text-mainBlue"
          }`}
          onClick={() => {
            setSelected("mensuel");
            setSelectedPrice(4000);
          }}
        >
          Mensuel
        </button>
        <button
          className={`flex-1 py-2 rounded-[20px] p-5  text-center transition-colors duration-700 ease-in-out ${
            selected === "annuel"
              ? "bg-mainBlue text-white"
              : "bg-transparent text-mainBlue"
          }`}
          onClick={() => {
            setSelected("annuel");
            setSelectedPrice(48000);
          }}
        >
          Annuel
        </button>
      </div>
      <Changecards price={selectedPrice} />
      <div className="mt-8 flex justify-center items-center overflow-hidden bg-mainBlue rounded-md">
        <button className="poppins-medium px-8 py-4 text-center text-white">
          Contacter le service commercial
        </button>
      </div>
      <Questions />
    </div>
  );
}

export default ChangeSubscription;
