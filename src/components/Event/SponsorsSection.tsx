import React, { useState } from "react";

function SponsorsSection({
  sponsorImages,
  setSponsorImages,
}: {
  sponsorImages: File[];
  setSponsorImages: Function;
}) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSponsorsCompleted, setIsSponsorsCompleted] = useState(false);

  const [showSponsorUpload, setShowSponsorUpload] = useState(false);

  const handleSponsorImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      setSponsorImages((prevImages: any) => [
        ...prevImages,
        ...Array.from(event.target.files as FileList),
      ]);
      setIsSubmitted(true);
      setIsSponsorsCompleted(true);
    }
  };

  const toggleSponsorUpload = () => {
    setShowSponsorUpload(!showSponsorUpload);
  };

  const handleDeleteImage = (index: number) => {
    const updatedImages = sponsorImages.filter((_, i) => i !== index);
    setSponsorImages(updatedImages);
  };

  return (
    <div className="relative flex flex-col justify-center items-center w-full mt-8">
      <div className="flex justify-between items-center w-full p-4 bg-gray-200 rounded-lg">
        <h3 className="text-lg font-semibold">Sponsor de l'événement</h3>
        {isSponsorsCompleted ? (
          <img
            alt="submittedicon"
            className="w-[25px] h-[25px]"
            src="/icons/submittedIcon.png"
          />
        ) : (
          <button onClick={toggleSponsorUpload} className="text-xl font-bold">
            +
          </button>
        )}
      </div>
      {showSponsorUpload && (
        <div className="w-full p-4 bg-gray-100 rounded-lg mt-2">
          <label
            htmlFor="sponsorMedia"
            className="relative p-8 bg-white inset-0 flex flex-col justify-center items-center cursor-pointer rounded-lg"
          >
            <input
              type="file"
              multiple
              id="sponsorMedia"
              name="sponsorMedia"
              accept=".jpg,.jpeg,.png"
              className="relative inset-0 opacity-0 cursor-pointer"
              onChange={handleSponsorImageChange}
            />
            <img
              alt="uploadicon"
              src="/icons/upload.png"
              className="w-16 h-16"
            />
            <h3 className="text-mainBlue poppins-medium mt-2">
              Téléchargez des images
            </h3>
          </label>
          <div className="flex flex-wrap mt-4">
            {sponsorImages.map((image, index) => (
              <div key={index} className="relative w-24 h-24 m-2">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`sponsor-${index}`}
                  className="w-full h-full object-cover rounded-lg"
                />
                <button
                  onClick={() => handleDeleteImage(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SponsorsSection;
