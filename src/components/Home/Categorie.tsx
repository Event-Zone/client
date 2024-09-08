import { useRouter } from "next/navigation";
import React from "react";

function Categorie() {
  const router = useRouter();
  return (
    <div className="w-full mr-[50px]">
      <div className="">
        <h2 className="text-titles ml-2 mb-4 poppins-semibold md:md:text-[24px] ">
          Les Catégories les plus Populaires
        </h2>
      </div>
      <div className="flex flex-row justify-between items-center w-full element-with-scrollbar overflow-x-scroll">
        <div
          className="flex flex-col items-center px-4 bg-mainBlue bg-opacity-5"
          onClick={() => router.replace("/search/business")}
        >
          <img
            alt="type-icon"
            src="/icons/Frame913.png"
            className="h-[100px]"
          />
          <p className="md:poppins-medium poppins-regular md:text-[13px]">
            Business
          </p>
        </div>
        <div
          className="flex flex-col items-center px-4 h-fit"
          onClick={() => router.replace("/search/technologie")}
        >
          <img
            alt="type-icon"
            src="/icons/Frame908.png"
            className="h-[100px]"
          />
          <p className="md:poppins-medium poppins-regular md:text-[13px]">
            Tech & innovation
          </p>
        </div>
        <div
          className="flex flex-col items-center px-4"
          onClick={() => router.replace("/search/education")}
        >
          <img
            alt="type-icon"
            src="/icons/Frame909.png"
            className="h-[100px]"
          />
          <p className="md:poppins-medium poppins-regular md:text-[13px]">
            Education
          </p>
        </div>
        <div
          className="flex flex-col items-center px-4"
          onClick={() => router.replace("/search/construction")}
        >
          <img
            alt="type-icon"
            src="/icons/Frame910.png"
            className="h-[100px]"
          />
          <p className="md:poppins-medium poppins-regular md:text-[13px]">
            Construction
          </p>
        </div>
        <div
          className="flex flex-col items-center px-4"
          onClick={() => router.replace("/search/healthcare & medical")}
        >
          <img
            alt="type-icon"
            src="/icons/Frame911.png"
            className="h-[100px]"
          />
          <p className="md:poppins-medium poppins-regular md:text-[13px]">
            Healthcare & Medical
          </p>
        </div>
        <div
          className="flex flex-col items-center px-4"
          onClick={() => router.replace("/search/human resources")}
        >
          <img
            alt="type-icon"
            src="/icons/Frame912.png"
            className="h-[100px]"
          />
          <p className="md:poppins-medium poppins-regular md:text-[13px]">
            Human Resources
          </p>
        </div>
      </div>
    </div>
  );
}

export default Categorie;
