"use client";
import React, { useEffect, useState } from "react";
import EventForm from "./UEventForm";
import ImagesForm from "./ImagesForm";
import EventDetails from "./EventDetails";
import PostPublish from "./PostPublish";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/features/userSlice";
import { useUpdateEventMutation } from "@/store/features/api/apiSlice";
import { combineReducers } from "@reduxjs/toolkit";
import { useRouter } from "next/navigation";
function EditEvent({ event }: { event: any }) {
  const [isNext1, setIsNext1] = useState(false);
  const [isNext2, setIsNext2] = useState(false);

  const {
    link,
    location,
    eventName,
    eventAcronym,
    eventDescription,
    tags,
    startdate,
    enddate,
    startHour,
    endHour,
    mobile,
    website,
    linkInscription,
    type,
    Categorie,

    accessibilite,
    portee,
    public: publicData,
    lieu,
    sponsorImages: sponsorImagesData,
    eventImages: eventImagesData,
  } = event;

  const [updateEvent, updateEventResult] = useUpdateEventMutation();
  const user = useSelector(selectUser);
  const [page, setPage] = useState(0);
  const [firstFormData, setFirstFormData] = useState<any>({
    link,
    location,
    eventName,
    eventAcronym,
    eventDescription,
    tags,
    startdate,
    enddate,
    startHour,
    endHour,
    mobile,
    website,
    linkInscription,
    type,
    Categorie,
  });
  const [secondFormData, setSecondFormData] = useState(new FormData());
  const router = useRouter();
  const handlePublier = async () => {
    console.log("Publier");
    const combinedFormData = new FormData();

    // Helper function to compare data
    const compareAndAppend = (key: string, value: any, originalValue: any) => {
      if (JSON.stringify(value) !== JSON.stringify(originalValue)) {
        combinedFormData.append(key, value);
      }
    };

    // Compare and append firstFormData
    Object.keys(firstFormData).forEach((key) => {
      const value = (firstFormData as any)[key];
      const originalValue = (event as any)[key];

      // Special handling for location (stringified comparison)
      if (key === "location" && value) {
        compareAndAppend(
          key,
          JSON.stringify(value),
          JSON.stringify(originalValue)
        );
      } else if (value !== null && value !== "") {
        compareAndAppend(key, value, originalValue);
      }
    });

    // Append the secondFormData (assuming files are always new)
    secondFormData.forEach((value, key) => {
      combinedFormData.append(key, value);
    });

    // Append the event ID
    combinedFormData.append("_id", event._id);
    combinedFormData.forEach((value, key) => {
      console.log(`LLL${key}: ${value}`);
    }); // Call the mutation
    await updateEvent(combinedFormData);
  };

  useEffect(() => {
    if (updateEventResult.status === "fulfilled") {
      // setPage(3);
      console.log("Event updated successfully");
      alert("Event updated successfully");
      router.replace("/");
    } else if (updateEventResult.status === "rejected") {
      console.log(updateEventResult.error);
    } else if (updateEventResult.status === "pending") {
      console.log("pending");
    }
  }, [updateEventResult]);

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
              Informations principales
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
              Aperçu de l'événement
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
              Publier
            </p>
          </div>
        </div>
      ) : null}
      {page === 0 ? (
        <EventForm
          setIsNext={setIsNext1}
          formData={firstFormData}
          setFormData={setFirstFormData}
        />
      ) : page === 1 ? (
        <ImagesForm
          sponsorImagesData={sponsorImagesData}
          eventImagesData={eventImagesData}
          formValuesData={{ accessibilite, portee, public: publicData, lieu }}
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
                Precedent
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
                Suivant
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
              Precedent
            </button>
            <button
              onClick={handlePublier}
              className="w-full bg-mainBlue rounded-md py-1 px-2 md:px-4 text-white poppins-medium text-sm md:text-md text-center"
              type="button"
            >
              Sauvegarder
            </button>
          </div>
        )
      ) : null}
    </div>
  );
}

export default EditEvent;
