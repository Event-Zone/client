"use client";
import React, { useEffect, useState } from "react";
import EventForm from "./EventForm";
import ImagesForm from "./ImagesForm";
import EventDetails from "./EventDetails";
import Categorie from "../Home/Categorie";
import { useAddEventMutation } from "@/store/features/api/apiSlice";
import PostPublish from "./Postpublish";

function CreateEvent() {
  const [addEvent, addEventResult] = useAddEventMutation();

  const [page, setPage] = useState(0);
  const [firstFormData, setFirstFormData] = useState({
    location: "",
    eventName: "",
    eventAcronym: "",
    eventDescription: "",
    tags: [""], // Initialize tags as an empty array
    startdate: "",
    enddate: "",
    startHour: "",
    endHour: "",
    mobile: "",
    website: "",
    linkInscription: "",
    type: "",
    Categorie: "",
  });
  const [secondFormData, setSecondFormData] = useState(new FormData());

  const handlePublier = async () => {
    const combinedFormData = new FormData();

    // Append firstFormData fields to combinedFormData
    Object.keys(firstFormData).forEach((key) => {
      const value = (firstFormData as any)[key];
      combinedFormData.append(key, value);
    });

    // Append secondFormData fields to combinedFormData
    secondFormData.forEach((value, key) => {
      combinedFormData.append(key, value);
    });

    // Log all fields and values in combinedFormData

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
  return (
    <div className="flex justify-center items-center flex-col px-44 py-20">
      {page === 0 ? (
        <EventForm formData={firstFormData} setFormData={setFirstFormData} />
      ) : page === 1 ? (
        <ImagesForm formData={secondFormData} setFormData={setSecondFormData} />
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
          <div className="mb-4 mt-8 p-2 flex flex-row">
            {page !== 0 ? (
              <button
                onClick={() => setPage((prev) => prev - 1)}
                className="w-full rounded-md py-1 px-4 text-gray-500 poppins-medium text-center"
                type="button"
              >
                Precedent
              </button>
            ) : null}
            <button
              onClick={() => setPage((prev) => prev + 1)}
              className="w-full bg-mainBlue rounded-md py-1 px-4 text-white poppins-medium text-center"
              type="button"
            >
              Suivant
            </button>
          </div>
        ) : (
          <div className="mb-4 mt-8 p-2 flex flex-row">
            <button
              onClick={() => setPage((prev) => prev - 1)}
              className="w-full rounded-md py-1 px-4 text-gray-500 poppins-medium text-center"
              type="button"
            >
              Precedent
            </button>
            <button
              onClick={handlePublier}
              className="w-full bg-mainBlue rounded-md py-1 px-4 text-white poppins-medium text-center"
              type="button"
            >
              Publier
            </button>
          </div>
        )
      ) : null}
    </div>
  );
}

export default CreateEvent;
