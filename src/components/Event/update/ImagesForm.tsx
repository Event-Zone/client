import React, { useEffect, useState } from "react";
import ImagesSection from "./ImagesSection";
import PropretiesSection from "./PropretiesSection";
import SponsorsSection from "./SponsorsSection";

function ImagesForm({
  setIsNext,
  formData,
  setFormData,
  eventImagesData,
  sponsorImagesData,
  formValuesData,
}: {
  formValuesData: any;
  eventImagesData: any;
  sponsorImagesData: any;
  setIsNext: React.Dispatch<React.SetStateAction<boolean>>;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}) {
  const [isFormValid, setIsFormValid] = useState(false);
  useEffect(() => {
    if (formData.getAll("eventImages").length > 0 && isFormValid) {
      console.log("all fields are filled");
      setIsNext(true);
    } else {
      console.log(
        "not all fields are filled",
        formData.getAll("eventImages").length,
        isFormValid
      );

      setIsNext(false);
    }
  }, [formData, isFormValid]);

  const [sponsorImages, setSponsorImages] = useState<File[]>(sponsorImagesData);

  const [showEventProperties, setShowEventProperties] = useState(false);
  const [eventImages, setEventImages] = useState<File[]>(eventImagesData);
  const [isSponsorsSubmitted, setIsSponsorsSubmitted] = useState(false);
  const [isEventImagesSubmitted, setIsEventImagesSubmitted] = useState(false);
  const [formValues, setFormValues] = useState(formValuesData);

  const toggleEventProperties = () => {
    setShowEventProperties(!showEventProperties);
  };

  useEffect(() => {
    const filesArray = eventImages;
    console.log(filesArray);

    if (eventImages?.length > 4) {
      alert("You can upload a maximum of 4 images.");
      setEventImages((prevImages) => prevImages.slice(0, -1)); // Remove the last file
      return;
    }
  }, [eventImages]);

  useEffect(() => {
    console.log("eventImages", eventImages);
  }, [eventImages]);

  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    const updatedFormData = new FormData();

    eventImages.forEach((image) => {
      updatedFormData.append("eventImages", image);
    });
    if (videoUrl) {
      updatedFormData.append("videoUrl", videoUrl);
    }
    (Object.keys(formValues) as (keyof typeof formValues)[]).forEach(
      (key: any) => {
        updatedFormData.append(key, formValues[key]);
      }
    );
    let rep = Object.values(formValues).every((value) => value !== "");
    setIsFormValid(rep);
    console.log(isFormValid);
    setFormData(updatedFormData);
  }, [videoUrl, eventImages, formValues, isFormValid]);

  return (
    <div className=" rounded-3xl p-8 relative  w-full h-full">
      <div className=" relative w-full mb-3 border-[1.4px] border-gray-500 rounded-3xl p-4">
        <ImagesSection
          eventImages={eventImages}
          setEventImages={setEventImages}
          videoUrl={videoUrl}
          setVideoUrl={setVideoUrl}
        />
      </div>
      {/* Event Properties Section */}
      <PropretiesSection
        setFormValues={setFormValues}
        formValues={formValues}
      />
      {/* Sponsor Upload Section */}
      <SponsorsSection
        sponsorImages={sponsorImages}
        setSponsorImages={setSponsorImages}
      />
    </div>
  );
}

export default ImagesForm;
