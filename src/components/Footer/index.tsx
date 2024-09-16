"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
import { usePathname, useRouter } from "@/navigation";
import { useParams } from "next/navigation";
import { ChangeEvent, ReactNode, useTransition } from "react";

function Footer() {
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
