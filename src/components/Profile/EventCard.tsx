import { useEffect, useState } from "react";
import { IEvent } from "@/types/Event";
import { useRouter } from "next/navigation";
import { useDeleteEventMutation } from "@/store/features/api/apiSlice";

interface EventCardProps {
  event: IEvent;
  refetchEvents: Function;
}

function EventCard({ event, refetchEvents }: EventCardProps) {
  const [deleteEvent, deleteEventResult] = useDeleteEventMutation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const daysRemaining = Math.ceil(
    (new Date(event.enddate).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24)
  );

  const handleDelete = () => {
    deleteEvent(event._id);
  };

  useEffect(() => {
    if (deleteEventResult.status === "fulfilled") {
      console.log("fulfilled");
      refetchEvents();
    } else if (deleteEventResult.status === "rejected") {
      console.error("rejected");
    }
  }, [deleteEventResult]);

  const router = useRouter();
  return (
    <div className="relative border border-purple-300 rounded-lg shadow-lg overflow-hidden max-w-[250px] max-h-fit">
      {/* Status Badge */}
      <div className="absolute top-2 left-2 bg-green-500 text-white px-3 py-1 rounded-full">
        {event.status}
      </div>

      {/* Image */}
      <img
        src={`${process.env.NEXT_PUBLIC_SERVER_URL}event/image/${event?.eventImages[0]}`}
        alt={event.eventName}
        className="w-full  object-cover"
      />

      {/* Content */}
      <div className="p-4">
        <h2 className="text-lg font-semibold">{event.eventName}</h2>
        <p className="text-sm text-gray-500 ">
          {new Date(event.startdate).toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "short",
          })}{" "}
          -{" "}
          {new Date(event.enddate).toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}{" "}
          at{" "}
          {event.location &&
            (event.location.address.commercial
              ? event.location.address.commercial
              : event.location.address.state)}
        </p>
        <p
          className={`text-sm mt-2 ${
            daysRemaining >= 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          {daysRemaining >= 0
            ? `${daysRemaining} jours restants`
            : "Événement passé"}
        </p>
      </div>

      {/* Ellipsis Menu */}
      <div className="absolute top-2 right-2">
        <button
          className="text-gray-500 hover:text-gray-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.75a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM12 12a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM12 17.25a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
            />
          </svg>
        </button>

        {/* Dropdown Menu */}
        {isMenuOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
            <button
              onClick={() => {
                router.replace(`/events/update/${event._id}`);
              }}
              className="block w-full text-left px-4 py-2 text-blue-700 bg-blue-100 font-semibold rounded-t-lg hover:bg-blue-200"
            >
              Modifier
            </button>
            <button
              onClick={() => {
                router.replace(`/events/details/${event._id}`);
              }}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Voir
            </button>

            <button
              onClick={handleDelete}
              className="block w-full text-left px-4 py-2 text-red-700 hover:bg-red-100 rounded-b-lg"
            >
              Supprimer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default EventCard;
