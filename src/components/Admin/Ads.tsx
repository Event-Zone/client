import React, { useEffect, useState } from "react";
import Ad from "./Ad";
import Progress from "../shared/Progress";
import Message from "../shared/Message";
import {
  useGetSearchPageAddsQuery,
  useGetHeroAddsQuery,
  useGetEventAddQuery,
} from "@/store/features/api/apiSlice";

function Ads({ refetchHero }: { refetchHero: boolean }) {
  const [status, setStatus] = useState(0);
  const [message, setMessage] = useState<any | null>(null);
  const [adds, setAdds] = useState<any>([]);
  const [addsDetails, setAddsDetails] = useState<any>([]);
  useEffect(() => {
    if (refetchHero) refetchHeroAds();
    console.log(refetchHero);
  }, [refetchHero]);
  const {
    data: searchAds,
    isLoading: searchAdsLoading,
    error: searchAdsError,
    refetch: refetchSearchAds,
  } = useGetSearchPageAddsQuery();
  const {
    data: heroAds,
    isLoading: heroAdsLoading,
    error: heroAdsError,
    refetch: refetchHeroAds,
  } = useGetHeroAddsQuery();

  const {
    data: fetchedEventAdds,
    error: eventAddsError,
    isLoading: eventAddsIsLoading,
    refetch: refetchEvents,
  } = useGetEventAddQuery(adds, {
    skip: adds.length === 0,
  });

  useEffect(() => {
    if (fetchedEventAdds) refetchEvents();
  }, [adds]);

  useEffect(() => {
    if (status === 0) refetchHeroAds();
    else refetchSearchAds();
  }, [status]);

  useEffect(() => {
    if (searchAds) {
      setAddsDetails(searchAds);
      setAdds(searchAds.map((add: any) => add.eventId));
    }
  }, [searchAds]);

  useEffect(() => {
    if (heroAds) {
      setAddsDetails(heroAds);
      setAdds(heroAds.map((add: any) => add.eventId));
    }
  }, [heroAds]);

  return (
    <div className={`bg-[#1A202C] p-6 rounded-lg h-[400px] relative`}>
      {/* Blur Background if Sidebar is Visible */}
      <div>
        {/* Tabs */}
        <div className="flex space-x-8 text-white text-lg mb-4">
          <button
            onClick={() => setStatus(0)}
            className={`border-blue-500 ${status === 0 && "border-b-4"}`}
          >
            Home Page
          </button>
          <button
            onClick={() => setStatus(1)}
            className={`border-blue-500 ${status === 1 && "border-b-4"}`}
          >
            Search Page
          </button>
        </div>

        {/* Events Header */}
        <div className="grid grid-cols-6 text-[#94A3B8] py-3 border-b border-[#364153]">
          <div className="col-span-2">
            Events ({status !== 0 ? searchAds?.length : heroAds?.length})
          </div>
          <div>Company</div>
          <div>Statrt Date ⇵</div>
          <div>Event Date ⇵</div>
          <div>Status</div>
        </div>

        {/* Events List */}
        <div className="overflow-y-scroll h-[90%]">
          {fetchedEventAdds?.map((event: any, index: number) => (
            <Ad
              index={index}
              adds={addsDetails}
              status={status}
              refetchEvents={refetchHeroAds}
              key={event._id}
              event={event}
            />
          ))}
        </div>
        {(searchAdsLoading || heroAdsLoading) && <Progress />}
        {message && <Message message={message} />}
      </div>

      {/* Right Sidebar */}
    </div>
  );
}

export default Ads;
