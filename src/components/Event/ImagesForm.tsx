import React from "react";

function ImagesForm() {
  return (
    <div className="relative flex flex-col justify-center items-center">
      <div className="relative flex justify-center items-center">
        <img
          alt="bgImage"
          src="/registerimg.jpeg"
          className="w-full h-full object-cover"
        />

        {/* File input, hidden */}
        <input
          type="file"
          id="media"
          name="media"
          accept=".jpg,.jpeg,.png,mp4"
          className="absolute inset-0 opacity-0 cursor-pointer"
        />

        {/* Label acting as a button for file input */}
        <label
          htmlFor="media"
          className="absolute inset-0 flex flex-col justify-center items-center cursor-pointer"
        >
          <img alt="uploadicon" src="/upload.png" className="w-16 h-16" />
          <h3 className="text-mainBlue poppins-medium mt-2">
            Téléchargez des photos et une vidéo
          </h3>
        </label>
      </div>
    </div>
  );
}

export default ImagesForm;
