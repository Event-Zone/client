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
      <div className="  mb-3  ">
        <div className="mx-3">
          <h3 className="text-2xl poppins-semibold">Images </h3>
          <p className="text-gray-600 poppins-regular">
            Ajouter des photos pour montrer le sujet de votre evenement{" "}
          </p>{" "}
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
                ? URL.createObjectURL(eventImages[0])
                : URL.createObjectURL(eventImages[selectedImage])
              : ""
          })`,
        }}
      >
        {eventImages.length !== 0 && selectedImage === 0 && (
          <div className="bg-white w-fit  poppins-medium text-titles flex rounded-lg p-3 absolute top-3 right-3">
            <img
              alt="show"
              src={`/icons/Show.png`}
              className="w-[23px] h-[23px] bg-white rounded-full  m-r-1 "
            />{" "}
            Image de couverture{" "}
          </div>
        )}
        {isEventImagesSubmitted ? (
          <img
            alt="submittedicon"
            className="w-[25px] h-[25px] absolute right-0 top-0"
            src="/icons/submittedIcon.png"
          />
        ) : null}
        {/* Label acting as a button for file input */}
        {!isEventImagesSubmitted && eventImages?.length === 0 ? (
          <label
            htmlFor="media"
            className="  md:p-8 bg-white  md:w-auto w-[200px]   flex flex-col  items-center cursor-pointer rounded-lg"
          >
            <input
              multiple
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
            <img
              alt="uploadicon"
              src="/icons/upload.png"
              className="md:w-16 md:h-16  "
            />
            <h3 className="text-mainBlue poppins-medium mt-2">
              Téléchargez des photos
            </h3>
          </label>
        ) : null}
      </div>
      {isEventImagesSubmitted ? (
        <div className="flex">
          {eventImages.map((_: any, index: number) => (
            <div
              key={index}
              className={`progress-bar mr-4 flex-1 h-[10px] mb-2 bg-gray-700 rounded-md cursor-pointer`}
              onClick={() => handleBarClick(index)}
            >
              {index === selectedImage && (
                <div className=" w-full h-full rounded-md bg-gray-300  "></div>
              )}
            </div>
          ))}{" "}
        </div>
      ) : null}
      {!isEventImagesSubmitted && (
        <div className="flex items-center w-full justify-center space-x-6 text-[13px] mt-4 text-gray-500 poppins-regular">
          <span>• Taille d'image recommandée : 2160 x 1080px</span>
          <span>• Taille maximale du fichier : 8 Mo</span>
          <span>• Fichiers image pris en charge : JPEG ou PNG</span>
        </div>
      )}

      {!isEventImagesSubmitted ? (
        <>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="eventImages" direction="horizontal">
              {(provided) => (
                <div
                  className="flex flex-wrap w-full mt-4 relative"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{ display: "flex", overflowX: "auto" }} // Ensure horizontal layout and scrolling
                >
                  {eventImages.length !== 0 && (
                    <label
                      htmlFor="media"
                      className=" h-24 m-2 w-[140px] flex flex-col  items-center cursor-pointer rounded-lg bg-[#0052B40D]"
                    >
                      <input
                        multiple
                        type="file"
                        id="media"
                        name="media"
                        accept=".jpg,.jpeg,.png,.svg"
                        className="relative inset-0 opacity-0 cursor-pointer"
                        onChange={(event) => {
                          if (event.target.files) {
                            const files = Array.from(
                              event.target.files as FileList
                            );
                            const imageFiles = files.filter((file) =>
                              [
                                "image/jpeg",
                                "image/png",
                                "image/svg+xml",
                              ].includes(file.type)
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
                      <img
                        alt="uploadicon"
                        src="/icons/ph_plus-bold.png"
                        className="md:w-[24px] md:h-[24px] mb-[3px] "
                      />
                    </label>
                  )}
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
                          className="relative  h-24 m-2 w-[140px]" // Individual image container
                        >
                          {/* Image container with hover effect */}
                          <div className="group relative w-full h-full">
                            {index === 0 && (
                              <img
                                alt="show"
                                src={`/icons/Show.png`}
                                className="w-[23px] h-[23px] bg-white rounded-full  absolute right-1 top-1"
                              />
                            )}
                            {/* Image */}
                            <img
                              src={URL.createObjectURL(image)}
                              alt={`event-${index}`}
                              className={`w-full h-full object-cover rounded-lg transition-all duration-300 ${
                                index === 0 ? "border-8 border-gray-900" : ""
                              } group-hover:blur-sm`} // Blur on hover
                            />
                            {/* Equals Sign (visible only on hover) */}
                            <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <span className="text-white text-4xl">=</span>
                            </div>
                          </div>

                          {/* Delete Button */}
                          <button
                            onClick={() => handleDeleteImage(index)}
                            className="absolute top-0 right-0  text-white rounded-full p-1"
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
          <div className="mx-4 mt-[30px]">
            <label
              htmlFor="videoUrl"
              className="poppins-semibold text-titles mb-4"
            >
              Video
            </label>
            <p className="text-gray-600 poppins-regular mb-2">
              Ajoutez un lien vidéo de Youtube pour montrer votre événement
            </p>
          </div>
          <div className="ml-3 mb-4 w-[96%]  border-gray-300 border-[1.3px] p-1">
            <div className="flex justify-between items-center ">
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
