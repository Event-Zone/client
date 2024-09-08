import Image from "next/image";
import React from "react";

const ContactSection = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 md:p-12">
      <h2 className="text-xl poppins-bold mb-4 md:text-2xl">Contactez nous</h2>
      <p className="text-gray-600 mb-6 md:text-lg">
        Que vous ayez des questions techniques, besoin de conseils promotionnels
        ou que vous ayez besoin d'une aide au dépannage, nous sommes là pour
        vous soutenir.
      </p>
      <div className="flex sm:flex-row flex-col w-full ">
        <a
          href="tel:+213781457511"
          className="mb-2 flex items-center text-[10px] md:text-[15px] justify-center bg-mainBlue text-white py-3  md:py-4 md:px-8 rounded-full shadow-md hover:bg-blue-700 transition-colors md:text-sm"
        >
          <Image
            width={25}
            height={25}
            alt="phoneicon"
            src={"/icons/mingcute_phone-line.png"}
            className="mr-2"
          />
          +213 781 45 75 11
        </a>
        <a
          href="mailto:support@eventzone.pro"
          className="ml-0 sm:ml-2  mb-2 flex items-center text-[10px] md:text-[15px] justify-center bg-mainBlue text-white py-3  md:py-4 md:px-8 rounded-full shadow-md hover:bg-blue-700 transition-colors md:text-sm"
        >
          <Image
            width={25}
            height={25}
            alt="emailicon"
            src={"/icons/ic_outline-email.png"}
            className="mr-2"
          />{" "}
          support@eventzone.pro
        </a>
      </div>
    </div>
  );
};

export default ContactSection;
