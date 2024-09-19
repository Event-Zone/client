import { useEffect, useState } from "react";
import { IEvent } from "@/types/Event";
import { useRouter } from "@/navigation";
import { useDeleteEventMutation } from "@/store/features/api/apiSlice";
import Progress from "../shared/Progress";
import Image from "next/image";

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
    <div className="relative border mr-2 mb-2 border-purple-300 rounded-lg shadow-lg  max-w-[250px] max-h-[200px]">
      {/* Status Badge */}
      <div
        className={`absolute top-2 left-2  text-white px-3 py-1 rounded-full ${
          event.status === "approved"
            ? "bg-green-500"
            : event.status === "rejected"
            ? "bg-red-500"
            : "bg-yellow-500"
        }`}
      >
        {event.status}
      </div>

      {/* Image */}
      <Image
        src={`${process.env.NEXT_PUBLIC_SERVER_URL}event/image/${event?.eventImages[0]}`}
        alt={event.eventName}
        className="w-full h-1/3  object-cover"
        width={500} // Specify width
        height={300} // Specify height
        quality={75} // Adjust quality to improve performance (default is 75)
        // placeholder="blur" // Optionally use a low-quality placeholder
      />

      {/* Content */}
      <div className="p-4 relative">
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
                className="block w-full text-left px-4 py-2 text-blue-700 bg-blue-100 poppins-semibold rounded-t-lg hover:bg-blue-200"
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

        <h3 className="text-md  poppins-semibold mb-2 text-ellipsis line-clamp-1">
          <>
            {
              <>
                {event?.eventAcronym && (
                  <>
                    {event?.eventAcronym} {" - "}
                  </>
                )}
              </>
            }{" "}
            {event?.eventName}
          </>
        </h3>

        <p className="text-sm text-gray-500 text-ellipsis line-clamp-2 ">
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
          {event.location
            ? event.location.address.commercial
              ? event.location.address.commercial
              : event.location.address.state
            : event?.link && <>Online</>}
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
    </div>
  );
}

export default EventCard;
