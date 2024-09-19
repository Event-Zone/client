"use client";
import React, { useEffect, useRef, useState } from "react";
import RishTextEditor from "../shared/RishTextEditor";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays, format } from "date-fns";
import SearchBox from "../shared/SearchBox";
import TimePickerUi from "../shared/TimePickerUi";
import {
  useGetCategoriesQuery,
  useGetTypesQuery,
} from "@/store/features/api/apiSlice";
import Progress from "../shared/Progress";
import { useTranslations } from "next-intl";

function EventForm({
  fetchedSubscription,
  setIsNext,
  formData,
  setFormData,
}: {
  setIsNext: Function;
  formData: any;
  fetchedSubscription: any;
  setFormData: Function;
}) {
  const {
    data: Categories,
    isLoading: CategoriesLoading,
    error: CategoriesError,
  } = useGetCategoriesQuery();
  const {
    data: Types,
    isLoading: TypesLoading,
    error: TypesError,
  } = useGetTypesQuery();

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
      if (tag !== " ")
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
  const t = useTranslations("Event");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setCategorieSelectorVisible(false);
      }
    };

    if (isCategorieSelectorVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCategorieSelectorVisible]);
  return (
    <div>
      <h3 className="text-2xl poppins-semibold">{t("infoDeBase")}</h3>
      <p className="text-gray-600 poppins-regular">{t("Nommez")}</p>
      <form className="mt-8">
        <div className="mb-4  border-gray-300 border-[1.3px] md:p-2">
          <label
            htmlFor="eventName"
            className="block text-sm poppins-medium poppins-semibold text-gray-700"
          >
            {t("Nom")}
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
            {t("Acronym")}
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
            {Types?.map((type: any) => (
              <option
                key={type._id}
                value={type.name}
                className="text-gray-500"
              >
                {type.name}
              </option>
            ))}
          </select>

          <div className="md:mr-4 pl-10 flex-1 poppins-regular text-gray-500 focus:outline-none border-gray-300 border-[1.3px] p-2">
            {" "}
            <div
              onClick={() =>
                setCategorieSelectorVisible(!isCategorieSelectorVisible)
              }
            >
              {t("Category")}
            </div>
            {isCategorieSelectorVisible && (
              <div
                ref={dropdownRef} // Attach ref to the dropdown
                className="bg-white p-4 rounded-md shadow-md z-30 absolute "
              >
                <div className="flex flex-col space-y-2 h-[400px] overflow-scroll">
                  {Categories?.map((category: any) => (
                    <label
                      key={category._id}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        value={category.name}
                        checked={(formData?.Categorie as string[])?.includes(
                          category.name
                        )}
                        onChange={handleCategorieChange}
                        className="form-checkbox h-4 w-4 text-blue-600"
                      />
                      <span>{category.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <RishTextEditor setFormData={setFormData} formData={formData} />
        <h3 className="text-2xl poppins-semibold">Tags</h3>
        <p className="text-gray-600 poppins-regular">{t("Tags")}</p>
        <div className="mb-4 border-gray-300 border-[1.3px] p-2">
          <label
            htmlFor="tags"
            className="block text-sm poppins-medium poppins-semibold text-gray-700"
          >
            {t("addTag")}
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
          <h3 className="text-2xl poppins-semibold"> {t("Emplacement")}</h3>
          <p className="text-gray-600 poppins-regular">
            {t("EmplacementDescription")}
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
              {t("Lieuphysique")}
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
              {t("Enligne")}
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
              {t("aPlustard")}
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
        <h3 className="text-2xl poppins-semibold">{t("DateTitle")}</h3>
        <p className="text-gray-600 poppins-regular">{t("DateDesc")}</p>
        <div className="flex flex-row w-full">
          <div className="flex flex-col flex-1 mr-2">
            <div className="border-gray-300 border-[1.3px] p-2 mb-[5px] md:h-[56px] rounded-[4px]">
              <label
                htmlFor="startdate"
                className="block text-sm poppins-medium poppins-semibold text-gray-700"
              >
                {t("startDate")}
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
                {t("endDate")}
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
                {t("startHour")}
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
                {t("endHour")}
              </label>
              <TimePickerUi
                initTime={formData?.endHour}
                setFormData={setFormData}
                name="endHour"
              />
            </div>
          </div>
        </div>

        <h3 className="text-2xl poppins-semibold">Links</h3>
        <p className="text-gray-600 poppins-regular">{t("contacts")}</p>

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
          <img alt="global" src={"/icons/global.png"} />

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
          <img alt="linksubscription" src={"/icons/EditSquare.png"} />

          {fetchedSubscription.pack !== "Starter" && (
            <input
              type="text"
              id="linkInscription"
              name="linkInscription"
              value={formData.linkInscription}
              className="poppins-regular ml-2 py- shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="www.exemple.com/inscription"
              onChange={handleInputChange}
            />
          )}
        </div>
      </form>
      {(CategoriesLoading || TypesLoading) && <Progress />}
    </div>
  );
}

export default EventForm;
