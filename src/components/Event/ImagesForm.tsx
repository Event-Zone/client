import React, { useEffect, useState } from "react";
import ImagesSection from "./ImagesSection";
import PropretiesSection from "./PropretiesSection";
import SponsorsSection from "./SponsorsSection";

function ImagesForm({
  formData,
  setFormData,
}: {
  formData: any;
  setFormData: Function;
}) {
  const [sponsorImages, setSponsorImages] = useState<File[]>([]);

  const [showEventProperties, setShowEventProperties] = useState(false);
  const [eventImages, setEventImages] = useState<File[]>([]);
  const [isSponsorsSubmitted, setIsSponsorsSubmitted] = useState(false);
  const [isEventImagesSubmitted, setIsEventImagesSubmitted] = useState(false);
  const [formValues, setFormValues] = useState({
    accessibilite: "",
    portee: "",
    public: "",
    lieu: "",
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
      updatedFormData.append(key, formValues[key]);
    });
    setFormData(updatedFormData);
  }, [sponsorImages, videoUrl, eventImages, formValues]);
  useEffect(() => {
    console.log(formData.get("videoUrl"));
  }, [formData]);
  return (
    <div className=" rounded-3xl p-8 relative flex flex-col justify-center items-center w-full h-full">
      <div className="w-full mb-3 border-[1.4px] border-gray-500 rounded-3xl p-4">
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
