import React, { useEffect, useState } from "react";
import Ad from "./Ad";
import Progress from "../shared/Progress";
import Message from "../shared/Message";
import {
  useGetSearchPageAddsQuery,
  useGetHeroAddsQuery,
  useGetEventAddQuery,
} from "@/store/features/api/apiSlice";
import { skip } from "node:test";

function Ads({ status, setStatus }: { status: number; setStatus: Function }) {
  const [message, setMessage] = useState<any | null>(null);
  const [addsDetails, setAddsDetails] = useState<any>([]);
  // useEffect(() => {
  //   if (refetchHero) refetchHeroAds();
  //   console.log(refetchHero);
  // }, [refetchHero]);
  useEffect(() => {
    console.log("addsDetails", addsDetails);
  }, [addsDetails]);
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
  } = useGetEventAddQuery(
    heroAds?.map((ad: any) => ad.eventId),
    {
      skip: heroAds?.length === 0 || !heroAds || status === 1,
    }
  );
  useEffect(() => {
    console.log("fetchedEventAdds", fetchedEventAdds);
  }, [fetchedEventAdds]);

  useEffect(() => {
    if (!(heroAds?.length === 0 || !heroAds || status === 1)) refetchEvents();
  }, [status, heroAds]);

  useEffect(() => {
    if (status === 1) {
      refetchSearchAds().then(() => {
        console.log("Search Ads refetched", searchAds);
      });
    } else {
      refetchHeroAds().then(() => {
        console.log("hero Ads refetched", heroAds);
        if (heroAds) setAddsDetails(heroAds);
      });
    }
  }, [status]);

  // useEffect(() => {
  //   if (searchAds && !searchAdsLoading) {
  //     console.log("Search successfully", searchAds);
  //     // Process searchAds
  //   } else if (searchAdsLoading) {
  //     console.log("Search is loading");
  //   } else {
  //     console.log("Search nothing");
  //   }
  // }, [searchAds, searchAdsLoading]);

  // useEffect(() => {
  //   if (heroAds && !heroAdsLoading) {
  //     console.log("Hero successfully", heroAds);
  //     setAddsDetails(heroAds);
  //     setAdds(heroAds.map((add: any) => add.eventId));
  //   } else if (heroAdsLoading) {
  //     console.log("Hero is loading");
  //   }
  // }, [heroAds, heroAdsLoading]);

  return (
    <div className={`bg-[#1A202C] p-6 rounded-lg h-[400px] relative`}>
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
            {/* Events ({status !== 0 ? adds?.length : adds?.length}) */}
          </div>
          <div>Company</div>
          <div>Statrt Date ⇵</div>
          <div>Event Date ⇵</div>
          <div>Status</div>
        </div>

        {/* Events List */}
        <div className="overflow-y-scroll h-[90%]">
          {status === 0
            ? fetchedEventAdds &&
              fetchedEventAdds?.map((event: any, index: number) => (
                <Ad
                  index={index}
                  adds={addsDetails}
                  status={status}
                  refetchHero={refetchHeroAds}
                  refetchSearch={refetchSearchAds}
                  key={event._id}
                  event={event}
                  setStatus={setStatus}
                />
              ))
            : searchAds &&
              searchAds?.map((event: any, index: number) => (
                <Ad
                  setStatus={setStatus}
                  index={index}
                  adds={addsDetails}
                  status={status}
                  refetchHero={refetchHeroAds}
                  refetchSearch={refetchSearchAds}
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
