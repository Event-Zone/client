"use client";
import React, { useEffect, useState } from "react";
import Cards from "./Card";
import Questions from "./Questions";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/features/userSlice";
import { useRouter } from "@/navigation";
import { useGetSubscriptionQuery } from "@/store/features/api/apiSlice";
import Progress from "@/components/shared/Progress"; // Import the Progress component
import Message from "@/components/shared/Message"; // Import the Message component
import { useTranslations } from "next-intl";

function Tarification() {
  const [hovered, setHovered] = useState(false);

  const user = useSelector(selectUser);

  const {
    data: fetchedSubscription,
    error,
    isLoading,
    refetch,
  } = useGetSubscriptionQuery(user?.subscription, {
    skip: !user?.subscription,
  });

  const [message, setMessage] = useState<{
    type: 0 | 1;
    content: string;
  } | null>(null);

  useEffect(() => {
    if (isLoading) {
      console.log("Loading events...");
    } else if (error) {
      console.error("Error fetching events:", error);
      setMessage({ type: 0, content: "Error fetching events" });
    } else if (fetchedSubscription) {
      console.log("Fetched events:", fetchedSubscription);
      setMessage({ type: 1, content: "Fetched events successfully" });
    }
  }, [fetchedSubscription, error, isLoading]);

  const router = useRouter();
  const [selected, setSelected] = useState("mensuel");
  const [selectedPrice, setSelectedPrice] = useState(4000);

  useEffect(() => {
    if (fetchedSubscription) {
      router.push(`/events/create/${fetchedSubscription.pack}`);
    }
  }, [fetchedSubscription]);
  const t = useTranslations("tarification");
  return (
    <div className="mt-4 flex flex-col justify-center items-center">
      {message && <Message message={message} />}{" "}
      {/* Conditionally render the message dialog */}
      <h3 className="text-mainBlue poppins-semibold  text-[18px]">Packs</h3>
      <h3 className="text-titles poppins-regular text-[40px]  leading-[60px] text-center">
        {t("Simple")}
        <br /> {t("Simple2")}
      </h3>
      <p className="text-sm text-gray-600 poppins-regular ">{t("des")}</p>
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
          {t("Mensuel")}
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
          {t("Annuel")}
        </button>
      </div>
      <Cards price={selectedPrice} />
      <div
        onMouseLeave={() => setHovered(false)}
        onMouseEnter={() => setHovered(true)}
        className="mt-8 flex justify-center items-center overflow-hidden bg-mainBlue rounded-md"
      >
        <button className="poppins-medium px-8 py-4 text-center text-white">
          {!hovered ? (
            <> {t("Contacter le service commercial")}</>
          ) : (
            <>+213 781 45 75 11 </>
          )}
        </button>
      </div>
      <Questions />
      {isLoading && <Progress />} {/* Conditionally render the spinner */}
    </div>
  );
}

export default Tarification;
