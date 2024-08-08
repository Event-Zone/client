import React, { useEffect } from "react";

function EventDetails({
  firstFormData,
  secondFormData,
}: {
  firstFormData: any;
  secondFormData: any;
}) {
  // const [firstFormData, setFirstFormData] = React.useState({
  //   eventName: "Sample Event",
  //   eventAcronym: "SE",
  //   eventDescription:
  //     "<b>DSFSDFSDFSFSDFS</b><div><ul><li>ddfsdf</li><li>ddfsdf</li></ul><ol><li>sdfsdf</li></ol></div>",
  //   tags: ["tag1", "tag2"],
  //   startdate: "2023-10-01",
  //   enddate: "2023-10-02",
  //   startHour: "10:00 AM",
  //   endHour: "5:00 PM",
  //   mobile: "123-456-7890",
  //   website: "https://example.com",
  //   linkInscription: "https://example.com/register",
  //   type: "Conference",
  //   Categorie: "Technology",
  // });
  // const secondFormData = new FormData();
  // secondFormData.append("eventImages", new Blob(), "eventImage.jpg");
  // secondFormData.append("organizerImg", "https://via.placeholder.com/150");
  // secondFormData.append("organizerName", "John Doe");
  // secondFormData.append("lieu", "123 Event Street, City, Country");
  // secondFormData.append("sponsorImages", "https://via.placeholder.com/150");
  // secondFormData.append("sponsorImages", "https://via.placeholder.com/150");
  useEffect(() => {
    console.log(firstFormData);
  }, []);
  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-center items-center ">
        <img
          alt="coverImg"
          className="w-full"
          src={
            secondFormData.get("eventImages")
              ? URL.createObjectURL(secondFormData.get("eventImages"))
              : "https://via.placeholder.com/300"
          }
        />
      </div>
      <div className="flex ">
        <p className="poppins-regular text-titles bg-mainBlue bg-opacity-5 rounded-lg px-4 py-2 mr-3">
          {firstFormData.type}
        </p>
        <p className="poppins-regular text-titles bg-mainBlue bg-opacity-5 rounded-lg px-4 py-2 mr-3">
          {firstFormData.Categorie}
        </p>
      </div>
      <div className=" ">
        <p className="poppins-medium text-gray-600  rounded-lg px-4 py-2 ">
          {firstFormData.startdate} / {firstFormData.enddate}
        </p>
      </div>
      <div className=" mt-4 poppins-semibold text-titles text-3xl">
        {firstFormData.eventAcronym ? (
          <h1>
            {firstFormData.eventAcronym} - {firstFormData.eventName}
          </h1>
        ) : (
          <h1>{firstFormData.eventName}</h1>
        )}
      </div>

      <div className="flex justify-around mt-4">
        <div className="rounded-xl poppins-regular  p-4 text-white bg-mainBlue flex ">
          <img alt="icon" src="/EditSquare.png" />{" "}
          <button className="rounded-xl poppins-regular  px-4 h-full w-full  ">
            Participer{" "}
          </button>
        </div>
        <div className="rounded-xl poppins-regular text-titles p-4 hover:text-white hover:bg-titles flex ">
          <img alt="icon" src="/global.png" />{" "}
          <button className="rounded-xl poppins-regular  px-4 h-full w-full  hover:bg-titles">
            Site Web
          </button>
        </div>
        <div className="rounded-xl poppins-regular text-titles p-4 hover:text-white hover:bg-titles flex ">
          <img alt="icon" src="/mobile.png" />{" "}
          <button className="rounded-xl poppins-regular  px-4 h-full w-full  hover:bg-titles">
            Mobile{" "}
          </button>
        </div>
        <div className="rounded-xl poppins-regular text-titles p-4 hover:text-white hover:bg-titles flex ">
          <img alt="icon" src="/gps.png" />{" "}
          <button className="text-sm rounded-xl poppins-regular  px-4 h-full w-full  hover:bg-titles">
            Voir sur la carte
          </button>
        </div>
      </div>
      <div className="mt-4 bg-mainBlue bg-opacity-[5%] rounded-lg">
        <div className="flex items-center p-8">
          <img
            alt="organizerImg"
            className="max-w-[50px] max-h-[50px]"
            src={secondFormData.get("organizerImg") as string}
          />
          <div className="text-gray-600">
            <h3 className="poppins-medium">Organisateur</h3>

            <p className="poppins-medium text-titles">
              {secondFormData.get("organizerName") as string}
            </p>
          </div>
          add the hosted events
        </div>
      </div>
      <div className="mt-4 poppins-semibold text-titles">
        <h3>Date et Horaires</h3>
        <div className="flex items-center">
          <img
            alt="icon"
            src="/calendarGray.png"
            className="w-[15px] h-[15px] mr-2"
          />{" "}
          <p className="poppins-regular text-gray-600">
            Du {firstFormData.startdate} au {firstFormData.enddate}
          </p>{" "}
        </div>
        <div className="flex items-center">
          <img alt="icon" src="/clock.png" className="w-[15px] h-[15px] mr-2" />{" "}
          <p className="poppins-regular text-gray-600">
            {firstFormData.startHour} - {firstFormData.endHour}
          </p>{" "}
        </div>
        <div className="flex items-center">
          <img
            alt="icon"
            src="/Frame 1170.png"
            className="w-[15px] h-[15px] mr-2"
          />{" "}
          <a
            target="_blank"
            href="https://www.google.com/maps/place/"
            className="poppins-regular text-sm text-mainBlue"
          >
            ajouter au calendrie google{" "}
          </a>{" "}
        </div>
      </div>
      <div className="mt-4 poppins-semibold text-titles">
        <h3>Localisation</h3>
        <div className="flex items-center">
          <img
            alt="icon"
            src="/Location.svg"
            className="w-[20px] h-[20px] mr-2"
          />{" "}
          <p className="poppins-regular text-gray-800">
            {firstFormData.location}
          </p>
        </div>
        <div className="flex items-center">
          <img alt="icon" src="/gps.png" className="w-[20px] h-[20px] mr-2" />{" "}
          <a
            target="_blank"
            href="https://www.google.com/maps/place/"
            className="poppins-regular text-sm text-mainBlue"
          >
            voir sur la carte{" "}
          </a>{" "}
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mt-4 poppins-semibold text-titles text-2xl">
          A propos de cet événement
        </h3>
        <p
          dangerouslySetInnerHTML={{ __html: firstFormData.eventDescription }}
          className="poppins-regular text-gray-800 list-disc list-inside"
        />
      </div>
      <div className="mt-4 poppins-semibold text-titles">
        <h3>Sponsors</h3>
        <div className="flex  ">
          {secondFormData
            .getAll("sponsorImages")
            .map((img: any, index: number) => (
              <img
                className="rounded-lg w-[100px] h-[100px] mr-3"
                key={index}
                alt={`sponsor-${index}`}
                src={
                  img
                    ? URL.createObjectURL(img)
                    : "https://via.placeholder.com/300"
                }
              />
            ))}
        </div>
      </div>
      <div className="mt-4 poppins-meduim">
        <h3 className="poppins-semibold text-2xl text-titles">Tags</h3>
        <div className="flex">
          {firstFormData.tags.map((tag: string, index: number) => (
            <span
              key={index}
              className="tag mr-4 poppins-meduim text-titles rounded-lg px-3 bg-gray-200"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EventDetails;
