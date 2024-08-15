import { useRouter } from "next/navigation";
import React from "react";

function Categorie() {
  const router = useRouter();
  return (
    <div className="   w-full">
      <div className="">
        <h2 className="text-titles ml-14 mb-4 font-extrabold text-[30px]">
          Les Catégories les plus Populaires
        </h2>
      </div>
      <div className=" flex flex-row justify-around items-center w-full">
        <div
          className="flex flex-col items-center"
          onClick={() => router.replace("/search/business")}
        >
          <img alt="type-icon" src="/icons/Frame913.png" />
          <p className="poppins-medium">Business</p>
        </div>
        <div
          className="flex flex-col items-center"
          onClick={() => router.replace("/search/technologie")}
        >
          <img alt="type-icon" src="/icons/Frame908.png" />
          <p className="poppins-medium">Tech & innovation</p>
        </div>
        <div
          className="flex flex-col items-center"
          onClick={() => router.replace("/search/education")}
        >
          <img alt="type-icon" src="/icons/Frame909.png" />
          <p className="poppins-medium">Education</p>
        </div>
        <div
          className="flex flex-col items-center"
          onClick={() => router.replace("/search/construction")}
        >
          <img alt="type-icon" src="/icons/Frame910.png" />
          <p className="poppins-medium">Construction</p>
        </div>
        <div
          className="flex flex-col items-center"
          onClick={() => router.replace("/search/healthcare & medical")}
        >
          <img alt="type-icon" src="/icons/Frame911.png" />
          <p className="poppins-medium">Healthcare & Medical</p>
        </div>
        <div
          className="flex flex-col items-center"
          onClick={() => router.replace("/search/human resources")}
        >
          <img alt="type-icon" src="/icons/Frame912.png" />
          <p className="poppins-medium">Human Resources</p>
        </div>
      </div>
    </div>
  );
}

export default Categorie;
