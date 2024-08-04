import React from "react";

function Navbar() {
  return (
    // check The responsiveness bug
    <div className="flex z-50 items-center justify-between p-4 text-white max-w-full sticky top-0 bg-white">
      <div className="flex items-center ml-10">
        <img src="/NavbarLogo.svg" alt="Navbar Logo" className="" />
      </div>
      <div className="flex flex-grow mx-14 rounded-[10px] border-gray-500 border overflow-hidden">
        <div className="relative flex-grow">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <img
              src="/Search.svg"
              alt="Search Icon"
              className="h-5 w-5 text-gray-500"
            />
          </span>
          <input
            type="text"
            placeholder="Search"
            className="p-2 pl-10 w-full text-gray-700 outline-none focus:outline-none border-0"
          />
        </div>
        <div className="border-l border-gray-500"></div>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <img
              src="/Location.svg"
              alt="Location Icon"
              className="h-5 w-5 text-gray-500"
            />
          </span>
          <select className="p-2 pl-10 text-gray-500 focus:outline-none">
            <option value="us" className="text-gray-500" defaultChecked>
              Alger
            </option>
            <option value="ca" className="text-gray-500">
              CA
            </option>
            <option value="uk" className="text-gray-500">
              UK
            </option>
          </select>
        </div>

        <div className="bg-mainBlue p-2">
          <img src="/Search.svg" alt="search-icon" className="text-white" />
        </div>
      </div>
      <div className="border-gray-500 mx-5">
        <div className="relative">
          <select className="p-2 pl-10 text-gray-500 focus:outline-none">
            <option value="en" className="text-gray-500" defaultChecked>
              English
            </option>
            <option value="fr" className="text-gray-500">
              French
            </option>
            <option value="ar" className="text-gray-500">
              Arabic
            </option>
          </select>
        </div>
      </div>
      <div className="flex items-center">
        <button className="px-10 py-2 text-mainBlue rounded-md">
          Se connecter
        </button>
        <button className="px-10 py-2 bg-mainBlue rounded-md">
          S'inscrire
        </button>
      </div>
    </div>
  );
}

export default Navbar;
