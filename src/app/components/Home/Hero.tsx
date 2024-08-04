"use client";
import React, { useEffect, useState } from "react";

const Hero = () => {
  const [images, setImages] = useState([
    "/Event.png",
    "/Event2.svg",
    "/Event3.svg",
    "/Event4.svg",
  ]);
  const [currentImage, setCurrentImage] = useState(0);
  const [currentBar, setCurrentBar] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBar((prev) => {
        if (prev === images.length - 1) {
          return 0;
        }
        return prev + 1;
      });
      setCurrentImage((prevImage) => {
        if (prevImage === 3) return 0;
        else return prevImage + 1;
      });
    }, 3000); // Set interval to 3000 milliseconds (3 seconds)
    return () => clearInterval(interval);
  }, [images.length]);

  const handleBarClick = (index: number) => {
    setCurrentBar(index);
    setCurrentImage(index);
  };

  return (
    <div
      className="relative  bg-cover bg-center md:px-44 md:py-20 flex flex-row justify-center items-center"
      style={{ backgroundImage: `url(${images[currentImage]})` }}
    >
      <div className="hero-overlay"></div>
      <div className=" flex flex-col z-30 justify-between mr-4">
        {images.map((_, index) => (
          <div
            key={index}
            className={`progress-bar w-[10px] h-[50px] bg-gray-300 mb-2 rounded-md cursor-pointer`}
            onClick={() => handleBarClick(index)} // Wrap the function call in an anonymous function
          >
            {index <= currentBar && (
              <div className="fill-bar w-full h-full rounded-md bg-gray-700"></div>
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-col justify-between ">
        <div className="flex flex-row relative z-10">
          <div>
            <h2 className="mb-10 text-white font-poppins md:text-[30px] font-semibold text-left">
              NAPEC 2024 - Africa & Mediterranean Energy & Hydrogen Exhibition
              and Conference
            </h2>
          </div>
        </div>
        <div className="relative z-10 mb-6">
          <p className="flex flex-row text-white items-center">
            <img
              alt="location-icon"
              src="/LocationLight.png"
              className="w-[18px] h-[18px] mr-2"
            />{" "}
            Oran International Convention Center Mohamed Ben Ahmed (CCO),
            Algeria
          </p>
          <p className="flex flex-row text-white items-center">
            <img
              alt="location-icon"
              src="/Calendar.png"
              className="w-[18px] h-[18px] mr-2"
            />{" "}
            14-16 October 2024
          </p>
        </div>
        <div className="mb-2 flex flex-row justify-between w-fit relative z-10">
          <button className="mr-2 rounded-[30px] p-2 bg-transparent text-white text-center border border-white">
            Salons & Expo
          </button>
          <button className="rounded-[30px] p-2 bg-transparent text-white text-center border border-white">
            Conférences et Congrès
          </button>
        </div>
        <div className="relative z-10">
          <button className="mr-2 rounded-[10px] px-6 py-3 bg-mainBlue text-white text-center">
            Voir plus
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
