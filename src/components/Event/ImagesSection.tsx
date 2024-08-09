import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

function ImagesSection({
  setVideoUrl,
  videoUrl,
  eventImages,
  setEventImages,
}: {
  setVideoUrl: Function;
  videoUrl: string | null;
  eventImages: File[];
  setEventImages: Function;
}) {
  const [isEventImagesSubmitted, setIsEventImagesSubmitted] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number>(0);
  //   const [eventImages, setEventImages] = useState<File[]>([]);
  //   const [videoUrl, setVideoUrl] = useState<string | null>(null);
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
  useEffect(() => {
    console.log(videoUrl);
  }, [videoUrl]);
  const handleBarClick = (index: number) => {
    setSelectedImage(index);
  };
  const handleDeleteImage = (index: number) => {
    const updatedImages = eventImages.filter((_, i) => i !== index);
    setEventImages(updatedImages);
  };
  return (
    <>
      <div className="flex w-full mb-3 justify-between">
        <div>
          <h3 className="text-2xl poppins-semibold">Images </h3>
          <p className="text-gray-600 poppins-regular">
            Ajouter des photos pour montrer le sujet de votre evenement{" "}
          </p>{" "}
        </div>
      </div>
      <div
        onClick={() => setIsEventImagesSubmitted(false)}
        className=" relative rounded-md flex justify-center items-center px-72 py-48 md:max-h-[500px] md:max-w-[800px] bg-cover"
        style={{
          backgroundImage: `url(${
            eventImages.length > 0
              ? !isEventImagesSubmitted
                ? URL.createObjectURL(eventImages[0])
                : URL.createObjectURL(eventImages[selectedImage])
              : "/registerimg.jpeg"
          })`,
        }}
      >
        {" "}
        {isEventImagesSubmitted ? (
          <img
            alt="submittedicon"
            className="w-[25px] h-[25px] absolute right-0 top-0"
            src="/submittedIcon.png"
          />
        ) : null}
        {/* Label acting as a button for file input */}
        {!isEventImagesSubmitted ? (
          <label
            htmlFor="media"
            className="relative p-8 bg-white inset-0 flex flex-col justify-center items-center cursor-pointer rounded-lg"
          >
            <input
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
                    return alert("only 4 images are alowed");
                  }
                  setEventImages((prevImages: any) => [
                    ...prevImages,
                    ...imageFiles,
                  ]);
                }
              }}
            />
            <img alt="uploadicon" src="/upload.png" className="w-16 h-16" />
            <h3 className="text-mainBlue poppins-medium mt-2">
              Téléchargez des photos
            </h3>
          </label>
        ) : null}
      </div>
      {isEventImagesSubmitted ? (
        <div className="flex">
          {eventImages.map((_, index) => (
            <div
              key={index}
              className={`progress-bar w-[50px] h-[10px] bg-gray-600 mr-2 rounded-md cursor-pointer`}
              onClick={() => handleBarClick(index)} // Wrap the function call in an anonymous function
            ></div>
          ))}{" "}
        </div>
      ) : null}
      {!isEventImagesSubmitted ? (
        <>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="eventImages" direction="horizontal">
              {(provided) => (
                <div
                  className="flex flex-wrap w-full mt-4"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{ display: "flex", overflowX: "auto" }} // Ensure horizontal layout and scrolling
                >
                  {eventImages.map((image, index) => (
                    <Draggable
                      key={image.name + index} // Ensure unique ID
                      draggableId={image.name + index} // Ensure unique ID
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
                            src={URL.createObjectURL(image)}
                            alt={`event-${index}`}
                            className={`w-full h-full object-cover rounded-lg ${
                              index === 0 ? " border-8 border-gray-900" : ""
                            }`}
                          />
                          <button
                            onClick={() => handleDeleteImage(index)}
                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                          >
                            X
                          </button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          {/* Here */}
          <div className="mb-4 w-full  border-gray-300 border-[1.3px] p-2">
            <label
              htmlFor="videoUrl"
              className="block text-sm font-medium poppins-semibold text-gray-700"
            >
              Video
            </label>
            <div className="flex justify-between items-center ">
              <img
                alt="runicon"
                className="w-[17px] h-[17px]"
                src="/Property 34.png"
              />
              <input
                type="text"
                id="videoUrl"
                name="videoUrl"
                className="shadow-sm p-3 poppins-regular focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="video url"
                onChange={(e) => setVideoUrl(e.target.value)}
              />{" "}
            </div>
          </div>{" "}
        </>
      ) : null}
      {eventImages.length > 0 && !isEventImagesSubmitted ? (
        <button
          onClick={handleTerminerClick}
          className="mt-4 p-2 bg-blue-500 text-white rounded-lg"
        >
          Terminer
        </button>
      ) : null}
    </>
  );
}

export default ImagesSection;
