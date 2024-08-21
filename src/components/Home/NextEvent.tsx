import { IEvent } from "@/types/Event";
import { useRouter } from "next/navigation";
import React from "react";

// Function to format the date
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const options = { day: "numeric", month: "long", year: "numeric" } as const;
  return new Intl.DateTimeFormat("en-US", options).format(date);
}

function NextEvent({ events }: { events: IEvent[] }) {
  const router = useRouter();
  return (
    <div className="w-full p-4">
      <div className="w-[90%] ml-14 my-3">
        <h2 className="text-3xl font-extrabold text-titles mb-4">
          Prochains événements
        </h2>
      </div>
      <div className="flex space-x-4 mb-4 ml-10">
        <button className="px-4 py-2 text-gray-500 rounded">
          Conférences et Congrès
        </button>
        <button className="px-4 py-2 text-gray-500 rounded">Energy</button>
        <button className="px-4 py-2 text-gray-500 rounded">
          Tech & Innovation
        </button>
        <button className="px-4 py-2 text-gray-500 rounded">Business</button>
      </div>
      <div className="flex space-x-4 overflow-x-auto items-center justify-center w-full">
        {events.length !== 0 ? (
          events.map((event, index) => (
            <div
              onClick={() => router.push(`events/details/${event._id}`)}
              key={index}
              className="w-[300px] flex-shrink-0 bg-white shadow-md rounded-lg overflow-hidden"
            >
              <img
                alt="event-img"
                className="object-cover w-full h-48"
                src={
                  event.eventImages
                    ? `${process.env.NEXT_PUBLIC_SERVER_URL}event/image/${event.eventImages[0]}`
                    : "https://via.placeholder.com/300x200"
                }
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold">{event.eventName}</h3>
                <p className="text-gray-600 flex flex-row items-center">
                  <img alt="location-icon" src="/icons/LocationGray.png" />
                  {event.location?.address?.commercial
                    ? event.location?.address?.commercial
                    : event.location?.address?.state}
                </p>
                <p className="text-gray-600 flex flex-row items-center">
                  <img alt="calendar-icon" src="/icons/CalendarGray.png" />
                  {event.startdate
                    ? formatDate(event.startdate as unknown as string)
                    : null}{" "}
                  {/* Date formatting applied here */}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full p-4">Aucun événement à afficher</div>
        )}
      </div>
      <div className="w-full flex justify-center items-center">
        <button
          onClick={() => router.replace("/search")}
          className="mr-2 rounded-[10px] px-6 py-3 bg-mainBlue text-white text-center"
        >
          Voir plus
        </button>
      </div>
    </div>
  );
}

export default NextEvent;
