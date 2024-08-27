"use client";
import React, { useEffect, useRef, useState } from "react";
import RishTextEditor from "../../shared/RishTextEditor";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays, format } from "date-fns";
import SearchBox from "../../shared/SearchBox";

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

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  useEffect(() => {
    if (
      formData.startdate &&
      formData.enddate &&
      formData.eventName !== "" &&
      formData.eventName &&
      formData.type &&
      formData.Categorie &&
      formData.type !== "" &&
      formData.Categorie !== "" &&
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
  }, []);
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
    return formData.tags.map((tag: any, index: number) => (
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
    ));
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
            className="block text-sm font-medium poppins-semibold text-gray-700"
          >
            Nom de l'événement
          </label>
          <input
            type="text"
            id="eventName"
            name="eventName"
            className="shadow-sm p-3 poppins-regular focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="soyez claire et descriptifs"
            onChange={handleInputChange}
            value={formData.eventName}
          />
        </div>
        <div className="mb-4 border-gray-300 border-[1.3px] p-2">
          <label
            htmlFor="eventAcronym"
            className="block text-sm font-medium poppins-semibold text-gray-700"
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

          <select
            value={formData.Categorie}
            onChange={handleInputChange}
            name="Categorie"
            className=" poppins-regular flex-1 border-gray-300 border-[1.3px] md:ml-2  p-2 pl-10 text-gray-500 focus:outline-none"
          >
            <option value="" disabled selected className="text-gray-500">
              Catégorie
            </option>
            <option value="recrutement" className="text-gray-500">
              Recrutement
            </option>
            <option value="securite" className="text-gray-500">
              Sécurité
            </option>
            <option value="services evenementiels" className="text-gray-500">
              Services Événementiels
            </option>
            <option value="energies renouvelables" className="text-gray-500">
              Énergies Renouvelables
            </option>
            <option
              value="startups et entrepreneuriat"
              className="text-gray-500"
            >
              Startups et Entrepreneuriat
            </option>
            <option value="technologie" className="text-gray-500">
              Technologie
            </option>
            <option value="telecommunications" className="text-gray-500">
              Télécommunications
            </option>
            <option value="transport" className="text-gray-500">
              Transport
            </option>
            <option value="travaux publics" className="text-gray-500">
              Travaux publics
            </option>
            <option value="intelligence artificielle" className="text-gray-500">
              Intelligence Artificielle (IA)
            </option>
            <option value="machines et outils" className="text-gray-500">
              Machines et Outils
            </option>
            <option value="marketing et publicite" className="text-gray-500">
              Marketing et Publicité
            </option>
            <option
              value="mathematiques et statistiques"
              className="text-gray-500"
            >
              Mathématiques et Statistiques
            </option>
            <option value="medecine esthetique" className="text-gray-500">
              Médecine Esthétique
            </option>
            <option value="physique" className="text-gray-500">
              Physique
            </option>
            <option value="sante et medecine" className="text-gray-500">
              Santé et Médecine
            </option>
            <option value="sante mentale" className="text-gray-500">
              Santé Mentale
            </option>
            <option
              value="robotique et automatisation"
              className="text-gray-500"
            >
              Robotique et Automatisation
            </option>
            <option value="electricite" className="text-gray-500">
              Électricité
            </option>
            <option value="emballages" className="text-gray-500">
              Emballages
            </option>
            <option value="energie" className="text-gray-500">
              Énergie
            </option>
            <option value="enseignement superieur" className="text-gray-500">
              Enseignement Supérieur
            </option>
            <option value="environnement" className="text-gray-500">
              Environnement
            </option>
            <option value="expedition" className="text-gray-500">
              Expédition
            </option>
            <option value="genie civil" className="text-gray-500">
              Génie Civil
            </option>
            <option value="immobilier" className="text-gray-500">
              Immobilier
            </option>
            <option
              value="importation et exportation"
              className="text-gray-500"
            >
              Importation et Exportation
            </option>
          </select>
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
            className="block text-sm font-medium poppins-semibold text-gray-700"
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
              onClick={() => setLocation(2)}
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
            <div className="border-gray-300 border-[1.3px] p-2 mb-2">
              <label
                htmlFor="startdate"
                className="block text-sm font-medium poppins-semibold text-gray-700"
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
            <div className="border-gray-300 border-[1.3px] p-2">
              <label
                htmlFor="enddate"
                className="block text-sm font-medium poppins-semibold text-gray-700"
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
          <div className="flex flex-col flex-1">
            {" "}
            <div className="border-gray-300 border-[1.3px] p-2 mb-2">
              <label
                htmlFor="startHour"
                className="block text-sm font-medium poppins-semibold text-gray-700"
              >
                Heure de début
              </label>
              <div className="flex flex-row">
                <img
                  alt="calendar"
                  src="/icons/clock.png"
                  className="mr-1 w-[20px] h-[20px]"
                />
                <input
                  type="time"
                  id="startHour"
                  value={formData.startHour}
                  name="startHour"
                  className=" poppins-regular shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="border-gray-300 border-[1.3px] p-2">
              <label
                htmlFor="endHour"
                className="block text-sm font-medium poppins-semibold text-gray-700"
              >
                Heure de fin
              </label>
              <div className="flex flex-row">
                <img
                  alt="calendar"
                  src="/icons/clock.png"
                  className="mr-1 w-[20px] h-[20px]"
                />
                <input
                  value={formData.endHour}
                  type="time"
                  id="endHour"
                  name="endHour"
                  className="poppins-regular shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  onChange={handleInputChange}
                />
              </div>
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
            name="mobile"
            value={formData.mobile}
            className="poppins-regular ml-2 py- shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="06.00.00.00.00"
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-2 border-gray-300 border-[1.3px] p-2 flex flex-row">
          <img alt="mobile" src={"/icons/global.png"} />

          <input
            type="text"
            value={formData.website}
            id="website"
            name="website"
            className="poppins-regular ml-2 py- shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="www.exemple.com"
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-2 border-gray-300 border-[1.3px] p-2 flex flex-row">
          <img alt="mobile" src={"/icons/EditSquare.png"} />

          <input
            type="text"
            value={formData.linkInscription}
            id="linkInscription"
            name="linkInscription"
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
