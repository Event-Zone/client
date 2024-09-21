"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
import { usePathname, useRouter } from "@/navigation";
import { useParams } from "next/navigation";
import { ChangeEvent, ReactNode, useTransition } from "react";
import { useSelector } from "react-redux";
import {
  selectInitialEvents,
  setSearchedEvents,
} from "@/store/features/eventSlice";
import { useDispatch } from "react-redux";

function Footer() {
  const initiaEvents = useSelector(selectInitialEvents);
  const dispatch = useDispatch();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();
  function onSelectChange(nextLocale: string) {
    startTransition(() => {
      router.replace(
        // @ts-ignore
        { pathname, params },
        { locale: nextLocale }
      );
    });
  }
  const t = useTranslations("Footer");
  return (
    <footer className="mt-8 text-center flex  justify-center items-center w-full bg-[#0a1a35] text-white py-8 md:h-[300px] ">
      <div className="container   mx-2 flex md:flex-row flex-col-reverse justify-between items-center md:h-auto h-[500px]">
        {/* Left Section */}
        <div className="flex md:flex-row flex-col-reverse items-center justify-center">
          <div className="md:mr-8">
            {/* Logo Placeholder */}
            <div className=" md:h-8 md:w-full">
              {" "}
              <Image
                width={200}
                height={30}
                alt="logoEvenZone"
                src={"/icons/Union1.png"}
                className=" md:ml-8 md:w-[45px] md:h-[45px] w-[38px] h-[42px] md:mt-[-20px] mt-[20px]"
              />
            </div>
          </div>
          <div className="md:ml-8 text-start text-sm space-y-2">
            <p className="poppins-regular text-gray-500">
              {t("Collaborez Avec Eventzone")}
            </p>
            <ul>
              <li
                onClick={() => {
                  dispatch(setSearchedEvents(initiaEvents));

                  router.push("/search");
                }}
                className="mb-[2px] cursor-pointer"
              >
                {t("Decouvrez Nos Evenements")}
              </li>
              <li
                onClick={() => router.push(`/tarification`)}
                className="mb-[2px] cursor-pointer"
              >
                {t("Ajoutez Votre Evenement")}
              </li>
            </ul>
          </div>
        </div>
        <div className="text-sm space-y-2">
          <p className="md:text-start text-center poppins-regular text-gray-500">
            {" "}
            {t("Contactez Nous")}
          </p>
          <ul>
            <li className="mb-[2px]">Contact@eventzone.pro</li>
            <li className="md:text-start text-center">+(213) 781 45 75 11</li>
          </ul>
        </div>
        {/* Middle Section - Language Selection */}
        <div className="text-sm flex flex-col space-y-2">
          <p className="poppins-regular text-gray-500 mt-2">{t("Langue")}</p>
          <ul className="flex text-center flex-col items-start justify-center ">
            <li
              onClick={() => onSelectChange("fr")}
              className="m-0 cursor-pointer"
            >
              {t("Francais")}
            </li>
            <li
              onClick={() => onSelectChange("en")}
              className="m-0 cursor-pointer"
            >
              {t("Anglais")}
            </li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="  text-right md:w-1/3 text-sm space-y-10">
          <div className="flex items-center justify-center font-bold text-blue-500 text-lg">
            <Image
              width={200}
              height={30}
              alt="logoEvenZone"
              src={"/images/footerLogo.png"}
              className="md:w-[200px] md:h-[30px] w-[140px] h-[20px]  "
            />
          </div>
          <p className="text-center ">
            {t("FooterDescription")}
            <br /> {t("FooterDes2")}
          </p>
          <div className="flex items-center justify-center space-x-4 ">
            {/* Social media icons as placeholders */}
            <a
              target="_blank"
              href="https://www.facebook.com/profile.php?id=61556005540322&mibextid=LQQJ4d"
              className="w-6 h-6  rounded-full"
            >
              <Image
                alt="facebookIcon"
                width={26}
                height={26}
                src={"/icons/ic_baseline-facebook.png"}
              />
            </a>
            <a
              target="_blank"
              href="https://www.instagram.com/eventzone.pro/"
              className="w-6 h-6  rounded-full"
            >
              <Image
                alt="instaIcon"
                width={20}
                height={20}
                src={"/icons/Vector (1).png"}
              />
            </a>
            <a
              target="_blank"
              href="https://www.linkedin.com/company/eurl-eventzone/posts/?feedView=all"
              className="w-6 h-6  rounded-full"
            >
              <Image
                alt="linkedinIcon"
                width={20}
                height={20}
                src={"/icons/Vector (2).png"}
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
