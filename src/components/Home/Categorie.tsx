import React from "react";

function Categorie() {
  return (
    <div className="   w-full">
      <div className="">
        <h2 className="text-titles ml-14 mb-4 font-extrabold text-[30px]">
          Les Catégories les plus Populaires
        </h2>
      </div>
      <div className=" flex flex-row justify-around items-center w-full">
        <div className="flex flex-col items-center">
          <img alt="type-icon" src="/icons/Frame913.png" />
          <p>Business</p>
        </div>
        <div className="flex flex-col items-center">
          <img alt="type-icon" src="/icons/Frame908.png" />
          <p>Business</p>
        </div>
        <div className="flex flex-col items-center">
          <img alt="type-icon" src="/icons/Frame909.png" />
          <p>Business</p>
        </div>
        <div className="flex flex-col items-center">
          <img alt="type-icon" src="/icons/Frame910.png" />
          <p>Business</p>
        </div>
        <div className="flex flex-col items-center">
          <img alt="type-icon" src="/icons/Frame911.png" />
          <p>Business</p>
        </div>
        <div className="flex flex-col items-center">
          <img alt="type-icon" src="/icons/Frame912.png" />
          <p>Business</p>
        </div>
      </div>
    </div>
  );
}

export default Categorie;
