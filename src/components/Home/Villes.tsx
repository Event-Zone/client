import React from "react";

function Villes() {
  return (
    <div className="w-full p-4">
      <h2 className="text-titles ml-14 mb-4 font-extrabold text-[30px]">
        Villes populaires a <span className="text-mainBlue">EventZone</span>
      </h2>

      <div className="flex space-x-4 overflow-x-auto items-center justify-center w-full">
        <div className="w-[300px] flex-shrink-0 bg-white shadow-md rounded-lg overflow-hidden relative">
          <img
            alt="event-img"
            className="object-cover w-full h-48"
            src="/Frame 920.png"
          />{" "}
        </div>
        <div className="w-[300px] flex-shrink-0 bg-white shadow-md rounded-lg overflow-hidden relative">
          <img
            alt="event-img"
            className="object-cover w-full h-48"
            src="/Frame 643.png"
          />{" "}
        </div>
        <div className="w-[300px] flex-shrink-0 bg-white shadow-md rounded-lg overflow-hidden relative">
          <img
            alt="event-img"
            className="object-cover w-full h-48"
            src="/Frame 921.png"
          />{" "}
        </div>
        <div className="w-[300px] flex-shrink-0 bg-white shadow-md rounded-lg overflow-hidden relative">
          <img
            alt="event-img"
            className="object-cover w-full h-48"
            src="/Frame 922.png"
          />
        </div>
      </div>
    </div>
  );
}

export default Villes;
