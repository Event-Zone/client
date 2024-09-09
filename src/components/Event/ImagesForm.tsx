import React, { useEffect, useState } from "react";
import ImagesSection from "./ImagesSection";
import PropretiesSection from "./PropretiesSection";
import SponsorsSection from "./SponsorsSection";
import EventForm from "./EventForm";

function ImagesForm({
  setIsNext,
  formData,
  setFormData,
}: {
  setIsNext: React.Dispatch<React.SetStateAction<boolean>>;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}) {
  const [isFormValid, setIsFormValid] = useState(false);
  useEffect(() => {
    if (formData.getAll("eventImages").length > 0) {
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

  const [sponsorImages, setSponsorImages] = useState<File[]>(
    Array.from(formData.getAll("sponsorImages")).map((item) =>
      typeof item === "string" ? new File([], item) : item
    )
  );
  const [eventImages, setEventImages] = useState<File[]>(
    Array.from(formData.getAll("eventImages")).map((item) =>
      typeof item === "string" ? new File([], item) : item
    )
  );

  const [showEventProperties, setShowEventProperties] = useState(false);
  const [isSponsorsSubmitted, setIsSponsorsSubmitted] = useState(false);
  const [isEventImagesSubmitted, setIsEventImagesSubmitted] = useState(false);
  const [formValues, setFormValues] = useState({
    accessibilite: formData.get("accessibilite"),
    portee: formData.get("portee"),
    public: formData.get("public"),
    lieu: formData.get("lieu"),
  });

  const toggleEventProperties = () => {
    setShowEventProperties(!showEventProperties);
  };

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
  useEffect(() => {
    console.log("formData", formData);
  }, [formData]);

  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    const updatedFormData = new FormData();
    sponsorImages.forEach((image) => {
      updatedFormData.append("sponsorImages", image);
    });
    eventImages.forEach((image) => {
      updatedFormData.append("eventImages", image);
    });
    if (videoUrl) {
      updatedFormData.append("videoUrl", videoUrl);
    }
    (Object.keys(formValues) as (keyof typeof formValues)[]).forEach((key) => {
      updatedFormData.append(key, formValues[key]!);
    });
    let rep = Object.values(formValues).every((value) => value !== "");
    setIsFormValid(rep);
    console.log(isFormValid);
    setFormData(updatedFormData);
  }, [sponsorImages, videoUrl, eventImages, formValues, isFormValid]);

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
