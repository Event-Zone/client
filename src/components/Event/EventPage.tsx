import React, { useEffect } from "react";

function EventPage({ data }: { data: any }) {
  // const [data, setdata] = React.useState({
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
  // const data = new FormData();
  // data.append("eventImages", new Blob(), "eventImage.jpg");
  // data.append("organizerImg", "https://via.placeholder.com/150");
  // data.append("organizerName", "John Doe");
  // data.append("lieu", "123 Event Street, City, Country");
  // data.append("sponsorImages", "https://via.placeholder.com/150");
  // data.append("sponsorImages", "https://via.placeholder.com/150");
  useEffect(() => {
    console.log(data);
  }, []);
  return (
    <div className="flex flex-col w-full p-44">
      <div className="flex justify-center items-center ">
        <img
          alt="coverImg"
          className="w-full"
          src={
            data.eventImages
              ? `${process.env.NEXT_PUBLIC_SERVER_URL}event/image/${data.eventImages[0]}`
              : "https://via.placeholder.com/300"
          }
        />
      </div>
      <div className="flex ">
        <p className="poppins-regular text-titles bg-mainBlue bg-opacity-5 rounded-lg px-4 py-2 mr-3">
          {data.type}
        </p>
        <p className="poppins-regular text-titles bg-mainBlue bg-opacity-5 rounded-lg px-4 py-2 mr-3">
          {data.Categorie}
        </p>
      </div>
      <div className=" ">
        <p className="poppins-medium text-gray-600  rounded-lg px-4 py-2 ">
          {data.startdate} / {data.enddate}
        </p>
      </div>
      <div className=" mt-4 poppins-semibold text-titles text-3xl">
        {data.eventAcronym ? (
          <h1>
            {data.eventAcronym} - {data.eventName}
          </h1>
        ) : (
          <h1>{data.eventName}</h1>
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
            src={data?.organizerImg}
          />
          <div className="text-gray-600">
            <h3 className="poppins-medium">Organisateur</h3>

            <p className="poppins-medium text-titles">{data.organizerName}</p>
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
            Du {data.startdate} au {data.enddate}
          </p>{" "}
        </div>
        <div className="flex items-center">
          <img alt="icon" src="/clock.png" className="w-[15px] h-[15px] mr-2" />{" "}
          <p className="poppins-regular text-gray-600">
            {data.startHour} - {data.endHour}
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
            {data?.location ? data?.location?.address?.state : <>Online</>}
          </p>
        </div>
        <div className="flex items-center">
          <img alt="icon" src="/gps.png" className="w-[20px] h-[20px] mr-2" />{" "}
          <a
            target="_blank"
            href={`https://www.google.com/maps/place/${data?.location?.lat},${data?.location?.lon}`}
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
          dangerouslySetInnerHTML={{ __html: data.eventDescription }}
          className="poppins-regular text-gray-800 list-disc list-inside"
        />
      </div>
      <div className="mt-4 poppins-semibold text-titles">
        <h3>Sponsors</h3>
        <div className="flex  ">
          {data?.sponsorImages.map((img: any, index: number) => (
            <img
              className="rounded-lg w-[100px] h-[100px] mr-3"
              key={index}
              alt={`sponsor-${index}`}
              src={
                img
                  ? `${process.env.NEXT_PUBLIC_SERVER_URL}event/image/${img}`
                  : "https://via.placeholder.com/300"
              }
            />
          ))}
        </div>
      </div>
      <div className="mt-4 poppins-meduim">
        <h3 className="poppins-semibold text-2xl text-titles">Tags</h3>
        <div className="flex">
          {data.tags.map((tag: string, index: number) => (
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

export default EventPage;
