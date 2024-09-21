import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { selectSubscription } from "@/store/features/subscriptionSlice";

function ImagesSection({
  setEventImages,
  setVideoUrl,
  videoUrl,
  eventImages,
}: {
  setEventImages: Function;
  setVideoUrl: Function;
  videoUrl: string | null;
  eventImages: (File | string)[];
}) {
  const [isEventImagesSubmitted, setIsEventImagesSubmitted] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number>(0);

  // Utility function to get the appropriate image URL
  const getImageUrl = (image: File | string) => {
    if (image instanceof File) {
      return URL.createObjectURL(image);
    }
    return `${process.env.NEXT_PUBLIC_SERVER_URL}event/image/${image}`;
  };
  const fetchedSubscription = useSelector(selectSubscription);

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const items = Array.from(eventImages);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setEventImages(items);
  };

  const handleTerminerClick = () => {
    setIsEventImagesSubmitted(true);
  };

  const handleBarClick = (index: number) => {
    setSelectedImage(index);
  };

  // const handleDeleteImage = (index: number) => {
  //   const updatedImages = eventImages.filter((_, i) => i !== index);
  //   setEventImages(updatedImages);
  // };

  useEffect(() => {
    console.log(videoUrl);
  }, [videoUrl]);
  const t = useTranslations("Search");
  return (
    <>
      <div className="  mb-3  ">
        <div className="mx-3">
          <h3 className="text-2xl poppins-semibold">Images </h3>
          <p className="text-gray-600 poppins-regular">{t("imagesDes")}</p>{" "}
        </div>
      </div>
      <div
        onClick={() => setIsEventImagesSubmitted(false)}
        className={`relative rounded-3xl flex justify-center items-center  py-48 md:max-h-[500px] md:max-w-full bg-cover mx-4 ${
          eventImages.length === 0 && "bg-[#0052B40D]"
        }`}
        style={{
          backgroundImage: `url(${
            eventImages.length > 0
              ? !isEventImagesSubmitted
                ? getImageUrl(eventImages[0])
                : getImageUrl(eventImages[selectedImage])
              : "/images/registerimg.jpeg"
          })`,
        }}
      >
        {isEventImagesSubmitted && (
          <img
            alt="submittedicon"
            className="w-[25px] h-[25px] absolute right-0 top-0"
            src="/icons/submittedIcon.png"
          />
        )}
      </div>
      {isEventImagesSubmitted && (
        <div className="flex">
          {eventImages.map((_, index) => (
            <div
              key={index}
              className={`progress-bar mr-4 flex-1 h-[10px] mb-2 bg-gray-700 rounded-md cursor-pointer`}
              onClick={() => handleBarClick(index)}
            ></div>
          ))}
        </div>
      )}
      {!isEventImagesSubmitted && (
        <>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="eventImages" direction="horizontal">
              {(provided) => (
                <div
                  className="flex flex-wrap w-full mt-4 relative"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{ display: "flex", overflowX: "auto" }}
                >
                  {eventImages.map((image, index) => (
                    <Draggable
                      key={
                        typeof image === "string" ? image : image.name + index
                      }
                      draggableId={
                        typeof image === "string" ? image : image.name + index
                      }
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="relative  h-24 m-2 w-[140px]" // Individual image container
                        >
                          <div className="group relative w-full h-full">
                            {index === 0 && (
                              <img
                                alt="show"
                                src={`/icons/Show.png`}
                                className="w-[23px] h-[23px] bg-white rounded-full  absolute right-1 top-1"
                              />
                            )}
                            <img
                              src={getImageUrl(image)}
                              alt={`event-${index}`}
                              className={`w-full h-full object-cover rounded-lg ${
                                index === 0 ? "border-8 border-gray-900" : ""
                              }`}
                            />{" "}
                            <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <span className="text-white text-4xl">=</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <div className="mb-4 w-full border-gray-300 border-[1.3px] p-2">
            <label
              htmlFor="videoUrl"
              className="block text-sm poppins-medium poppins-semibold text-gray-700"
            >
              Video
            </label>
            <div className="flex justify-between items-center">
              <img
                alt="runicon"
                className="w-[17px] h-[17px]"
                src="/icons/Property 34.png"
              />
              <input
                disabled={fetchedSubscription?.pack !== "Business"}
                type="text"
                id="videoUrl"
                name="videoUrl"
                className="shadow-sm p-3 poppins-regular focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder={
                  fetchedSubscription?.pack === "Business"
                    ? "video url"
                    : `Upgrade to the Business Pack to add the explainer video.
`
                }
                onChange={(e) => setVideoUrl(e.target.value)}
              />
            </div>
          </div>
        </>
      )}
      {!isEventImagesSubmitted && (
        <button
          onClick={handleTerminerClick}
          className="mt-4 p-2 bg-blue-500 text-white rounded-lg"
        >
          Terminer
        </button>
      )}
    </>
  );
}

export default ImagesSection;
