"use client";
import React, { useEffect, useRef, useState } from "react";
import RishTextEditor from "../shared/RishTextEditor";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays, format } from "date-fns";
import SearchBox from "../shared/SearchBox";
import TimePickerUi from "../shared/TimePickerUi";

function EventForm({
  setIsNext,
  formData,
  setFormData,
}: {
  setIsNext: Function;
  formData: any;
  setFormData: Function;
}) {
  const [newTag, setNewTag] = useState(""); // State for the new tag
  const [location, setLocation] = useState(0); // State for the new tag
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(addDays(new Date(), 1));
  const [isCategorieSelectorVisible, setCategorieSelectorVisible] =
    useState(false);
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleCategorieChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    let updatedCategorie = [...(formData?.Categorie as string[])];

    if (updatedCategorie.includes(value)) {
      updatedCategorie = updatedCategorie.filter((item) => item !== value);
    } else {
      updatedCategorie.push(value);
    }
    setFormData({
      ...formData,
      Categorie: updatedCategorie,
    });
  };
  useEffect(() => {
    if (formData.location && !formData.link) setLocation(0);
    else if (!formData.location && formData.link) setLocation(1);
    else setLocation(2);
  }, []);

  useEffect(() => {
    if (
      formData.startdate &&
      formData.enddate &&
      formData.eventName !== "" &&
      formData.eventName &&
      formData.type &&
      formData.Categorie &&
      formData.type !== "" &&
      formData.Categorie?.length !== 0 &&
      formData.eventDescription &&
      formData.eventDescription !== "" &&
      (formData.location !== "" || formData.location) &&
      (formData.link || formData.link !== "")
    ) {
      console.log("all fields are filled");
      setIsNext(true);
    } else {
      console.log(
        "not all fields are filled",
        formData.startdate,
        formData.enddate,
        formData.eventName,
        formData.eventName,
        formData.type,
        formData.Categorie,
        formData.type,
        formData.Categorie,
        formData.eventDescription,
        formData.eventDescription,
        formData.link,
        formData.location
      );
      setIsNext(false);
    }
  }, [formData]);

  const handleDateChange = (date: Date | null, type: "start" | "end") => {
    if (type === "start") {
      setStartDate(date || new Date());
      if (endDate && date && date > endDate) {
        setEndDate(date);
      }
      setFormData({
        ...formData,
        startdate: date ? format(date, "yyyy-MM-dd") : "",
      });
    } else {
      setEndDate(date || new Date());
      setFormData({
        ...formData,
        enddate: date ? format(date, "yyyy-MM-dd") : "",
      });
    }
  };
  const handleLocation = (position: any) => {
    setFormData({
      ...formData,
      location: {
        address: position.address,
        lon: position.lon,
        lat: position.lat,
      },
    });
  };
  useEffect(() => {
    console.log("Form", formData);
  }, [formData]);
  const handleAddTag = (e: any) => {
    if (e.key === "Enter" && newTag.trim()) {
      // Check for Enter key and non-empty tag
      e.preventDefault();
      const updatedTags = [...formData.tags, newTag.trim()]; // Create a copy and add new tag
      setFormData({ ...formData, tags: updatedTags });
      setNewTag(""); // Clear the new tag input
    }
  };

  const renderTags = () => {
    return formData.tags.map((tag: any, index: number) => {
      if (tag !== "")
        return (
          <span
            key={index}
            className="mr-2 bg-gray-200 rounded-md px-2 py-1 inline-flex  "
          >
            {tag}
            <button
              type="button"
              className="ml-2 text-gray-500 hover:text-red-500 focus:outline-none"
              onClick={() => handleRemoveTag(index)}
            >
              &times;
            </button>
          </span>
        );
    });
  };

  const handleRemoveTag = (index: number) => {
    const updatedTags = [...formData.tags]; // Create a copy
    updatedTags.splice(index, 1); // Remove the tag at the specified index
    setFormData({ ...formData, tags: updatedTags });
  };

  return (
    <div>
      <h3 className="text-2xl poppins-semibold">Informations de base</h3>
      <p className="text-gray-600 poppins-regular">
        Nommez votre événement et expliquez aux participants pourquoi ils
        devraient y participer. Ajoutez des détails mettant en avant ce qui le
        rend unique.
      </p>
      <form className="mt-8">
        <div className="mb-4  border-gray-300 border-[1.3px] md:p-2">
          <label
            htmlFor="eventName"
            className="block text-sm poppins-medium poppins-semibold text-gray-700"
          >
            Nom de l'événement
          </label>
          <input
            type="text"
            id="eventName"
            name="eventName"
            className=" focus:outline-none shadow-sm p-3 poppins-regular focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="soyez claire et descriptifs"
            onChange={handleInputChange}
            value={formData.eventName}
          />
        </div>
        <div className="mb-4 border-gray-300 border-[1.3px] p-2">
          <label
            htmlFor="eventAcronym"
            className="block text-sm poppins-medium poppins-semibold text-gray-700"
          >
            Acronym de nom de l'événement
          </label>
          <input
            value={formData.eventAcronym}
            className="p-3 w-full poppins-regular"
            id="eventAcronym"
            name="eventAcronym"
            placeholder="s'il y a"
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4 w-full flex flex-row flex-wrap ">
          <select
            value={formData.type}
            onChange={handleInputChange}
            name="type"
            className="md:mr-4 pl-10 flex-1 poppins-regular text-gray-500 focus:outline-none border-gray-300 border-[1.3px] p-2"
          >
            <option value="" disabled selected className="text-gray-500">
              Type
            </option>
            <option value="salons & exposition" className="text-gray-500">
              Salons & Exposition
            </option>
            <option value="conference & exposition" className="text-gray-500">
              Conference & Exposition
            </option>
            <option value="conference" className="text-gray-500">
              Conference
            </option>
            <option value="workshop" className="text-gray-500">
              Workshop
            </option>
            <option value="seminaires & ateliers" className="text-gray-500">
              Seminaires & Ateliers
            </option>
            <option value="webinaires" className="text-gray-500">
              Webinaires
            </option>
            <option value="convention" className="text-gray-500">
              Convention
            </option>
            <option value="competition" className="text-gray-500">
              Competition
            </option>
            <option value="evenement de resautage" className="text-gray-500">
              evenement de resautage
            </option>
          </select>

          <div className="md:mr-4 pl-10 flex-1 poppins-regular text-gray-500 focus:outline-none border-gray-300 border-[1.3px] p-2">
            {" "}
            <div
              onClick={() =>
                setCategorieSelectorVisible(!isCategorieSelectorVisible)
              }
            >
              Choose Categorie
            </div>
            {isCategorieSelectorVisible && (
              <div className="bg-white p-4 rounded-md shadow-md z-30 absolute ">
                <div className="flex flex-col space-y-2 h-[400px] overflow-scroll">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value="sécurité"
                      checked={(formData?.Categorie as string[])?.includes(
                        "sécurité"
                      )}
                      onChange={handleCategorieChange}
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                    <span>Sécurité</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value="services événementiels"
                      checked={(formData?.Categorie as string[])?.includes(
                        "services événementiels"
                      )}
                      onChange={handleCategorieChange}
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                    <span>Services Événementiels</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value="énergies renouvelables"
                      checked={(formData?.Categorie as string[])?.includes(
                        "énergies renouvelables"
                      )}
                      onChange={handleCategorieChange}
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                    <span>Énergies Renouvelables</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value="startups et entrepreneuriat"
                      checked={(formData?.Categorie as string[])?.includes(
                        "startups et entrepreneuriat"
                      )}
                      onChange={handleCategorieChange}
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                    <span>Startups et Entrepreneuriat</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value="technologie"
                      checked={(formData?.Categorie as string[])?.includes(
                        "technologie"
                      )}
                      onChange={handleCategorieChange}
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                    <span>Technologie</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value="télécommunications"
                      checked={(formData?.Categorie as string[])?.includes(
                        "télécommunications"
                      )}
                      onChange={handleCategorieChange}
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                    <span>Télécommunications</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value="transport"
                      checked={(formData?.Categorie as string[])?.includes(
                        "transport"
                      )}
                      onChange={handleCategorieChange}
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                    <span>Transport</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value="travaux publics"
                      checked={(formData?.Categorie as string[])?.includes(
                        "travaux publics"
                      )}
                      onChange={handleCategorieChange}
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                    <span>Travaux Publics</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value="intelligence artificielle (ia)"
                      checked={(formData?.Categorie as string[])?.includes(
                        "intelligence artificielle (ia)"
                      )}
                      onChange={handleCategorieChange}
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                    <span>Intelligence Artificielle (IA)</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value="machines et outils"
                      checked={(formData?.Categorie as string[])?.includes(
                        "machines et outils"
                      )}
                      onChange={handleCategorieChange}
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                    <span>Machines et Outils</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value="aéronautique"
                      checked={(formData?.Categorie as string[])?.includes(
                        "aéronautique"
                      )}
                      onChange={handleCategorieChange}
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                    <span>Aéronautique</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value="agriculture"
                      checked={(formData?.Categorie as string[])?.includes(
                        "agriculture"
                      )}
                      onChange={handleCategorieChange}
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                    <span>Agriculture</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value="environnement"
                      checked={(formData?.Categorie as string[])?.includes(
                        "environnement"
                      )}
                      onChange={handleCategorieChange}
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                    <span>Environnement</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value="industries chimiques"
                      checked={(formData?.Categorie as string[])?.includes(
                        "industries chimiques"
                      )}
                      onChange={handleCategorieChange}
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                    <span>Industries Chimiques</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value="métiers de la mer"
                      checked={(formData?.Categorie as string[])?.includes(
                        "métiers de la mer"
                      )}
                      onChange={handleCategorieChange}
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                    <span>Métiers de la Mer</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value="éducation"
                      checked={(formData?.Categorie as string[])?.includes(
                        "éducation"
                      )}
                      onChange={handleCategorieChange}
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                    <span>Éducation</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value="finance et comptabilité"
                      checked={(formData?.Categorie as string[])?.includes(
                        "finance et comptabilité"
                      )}
                      onChange={handleCategorieChange}
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                    <span>Finance et Comptabilité</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value="médical"
                      checked={(formData?.Categorie as string[])?.includes(
                        "médical"
                      )}
                      onChange={handleCategorieChange}
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                    <span>Médical</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value="logistique"
                      checked={(formData?.Categorie as string[])?.includes(
                        "logistique"
                      )}
                      onChange={handleCategorieChange}
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                    <span>Logistique</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value="ressources humaines"
                      checked={(formData?.Categorie as string[])?.includes(
                        "ressources humaines"
                      )}
                      onChange={handleCategorieChange}
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                    <span>Ressources Humaines</span>
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
        <RishTextEditor setFormData={setFormData} formData={formData} />
        <h3 className="text-2xl poppins-semibold">Tags</h3>
        <p className="text-gray-600 poppins-regular">
          Améliorez la visibilité de votre événement en ajoutant des balises
          pertinentes au sujet.
        </p>
        <div className="mb-4 border-gray-300 border-[1.3px] p-2">
          <label
            htmlFor="tags"
            className="block text-sm poppins-medium poppins-semibold text-gray-700"
          >
            Appuyez sur Entrée pour ajouter un tag
          </label>
          <div className="flex flex-row mb-1">
            <input
              type="text"
              id="tags"
              name="tags" // Not actually used for input, but can follow naming conventions
              className="poppins-regular shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-4"
              placeholder="Décrivez votre événement ici"
              value={newTag} // Controlled input for the new tag
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={handleAddTag} // Handle Enter key press
            />
          </div>
          {renderTags()} {/* Display existing tags */}
        </div>
        <div className="mb-4 p-2">
          <h3 className="text-2xl poppins-semibold">Emplacement</h3>
          <p className="text-gray-600 poppins-regular">
            Aidez les gens à découvrir votre événement et indiquez aux
            participants où se présenter.
          </p>
          <div className="flex flex-row">
            <button
              onClick={() => {
                setFormData({ ...formData, link: null });
                setLocation(0);
              }}
              type="button"
              className={`mr-2  rounded-md py-1 px-4 poppins-medium  text-center ${
                location === 0 ? "bg-mainBlue text-white" : "text-gray-500"
              } `}
            >
              Lieu physique
            </button>
            <button
              onClick={() => {
                setFormData({ ...formData, location: null });
                setLocation(1);
              }}
              type="button"
              className={`mr-2  rounded-md py-1 px-4 poppins-medium  text-center ${
                location === 1 ? "bg-mainBlue text-white" : "text-gray-500"
              } `}
            >
              En ligne
            </button>
            <button
              onClick={() => {
                setFormData({ ...formData, location: null, link: null });

                setLocation(2);
              }}
              type="button"
              className={`mr-2  rounded-md py-1 px-4 poppins-medium  text-center ${
                location === 2 ? "bg-mainBlue text-white" : "text-gray-500"
              } `}
            >
              À annoncer plus tard
            </button>
          </div>
          {location !== 2 ? (
            <div className="flex flex-row  border-[1.3px] border-gray-400 py-3 mt-2 px-4">
              {location === 1 ? (
                <div className="flex items-center justify-center">
                  {" "}
                  <img
                    alt="search"
                    src="/icons/Search.svg"
                    className="w-[20px] h-[20px]"
                  />{" "}
                  <input
                    type="text"
                    id="link"
                    name="link"
                    className=" poppins-regular shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Lien de participation ou "
                    onChange={handleInputChange}
                    value={formData.link}
                  />
                </div>
              ) : location === 0 ? (
                <div className="flex items-center justify-center">
                  <img
                    alt="glob"
                    src="/icons/global.png"
                    className="w-[20px] h-[20px]"
                  />
                  <div style={{ width: "50vw" }}>
                    <SearchBox
                      location={formData.location}
                      handleLocation={handleLocation}
                    />
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
        <h3 className="text-2xl poppins-semibold">Dates & Horaires</h3>
        <p className="text-gray-600 poppins-regular">
          Dites aux participants quand ils doivent se rendre.
        </p>
        <div className="flex flex-row w-full">
          <div className="flex flex-col flex-1 mr-2">
            <div className="border-gray-300 border-[1.3px] p-2 mb-[5px] md:h-[56px] rounded-[4px]">
              <label
                htmlFor="startdate"
                className="block text-sm poppins-medium poppins-semibold text-gray-700"
              >
                Date de début
              </label>
              <div className="flex flex-row">
                <img
                  alt="calendar"
                  src="/icons/CalendarGray.png"
                  className="mr-1 w-[20px] h-[20px]"
                />
                <DatePicker
                  selected={formData.startdate ? formData.startdate : startDate}
                  onChange={(date) => handleDateChange(date, "start")}
                  dateFormat="yyyy-MM-dd"
                  className="poppins-regular shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholderText="Select start date"
                  minDate={new Date()}
                />{" "}
              </div>
            </div>
            <div className="border-gray-300 border-[1.3px] p-2 mb-[5px] md:h-[56px] rounded-[4px]">
              <label
                htmlFor="enddate"
                className="block text-sm poppins-medium poppins-semibold text-gray-700"
              >
                Date de fin
              </label>
              <div className="flex flex-row">
                <img
                  alt="calendar"
                  src="/icons/CalendarGray.png"
                  className="mr-1 w-[20px] h-[20px]"
                />
                <DatePicker
                  selected={formData.enddate ? formData.enddate : endDate}
                  onChange={(date) => handleDateChange(date, "end")}
                  dateFormat="yyyy-MM-dd"
                  className="poppins-regular shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholderText="Select end date"
                  minDate={startDate}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col flex-1 flex-wrap">
            <div id="startHour" className="flex flex-col mb-[5px]">
              {" "}
              <label
                htmlFor="startHour"
                className="block text-sm poppins-medium poppins-semibold text-gray-700 absolute ml-2"
              >
                Heure de debut
              </label>
              <TimePickerUi
                initTime={formData?.startHour}
                setFormData={setFormData}
                name="startHour"
              />
            </div>

            <div id="endHour" className="flex flex-col ">
              <label
                htmlFor="endHour"
                className="block text-sm poppins-medium poppins-semibold text-gray-700  absolute ml-2 "
              >
                Heure de fin
              </label>
              <TimePickerUi
                initTime={formData?.endHour}
                setFormData={setFormData}
                name="endHour"
              />
            </div>
          </div>
        </div>

        <h3 className="text-2xl poppins-semibold">Liens</h3>
        <p className="text-gray-600 poppins-regular">
          Aidez les participants à vous contacter et à voir vos informations,
          pour les aider à vous joindre{" "}
        </p>

        <div className="mb-2 border-gray-300 border-[1.3px] p-2 flex flex-row">
          <img alt="mobile" src={"/icons/mobile.png"} />
          <input
            type="text"
            id="mobile"
            value={formData.mobile}
            name="mobile"
            className="poppins-regular ml-2 py- shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="06.00.00.00.00"
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-2 border-gray-300 border-[1.3px] p-2 flex flex-row">
          <img alt="mobile" src={"/icons/global.png"} />

          <input
            type="text"
            id="website"
            name="website"
            value={formData.website}
            className="poppins-regular ml-2 py- shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="www.exemple.com"
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-2 border-gray-300 border-[1.3px] p-2 flex flex-row">
          <img alt="mobile" src={"/icons/EditSquare.png"} />

          <input
            type="text"
            id="linkInscription"
            name="linkInscription"
            value={formData.linkInscription}
            className="poppins-regular ml-2 py- shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="www.exemple.com/inscription"
            onChange={handleInputChange}
          />
        </div>
      </form>
    </div>
  );
}

export default EventForm;
