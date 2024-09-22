import { useTranslations } from "next-intl";
import { useRouter } from "@/navigation";
import React, { useState } from "react";

function Categorie() {
  const [hovered, setHovered] = useState<number | null>(null);

  const icons = [
    {
      src: "/icons/Business.svg",
      hoverSrc: "/icons/Business1.svg",
      label: "Business",
      route: "/search/business",
    },
    {
      src: "/icons/Tech & Innovation.svg",
      hoverSrc: "/icons/Tech & Innovation1.svg",
      label: "Tech & Innovation",
      route: "/search/technologie",
    },
    {
      src: "/icons/Educational.svg",
      hoverSrc: "/icons/Educational1.svg",
      label: "Education",
      route: "/search/education",
    },
    {
      src: "/icons/Construction.svg",
      hoverSrc: "/icons/Construction1.svg",
      label: "Construction",
      route: "/search/construction",
    },
    {
      src: "/icons/Healthcare & Medical.svg",
      hoverSrc: "/icons/Healthcare & Medical1.svg",
      label: "Healthcare & Medical",
      route: "/search/healthcare & medical",
    },
    {
      src: "/icons/Human Resources.svg",
      hoverSrc: "/icons/Human Resources1.svg",
      label: "Human Resources",
      route: "/search/human resources",
    },
  ];
  // const { t, changeLanguage } = useTranslation();

  const handleMouseEnter = (index: number) => setHovered(index);
  const handleMouseLeave = () => setHovered(null);
  const router = useRouter();
  const t = useTranslations("Categorie");
  return (
    <div className="mb-8 md:mt-8 mt-0 w-full mr-[50px]">
      <div className="">
        <h2 className="text-titles ml-2 mb-4 poppins-semibold md:text-[24px] ">
          {t.rich("description", {
            code: (chunks) => <code>{chunks}</code>,
          })}
        </h2>
      </div>
      <div className=" flex flex-row justify-between items-center w-full element-with-scrollbar overflow-x-scroll">
        {icons.map((icon, index) => (
          <div
            key={index}
            className="flex flex-col items-center px-4 min-w-fit"
            onClick={() => router.replace(icon.route)}
          >
            <img
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              alt={"type-icon" + index}
              src={hovered === index ? icon.hoverSrc : icon.src}
              className="h-[80px] w-[80px] md:h-[100px] md:w-[100px]"
            />
            <p
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              className={`md:poppins-medium poppins-regular  whitespace-nowrap ${
                hovered === index ? "text-mainBlue" : "text-gray-500"
              }`}
            >
              {icon.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categorie;
