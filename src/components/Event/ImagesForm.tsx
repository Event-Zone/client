import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

function ImagesForm() {
  const [showEventProperties, setShowEventProperties] = useState(false);
  const [isSponsorsCompleted, setIsSponsorsCompleted] = useState(false);
  const [showSponsorUpload, setShowSponsorUpload] = useState(false);
  const [sponsorImages, setSponsorImages] = useState<File[]>([]);
  const [eventImages, setEventImages] = useState<File[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formValues, setFormValues] = useState({
    accessibilite: "",
    portee: "",
    public: "",
    lieu: "",
  });
  const [formData, setFormData] = useState(new FormData());

  const toggleEventProperties = () => {
    setShowEventProperties(!showEventProperties);
  };

  const toggleSponsorUpload = () => {
    setShowSponsorUpload(!showSponsorUpload);
  };

  const handleSponsorImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      setSponsorImages((prevImages) => [
        ...prevImages,
        ...Array.from(event.target.files as FileList),
      ]);
      setIsSubmitted(true);
      setIsSponsorsCompleted(true);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = () => {
    setShowEventProperties(false);
    setShowSponsorUpload(false);
    setIsSubmitted(true);
  };

  const isFormComplete = Object.values(formValues).every(
    (value) => value !== ""
  );

  useEffect(() => {
    const filesArray = eventImages;
    console.log(filesArray);
    const images = filesArray.filter((file) => file.type.startsWith("image/"));
    const videos = filesArray.filter((file) => file.type.startsWith("video/"));

    if (images.length > 4) {
      alert("You can upload a maximum of 4 images.");
      setEventImages((prevImages) => prevImages.slice(0, -1)); // Remove the last file
      return;
    }

    if (videos.length > 1) {
      alert("You can upload a maximum of 1 video.");
      setEventImages((prevImages) => prevImages.slice(0, -1)); // Remove the last file
      return;
    }
    console.log(videos, images);
  }, [eventImages]);

  useEffect(() => {
    console.log("eventImages", eventImages);
  }, [eventImages]);

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const items = Array.from(eventImages);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setEventImages(items);
  };

  return (
    <div className="border-[1.4px] border-gray-500 rounded-3xl p-8 relative flex flex-col justify-center items-center w-full h-full">
      <div className="flex w-full mb-3">
        <div>
          <h3 className="text-2xl poppins-semibold">Images </h3>
          <p className="text-gray-600 poppins-regular">
            Ajouter des photos pour montrer le sujet de votre evenement{" "}
          </p>{" "}
        </div>
      </div>
      <div
        className=" relative flex justify-center items-center p-44 rounded-2xl md:max-h-[500px] md:max-w-[800px] bg-cover"
        style={{
          backgroundImage: `url(${
            eventImages.length > 0
              ? URL.createObjectURL(eventImages[0])
              : "/registerimg.jpeg"
          })`,
        }}
      >
        {/* Label acting as a button for file input */}
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
                setEventImages((prevImages) => [
                  ...prevImages,
                  ...Array.from(event.target.files as FileList),
                ]);
              }
            }}
          />
          <img alt="uploadicon" src="/upload.png" className="w-16 h-16" />
          <h3 className="text-mainBlue poppins-medium mt-2">
            Téléchargez des photos
          </h3>
        </label>
      </div>
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
                      className="w-24 h-24 m-2"
                    >
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`event-${index}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {/* Event Properties Section */}
      <div className="relative flex flex-col justify-center items-center w-full mt-8">
        <div className="flex justify-between items-center w-full p-4 border-[2px] border-gray-200 rounded-lg">
          <div>
            <h3 className="text-lg poppins-semibold">
              Propriété de l'événement
            </h3>{" "}
            <p className="text-gray-500 poppins-regular">
              {" "}
              Personnalisez chaque aspect de votre evenement
            </p>
          </div>
          <button
            onClick={toggleEventProperties}
            className="text-xl poppins-bold"
          >
            {isSubmitted ? (
              <img
                src="/submittedIcon.png"
                alt="submitted"
                className="w-6 h-6"
              />
            ) : (
              "+"
            )}
          </button>
        </div>
        {showEventProperties && (
          <div className="w-full p-4 border-[2px] border-gray-200 rounded-lg mt-2">
            <div className="flex flex-col space-y-2">
              <div>
                <h4 className="poppins-medium text-gray-700">Accessibilite</h4>
                <div className="flex space-x-2 flex-col text-gray-500 poppins-regular">
                  <label>
                    <input
                      type="radio"
                      name="accessibilite"
                      value="gratuit pour les visiteurs"
                      className="poppins-regular ml-2 mr-3 text-gray-500"
                      onChange={handleChange}
                    />
                    Gratuit pour les visiteurs
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="accessibilite"
                      value="evenement payant"
                      className="poppins-regular mr-3 text-gray-500"
                      onChange={handleChange}
                    />
                    Evenement payant
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="accessibilite"
                      value="invitation seulement"
                      className="poppins-regular mr-3 text-gray-500"
                      onChange={handleChange}
                    />
                    Invitation seulement
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="accessibilite"
                      value="accesrestreint"
                      className="mr-3 poppins-regular text-gray-500"
                      onChange={handleChange}
                    />
                    Acces restreint
                  </label>
                </div>
              </div>
              <div>
                <h4 className="poppins-medium text-gray-700">Portee</h4>
                <div className="flex space-x-2 flex-col text-gray-500 poppins-regular">
                  <label>
                    <input
                      type="radio"
                      name="portee"
                      value="evenementinternation"
                      className="mr-3 poppins-regular ml-2 text-gray-500"
                      onChange={handleChange}
                    />
                    Evenement internation
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="portee"
                      value="evenementnational"
                      className="mr-3 poppins-regular text-gray-500"
                      onChange={handleChange}
                    />
                    Evenement national
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="portee"
                      value="evenementuniversaire"
                      className="mr-3 poppins-regular text-gray-500"
                      onChange={handleChange}
                    />
                    Evenement universaire
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="portee"
                      value="evenementregional"
                      className="mr-3 poppins-regular text-gray-500"
                      onChange={handleChange}
                    />
                    Evenement regional
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="portee"
                      value="evenementlocal"
                      className="mr-3 poppins-regular text-gray-500"
                      onChange={handleChange}
                    />
                    Evenement local
                  </label>
                </div>
              </div>
              <div>
                <h4 className="poppins-medium text-gray-700">Public</h4>
                <div className="flex space-x-2 flex-col text-gray-500 poppins-regular">
                  <label>
                    <input
                      type="radio"
                      name="public"
                      value="professionnels"
                      className="mr-3 poppins-regular ml-2 text-gray-500"
                      onChange={handleChange}
                    />
                    Professionnels
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="public"
                      value="etudiant"
                      className="mr-3 poppins-regular text-gray-500"
                      onChange={handleChange}
                    />
                    Etudiant
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="public"
                      value="grandpublic"
                      className="mr-3 poppins-regular text-gray-500"
                      onChange={handleChange}
                    />
                    Grand public
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="public"
                      value="specifiquealindustrie"
                      className="mr-3 poppins-regular text-gray-500"
                      onChange={handleChange}
                    />
                    Specifique a l'industrie
                  </label>
                </div>
              </div>
              <div>
                <h4 className="poppins-medium text-gray-700">Lieu</h4>
                <div className="flex space-x-2 flex-col text-gray-500 poppins-regular">
                  <label>
                    <input
                      type="radio"
                      name="lieu"
                      value="interieur"
                      className="mr-3 poppins-regular ml-2 text-gray-500"
                      onChange={handleChange}
                    />
                    Interieur
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="lieu"
                      value="exterieur"
                      className="mr-3 poppins-regular text-gray-500"
                      onChange={handleChange}
                    />
                    Exterieur
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="lieu"
                      value="exterieureinterieur"
                      className="mr-3 poppins-regular text-gray-500"
                      onChange={handleChange}
                    />
                    Exterieur/ Interieur
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="lieu"
                      value="virtuel"
                      className="mr-3 poppins-regular text-gray-500"
                      onChange={handleChange}
                    />
                    Virtuel
                  </label>
                </div>
              </div>
              {isFormComplete && (
                <button
                  className="mt-4 p-2 bg-blue-500 text-white rounded-lg"
                  onClick={handleSubmit}
                >
                  Terminer
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      {/* Sponsor Upload Section */}
      <div className="relative flex flex-col justify-center items-center w-full mt-8">
        <div className="flex justify-between items-center w-full p-4 bg-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold">Sponsor de l'événement</h3>
          <button onClick={toggleSponsorUpload} className="text-xl font-bold">
            +
          </button>
        </div>
        {showSponsorUpload && (
          <div className="w-full p-4 bg-gray-100 rounded-lg mt-2">
            <label
              htmlFor="sponsorMedia"
              className="relative p-8 bg-white inset-0 flex flex-col justify-center items-center cursor-pointer rounded-lg"
            >
              <input
                type="file"
                id="sponsorMedia"
                name="sponsorMedia"
                accept=".jpg,.jpeg,.png"
                className="relative inset-0 opacity-0 cursor-pointer"
                onChange={handleSponsorImageChange}
              />
              <img alt="uploadicon" src="/upload.png" className="w-16 h-16" />
              <h3 className="text-mainBlue poppins-medium mt-2">
                Téléchargez des images
              </h3>
            </label>
            <div className="flex flex-wrap mt-4">
              {sponsorImages.map((image, index) => (
                <div key={index} className="w-24 h-24 m-2">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`sponsor-${index}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImagesForm;
