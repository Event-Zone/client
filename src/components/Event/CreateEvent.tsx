"use client";
import React, { useEffect, useState } from "react";
import EventForm from "./EventForm";
import ImagesForm from "./ImagesForm";
import EventDetails from "./EventDetails";
import { useAddEventMutation } from "@/store/features/api/apiSlice";
import PostPublish from "./Postpublish";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/features/userSlice";
import Progress from "../shared/Progress";
import { useTranslations } from "next-intl";
import { selectSubscription } from "@/store/features/subscriptionSlice";

function CreateEvent() {
  const fetchedSubscription = useSelector(selectSubscription);
  const [isNext1, setIsNext1] = useState(false);
  const [isNext2, setIsNext2] = useState(false);

  const [addEvent, addEventResult] = useAddEventMutation();
  const user = useSelector(selectUser);
  const [page, setPage] = useState(0);
  const [firstFormData, setFirstFormData] = useState<any>({
    link: null,
    location: null,
    eventName: null,
    eventAcronym: null,
    eventDescription: null,
    tags: [],
    startdate: null,
    enddate: null,
    startHour: null,
    endHour: null,
    mobile: null,
    website: null,
    linkInscription: null,
    type: null,
    Categorie: [],
  });
  const [secondFormData, setSecondFormData] = useState(new FormData());

  const handlePublier = async () => {
    const combinedFormData = new FormData();
    if (firstFormData.location) {
      firstFormData.location = JSON.stringify(firstFormData.location);
    }
    Object.keys(firstFormData).forEach((key) => {
      const value = (firstFormData as any)[key];
      if (value !== null && value !== "") combinedFormData.append(key, value);
    });
    secondFormData.forEach((value, key) => {
      combinedFormData.append(key, value);
    });
    combinedFormData.append("organizerId", user._id);
    await addEvent(combinedFormData);
  };

  useEffect(() => {
    if (addEventResult.status === "fulfilled") {
      setPage(3);
    } else if (addEventResult.status === "rejected") {
      console.log(addEventResult.error);
    } else if (addEventResult.status === "pending") {
      console.log("pending");
    }
  }, [addEventResult]);
  const t = useTranslations("Event");

  return (
    <div className="flex md:justify-center md:items-center flex-col px-1 md:px-20 lg:px-44 py-10 md:py-20">
      {page !== 3 ? (
        <div className="flex justify-center items-center mb-6 md:mb-8">
          <div className="flex flex-row items-center justify-center mr-2 md:mr-4">
            <img
              alt="icon"
              className="w-[30px] h-[30px] md:max-w-[50px] md:max-h-[50px] mr-2 md:mr-4"
              src={`/icons/${
                page === 0 ? "Frame 1174.png" : "submittedIcon.png"
              }`}
            />
            <p className="md:block hidden text-sm md:text-md text-titles poppins-medium">
              {t("Info")}
            </p>
          </div>
          <div className="w-[70px] md:w-[100px] h-[2px] md:h-[3px] bg-gray-500 rounded-3xl"></div>
          <div className="flex flex-row items-center justify-center mr-2 md:mr-4">
            <img
              alt="icon"
              className="w-[30px] h-[30px] md:max-w-[50px] md:max-h-[50px] mr-2 md:mr-4"
              src={`/icons/${
                page === 0
                  ? "Frame 1174 (1).png"
                  : page === 1
                  ? "Frame 1174 (5).png"
                  : "submittedIcon.png"
              }`}
            />
            <p className="md:block hidden text-sm md:text-md text-titles poppins-medium">
              {t("Apercu")}
            </p>
          </div>
          <div className="w-[70px] md:w-[100px] h-[2px] md:h-[3px] bg-gray-500 rounded-3xl"></div>
          <div className="flex flex-row items-center justify-center">
            <img
              alt="icon"
              className="w-[30px] h-[30px] md:max-w-[50px] md:max-h-[50px] mr-2 md:mr-4"
              src={`/icons/${
                page === 0 || page === 1
                  ? "Frame 1174 (2).png"
                  : "Frame 1174 (7).png"
              }`}
            />
            <p className=" md:block hidden text-sm md:text-md text-titles poppins-medium">
              {t("Publier")}
            </p>
          </div>
        </div>
      ) : null}
      {page === 0 ? (
        <EventForm
          fetchedSubscription={fetchedSubscription}
          setIsNext={setIsNext1}
          formData={firstFormData}
          setFormData={setFirstFormData}
        />
      ) : page === 1 ? (
        <ImagesForm
          fetchedSubscription={fetchedSubscription}
          setIsNext={setIsNext2}
          formData={secondFormData}
          setFormData={setSecondFormData}
        />
      ) : page === 2 ? (
        <EventDetails
          firstFormData={firstFormData}
          secondFormData={secondFormData}
        />
      ) : page === 3 ? (
        <PostPublish />
      ) : null}
      {page !== 3 ? (
        page !== 2 ? (
          <div className="mb-2 md:mb-4 mt-4 md:mt-8 p-2 flex flex-row">
            {page !== 0 ? (
              <button
                onClick={() => setPage((prev) => prev - 1)}
                className="w-full rounded-md py-1 px-2 md:px-4 text-gray-500 poppins-medium text-sm md:text-md text-center"
                type="button"
              >
                {" "}
                {t("Precedent")}
              </button>
            ) : null}
            {page !== 3 ? (
              <button
                disabled={(!isNext1 && page === 0) || (!isNext2 && page === 1)}
                onClick={(e) => {
                  e.preventDefault();
                  setPage((prev) => prev + 1);
                }}
                className={`w-full rounded-md py-1 px-2 md:px-4 text-white poppins-medium text-sm md:text-md text-center ${
                  (isNext1 && page === 0) || (isNext2 && page === 1)
                    ? "bg-mainBlue"
                    : "bg-gray-200"
                }`}
                type="button"
              >
                {t("Suivant")}
              </button>
            ) : null}
          </div>
        ) : (
          <div className="mb-2 md:mb-4 mt-4 md:mt-8 p-2 flex flex-row">
            <button
              onClick={() => setPage((prev) => prev - 1)}
              className="w-full rounded-md py-1 px-2 md:px-4 text-gray-500 poppins-medium text-sm md:text-md text-center"
              type="button"
            >
              {t("Precedent")}
            </button>
            <button
              onClick={handlePublier}
              className="w-full bg-mainBlue rounded-md py-1 px-2 md:px-4 text-white poppins-medium text-sm md:text-md text-center"
              type="button"
            >
              {t("Publier")}
            </button>
          </div>
        )
      ) : null}
      {addEventResult.status === "pending" && <Progress />}
    </div>
  );
}

export default CreateEvent;
