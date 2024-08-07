"use client";
import React, { useState } from "react";
import EventForm from "./EventForm";
import ImagesForm from "./ImagesForm";

function CreateEvent() {
  const [page, setPage] = useState(0);
  return (
    <div className=" flex justify-center items-center flex-col p-44">
      {page === 0 ? <EventForm /> : page === 1 ? <ImagesForm /> : null}
      <div className="mb-4 mt-8 p-2 flex flex-row">
        <button
          onClick={() => setPage((prev) => prev - 1)}
          className="w-full rounded-md py-1 px-4 text-gray-500 poppins-medium text-center"
          type="button"
        >
          Precedent
        </button>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="w-full bg-mainBlue rounded-md py-1 px-4 text-white poppins-medium text-center"
          type="button"
        >
          Suivant
        </button>
      </div>
    </div>
  );
}

export default CreateEvent;
