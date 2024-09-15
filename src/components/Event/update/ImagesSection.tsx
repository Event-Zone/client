import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

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

  return (
    <>
      <div className="mb-3">
        <div>
          <h3 className="text-2xl poppins-semibold">Images </h3>
          <p className="text-gray-600 poppins-regular">
            Ajouter des photos pour montrer le sujet de votre événement
          </p>
        </div>
      </div>
      <div
        onClick={() => setIsEventImagesSubmitted(false)}
        className="relative rounded-md flex justify-center items-center py-48 md:max-h-[500px] md:max-w-[800px] bg-cover"
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
        {!isEventImagesSubmitted && (
          <label
            htmlFor="media"
            className="md:p-8 md:w-auto w-[200px] flex flex-col items-center cursor-pointer rounded-lg"
          >
            <input
              disabled={true}
              type="file"
              id="media"
              name="media"
              accept=".jpg,.jpeg,.png,.svg"
              className="relative inset-0 opacity-0 cursor-pointer"
              onChange={(event) => {
                if (event.target.files) {
                  const files = Array.from(event.target.files as FileList);
                  const imageFiles = files.filter((file) =>
                    ["image/jpeg", "image/png", "image/svg+xml"].includes(
                      file.type
                    )
                  );
                  if (eventImages.length >= 4) {
                    return alert("Only 4 images are allowed");
                  }
                  // setEventImages((prevImages: any) => [
                  //   ...prevImages,
                  //   ...imageFiles,
                  // ]);
                }
              }}
            />
          </label>
        )}
      </div>
      {isEventImagesSubmitted && (
        <div className="flex">
          {eventImages.map((_, index) => (
            <div
              key={index}
              className={`progress-bar w-[50px] h-[10px] bg-gray-600 mr-2 rounded-md cursor-pointer`}
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
                  className="flex flex-wrap w-full mt-4"
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
                          className={`relative w-24 h-24 m-2`}
                        >
                          <img
                            src={getImageUrl(image)}
                            alt={`event-${index}`}
                            className={`w-full h-full object-cover rounded-lg ${
                              index === 0 ? "border-8 border-gray-900" : ""
                            }`}
                          />
                          {/* <button
                            onClick={() => handleDeleteImage(index)}
                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                          >
                            X
                          </button> */}
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
                type="text"
                id="videoUrl"
                name="videoUrl"
                className="shadow-sm p-3 poppins-regular focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="video url"
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
