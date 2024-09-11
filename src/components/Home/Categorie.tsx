import { useRouter } from "next/navigation";
import React, { useState } from "react";

function Categorie() {
  const [hovered, setHovered] = useState<number | null>(null);

  const icons = [
    {
      src: "/icons/Business.png",
      hoverSrc: "/icons/Business1.png",
      label: "Business",
      route: "/search/business",
    },
    {
      src: "/icons/Tech & Innovation.png",
      hoverSrc: "/icons/Tech & Innovation1.png",
      label: "Tech & Innovation",
      route: "/search/technologie",
    },
    {
      src: "/icons/Educational.png",
      hoverSrc: "/icons/Educational1.png",
      label: "Education",
      route: "/search/education",
    },
    {
      src: "/icons/Construction.png",
      hoverSrc: "/icons/Construction1.png",
      label: "Construction",
      route: "/search/construction",
    },
    {
      src: "/icons/Healthcare & Medical.png",
      hoverSrc: "/icons/Healthcare & Medical1.png",
      label: "Healthcare & Medical",
      route: "/search/healthcare & medical",
    },
    {
      src: "/icons/Human Resources.png",
      hoverSrc: "/icons/Human Resources1.png",
      label: "Human Resources",
      route: "/search/human resources",
    },
  ];
  const handleMouseEnter = (index: number) => setHovered(index);
  const handleMouseLeave = () => setHovered(null);
  const router = useRouter();
  return (
    <div className="mb-8 mt-8 w-full mr-[50px]">
      <div className="">
        <h2 className="text-titles ml-2 mb-4 poppins-semibold md:md:text-[24px] ">
          Les Catégories les plus Populaires
        </h2>
      </div>
      <div className="flex flex-row justify-between items-center w-full element-with-scrollbar overflow-x-scroll">
        {icons.map((icon, index) => (
          <div
            key={index}
            className="flex flex-col items-center px-4"
            onClick={() => router.replace(icon.route)}
          >
            <img
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              alt={"type-icon" + index}
              src={hovered === index ? icon.hoverSrc : icon.src}
              className="h-[100px]"
            />
            <p
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              className={`md:poppins-medium poppins-regular  ${
                hovered === index ? "text-mainBlue" : "text-black"
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
