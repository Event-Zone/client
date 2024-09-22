import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

const ContactSection = () => {
  const t = useTranslations("ProfilePage");
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 md:p-12">
      <h2 className="text-[24px] poppins-semibold text-titles mb-4 md:text-2xl">
        {t("ContactUs")}
      </h2>
      <p className="text-gray-600 poppins-regular mb-6 text-md">
        {t("ContactDes")}
      </p>
      <div className="flex sm:flex-row flex-col w-full ">
        <a
          href="tel:+213781457511"
          className="mb-2 flex items-center text-[10px] md:text-[15px] justify-center bg-mainBlue text-white py-3  md:py-4 md:px-8 rounded-full shadow-md hover:bg-blue-700 transition-colors md:text-sm"
        >
          <Image
            width={24}
            height={24}
            alt="phoneicon"
            src={"/icons/call.svg"}
            className="mr-2"
          />
          +213 781 45 75 11
        </a>
        <a
          href="mailto:support@eventzone.pro"
          className="ml-0 sm:ml-2  mb-2 flex items-center text-[10px] md:text-[15px] justify-center bg-mainBlue text-white py-3  md:py-4 md:px-8 rounded-full shadow-md hover:bg-blue-700 transition-colors md:text-sm"
        >
          <Image
            width={24}
            height={24}
            alt="emailicon"
            src={"/icons/sms.svg"}
            className="mr-2"
          />{" "}
          support@eventzone.pro
        </a>
      </div>
    </div>
  );
};

export default ContactSection;
