import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

function Footer() {
  const t = useTranslations("Footer");
  return (
    <footer className="flex justify-center items-center w-full bg-[#0a1a35] text-white py-8 md:h-[300px] ">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left Section */}
        <div className="flex items-center justify-center">
          <div className="mr-8">
            {/* Logo Placeholder */}
            <div className=" h-8 w-full">
              {" "}
              <Image
                width={200}
                height={30}
                alt="logoEvenZone"
                src={"/icons/Union1.png"}
                className="md:w-[45px] md:h-[45px] mt-[-20px]"
              />
            </div>
          </div>
          <div className="text-sm space-y-2">
            <p className="poppins-regular text-gray-500">
              {t("Collaborez Avec Eventzone")}
            </p>
            <ul>
              <li className="mb-[2px]"> {t("Decouvrez Nos Evenements")}</li>
              <li className="mb-[2px]"> {t("Ajoutez Votre Evenement")}</li>
            </ul>
          </div>
        </div>
        <div className="text-sm space-y-2">
          <p className="poppins-regular text-gray-500">
            {" "}
            {t("Contactez Nous")}
          </p>
          <ul>
            <li className="mb-[2px]">Contact@eventzone.pro</li>
            <li>+(213) 781 45 75 11</li>
          </ul>
        </div>
        {/* Middle Section - Language Selection */}
        <div className="text-sm flex flex-col space-y-2">
          <p className="poppins-regular text-gray-500 mt-2">{t("Langue")}</p>
          <ul className="flex text-center flex-col items-start justify-center ">
            <li className="m-0">{t("Francais")}</li>
            <li className="m-0">{t("Anglais")}</li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="  text-right w-1/3 text-sm space-y-10">
          <div className="flex items-center justify-center font-bold text-blue-500 text-lg">
            <Image
              width={200}
              height={30}
              alt="logoEvenZone"
              src={"/images/footerLogo.png"}
              className="md:w-[200px] md:h-[30px] "
            />
          </div>
          <p className="text-center ">
            {t("FooterDescription")}
            <br /> {t("FooterDes2")}
          </p>
          <div className="flex items-center justify-center space-x-4 ">
            {/* Social media icons as placeholders */}
            <div className="w-6 h-6  rounded-full">
              <Image
                alt="facebookIcon"
                width={25}
                height={25}
                src={"/icons/ic_baseline-facebook.png"}
              />
            </div>
            <div className="w-6 h-6  rounded-full">
              <Image
                alt="instaIcon"
                width={20}
                height={20}
                src={"/icons/Vector (1).png"}
              />
            </div>
            <div className="w-6 h-6  rounded-full">
              <Image
                alt="linkedinIcon"
                width={20}
                height={20}
                src={"/icons/Vector (2).png"}
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
