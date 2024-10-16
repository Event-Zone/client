import { IEvent } from "@/types/Event";
import { useRouter } from "@/navigation";
import React, { useEffect } from "react";
import { useNewAdMutation } from "@/store/features/api/apiSlice";
import Progress from "../shared/Progress";
import Message from "../shared/Message";
import Image from "next/image";
function EventCard({
  setRefetchHero,
  event,
}: {
  setRefetchHero: Function;
  event: IEvent;
}) {
  const [newAd, newAdResult] = useNewAdMutation();
  const router = useRouter();
  const handleAd = () => {
    console.log(event._id);

    newAd({ eventId: event._id });
  };
  useEffect(() => {
    if (newAdResult.status === "fulfilled") {
      setRefetchHero(true);
    }
  }, [newAdResult]);
  return (
    <div className="bg-[#2D3748] p-4 rounded-lg flex flex-col items-center shadow-lg">
      <Image
        onClick={() => router.push(`/events/details/${event?._id}`)}
        src={`${process.env.NEXT_PUBLIC_SERVER_URL}event/image/${event.eventImages[0]}`}
        alt={event.eventName}
        className="w-full h-[200px] object-cover rounded-t-lg"
        width={500} // Specify width
        height={300} // Specify height
        quality={90} // Adjust quality to improve performance (default is 90)
        // placeholder="blur" // Optionally use a low-quality placeholder
      />

      <h2 className="text-white text-xl poppins-bold mt-4">
        {event.eventName}
      </h2>
      <p className="text-gray-400 text-center mt-2">{event.eventAcronym}</p>
      <div className="flex mt-4 w-full justify-around">
        <button
          onClick={handleAd}
          className="bg-mainBlue text-white py-2 px-4 rounded-md"
        >
          Add
        </button>
      </div>
      {newAdResult.status === "pending" && <Progress />}
      {newAdResult.isError && (
        <Message message={{ type: 0, content: "failed to add new ad" }} />
      )}
    </div>
  );
}

export default EventCard;
