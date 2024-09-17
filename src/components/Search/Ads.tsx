import React, { useEffect, useState } from "react";
import { useGetSearchPageAddsQuery } from "@/store/features/api/apiSlice";
import Progress from "../shared/Progress";
import Image from "next/image";
function Ads() {
  const { data, isLoading, error } = useGetSearchPageAddsQuery();
  const [ads, setAds] = useState<any>([]);
  useEffect(() => {
    if (data) {
      setAds(data.filter((ad: any) => ad.status === "running"));
    }
  }, [data]);

  const [currentImage, setCurrentImage] = useState(0);
  const [currentBar, setCurrentBar] = useState(0);
  const handleBarClick = (index: number) => {
    setCurrentBar(index);
  };
  useEffect(() => {
    console.log(ads?.length);
    if (ads?.length > 0) {
      const interval = setInterval(() => {
        setCurrentBar((prev) => {
          if (prev === ads?.length - 1) {
            return 0;
          }
          return prev + 1;
        });
      }, 7000); // Set interval to 3000 milliseconds (3 seconds)
      return () => clearInterval(interval);
    }
  }, [ads?.length]);
  if (!ads) return null;
  return (
    <>
      {ads?.length !== 0 && (
        <div className="relative  bg-cover bg-center  flex flex-row  items-center h-full w-full ">
          <Image
            src={`${process.env.NEXT_PUBLIC_SERVER_URL}event/image/${ads[currentBar]?.picture}`}
            className="w-full h-full "
            alt={`ad${currentBar}`}
            width={500} // Specify width
            height={300} // Specify height
            quality={75} // Adjust quality to improve performance (default is 75)
            // placeholder="blur" // Optionally use a low-quality placeholder
          />

          <div className="absolute bottom-1 left-1/2  rotate-90 z-30  mr-4">
            {ads.map((_: any, index: number) => (
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
        </div>
      )}
      {isLoading && <Progress />}
    </>
  );
}

export default Ads;
