import { IEvent } from "@/types/Event";
import React from "react";

interface EventCardProps {
  event: IEvent;
}

function EventCard({ event }: EventCardProps) {
  return (
    <div className="flex border border-gray-300 rounded-lg overflow-hidden shadow-md">
      <img
        src={`${process.env.NEXT_PUBLIC_SERVER_URL}event/image/${event?.eventImages[0]}`}
        alt={event.eventName}
        className="w-1/3 h-auto object-cover"
      />
      <div className="p-4 w-2/3">
        <h3 className="text-xl font-semibold mb-2">{event.eventName}</h3>
        <p className="text-gray-700 mb-2">
          {event.location && event.location.address.state}
        </p>
        <p className="text-gray-500">
          {new Date(event.startdate).toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "short",
          })}{" "}
          -{" "}
          {new Date(event.enddate).toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </p>
      </div>
    </div>
  );
}

export default EventCard;
