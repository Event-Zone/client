import React from "react";

function NextEvent() {
  return (
    <div className="w-full p-4">
      <div className="w-[90%] ml-14 my-3">
        <h2 className="text-3xl  font-extrabold text-titles mb-4">
          Prochains événements
        </h2>
      </div>
      <div className="flex space-x-4 mb-4 ml-10">
        <button className="px-4 py-2  text-gray-500 rounded">
          Conférences et Congrès
        </button>
        <button className="px-4 py-2  text-gray-500 rounded">Energy</button>
        <button className="px-4 py-2  text-gray-500 rounded">
          Tech & Innovation
        </button>
        <button className="px-4 py-2  text-gray-500 rounded">Business</button>
      </div>
      <div className="flex space-x-4 overflow-x-auto items-center justify-center w-full">
        <div className="w-[300px] flex-shrink-0 bg-white shadow-md rounded-lg overflow-hidden">
          <img
            alt="event-img"
            className="object-cover w-full h-48"
            src="https://via.placeholder.com/300x200"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold">Event Title</h3>
            <p className="text-gray-600 flex flex-row items-center ">
              <img alt="lcoation-icon" src="/LocationGray.png" />
              Location
            </p>
            <p className="text-gray-600 flex flex-row items-center ">
              {" "}
              <img alt="lcoation-icon" src="/CalendarGray.png" />
              Date
            </p>
          </div>
        </div>
        <div className="w-[300px] flex-shrink-0 bg-white shadow-md rounded-lg overflow-hidden">
          <img
            alt="event-img"
            className="object-cover w-full h-48"
            src="https://via.placeholder.com/300x200"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold">Event Title</h3>
            <p className="text-gray-600 flex flex-row items-center ">
              <img alt="lcoation-icon" src="/LocationGray.png" />
              Location
            </p>
            <p className="text-gray-600 flex flex-row items-center ">
              {" "}
              <img alt="lcoation-icon" src="/CalendarGray.png" />
              Date
            </p>
          </div>
        </div>
        <div className="w-[300px] flex-shrink-0 bg-white shadow-md rounded-lg overflow-hidden">
          <img
            alt="event-img"
            className="object-cover w-full h-48"
            src="https://via.placeholder.com/300x200"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold">Event Title</h3>
            <p className="text-gray-600 flex flex-row items-center ">
              <img alt="lcoation-icon" src="/LocationGray.png" />
              Location
            </p>
            <p className="text-gray-600 flex flex-row items-center ">
              {" "}
              <img alt="lcoation-icon" src="/CalendarGray.png" />
              Date
            </p>
          </div>
        </div>
        <div className="w-[300px] flex-shrink-0 bg-white shadow-md rounded-lg overflow-hidden">
          <img
            alt="event-img"
            className="object-cover w-full h-48"
            src="https://via.placeholder.com/300x200"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold">Event Title</h3>
            <p className="text-gray-600 flex flex-row items-center ">
              <img alt="lcoation-icon" src="/LocationGray.png" />
              Location
            </p>
            <p className="text-gray-600 flex flex-row items-center ">
              {" "}
              <img alt="lcoation-icon" src="/CalendarGray.png" />
              Date
            </p>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center items-center">
        <button className="mr-2 rounded-[10px] px-6 py-3 bg-mainBlue text-white text-center">
          Voir plus
        </button>
      </div>
    </div>
  );
}

export default NextEvent;
