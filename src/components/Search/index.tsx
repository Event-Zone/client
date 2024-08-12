"use client";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  useSearchEventsByLocationQuery,
  useSearchEventsByMonthQuery,
  useSearchEventsByDateRangeQuery,
  useSearchEventsByTypeQuery,
} from "@/store/features/api/apiSlice";
import EventCard from "./EventCard";

function Search() {
  const [events, setEvents] = useState<any[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [selectionType, setSelectionType] = useState<"month" | "range">(
    "month"
  );
  const [location, setLocation] = useState<string | undefined>(undefined);
  const [type, setType] = useState<string | undefined>(undefined);

  // Fetch data using the queries
  const {
    data: eventsByLocation,
    isLoading: eventByLocationIsLoading,
    isError: eventByLocationIsError,
  } = useSearchEventsByLocationQuery(location as string, {
    skip: !location,
  });
  useEffect(() => {
    if (eventByLocationIsLoading) {
      console.log("Loading events by location...");
    } else if (eventByLocationIsError) {
      alert("Error fetching events by location: " + eventByLocationIsError);
    } else if (eventsByLocation) {
      setEvents(eventsByLocation);
    }
  }, [eventByLocationIsLoading, eventByLocationIsError, eventsByLocation]);
  const {
    data: eventsByMonth,
    isLoading: eventByMonthIsLoading,
    isError: EventByMonthIsError,
  } = useSearchEventsByMonthQuery(
    {
      month: startDate && startDate.getMonth() + 1,
      year: startDate && startDate.getFullYear(),
    },
    {
      skip: !startDate,
    }
  );
  useEffect(() => {
    if (eventByMonthIsLoading) {
      console.log("Loading events by month...");
    } else if (EventByMonthIsError) {
      alert("Error fetching events by month: " + EventByMonthIsError);
    } else if (eventsByMonth) {
      setEvents(eventsByMonth);
    }
  }, [eventByMonthIsLoading, EventByMonthIsError, eventsByMonth]);
  useEffect(() => {
    if (eventByMonthIsLoading) {
      console.log("Loading events by month...");
    } else if (EventByMonthIsError) {
      alert("Error fetching events by month: " + EventByMonthIsError);
    } else if (eventsByMonth) {
      setEvents(eventsByMonth);
    }
  }, [eventByMonthIsLoading, EventByMonthIsError, eventsByMonth]);

  const {
    data: eventsByDateRange,
    isError: eventBuDateRangeError,
    isLoading: eventByDateRangeIsLoading,
  } = useSearchEventsByDateRangeQuery(
    {
      startDate: startDate && startDate!.toISOString(),

      endDate: endDate && endDate!.toISOString(),
    },
    { skip: !startDate || !endDate }
  );
  useEffect(() => {
    if (eventByDateRangeIsLoading) {
      console.log("Loading events by date range...");
    } else if (eventBuDateRangeError) {
      alert("Error fetching events by date range: " + eventBuDateRangeError);
    } else if (eventsByDateRange) {
      setEvents(eventsByDateRange);
    }
  }, [eventByDateRangeIsLoading, eventBuDateRangeError, eventsByDateRange]);
  const {
    data: eventsByType,
    isLoading: eventsByTypeIsLoading,
    isError: eventsByTypeIsError,
  } = useSearchEventsByTypeQuery(type as string, {
    skip: !type,
  });
  useEffect(() => {
    if (eventsByTypeIsLoading) {
      console.log("Loading events by type...");
    } else if (eventsByTypeIsError) {
      alert("Error fetching events by type: " + eventsByTypeIsError);
    } else if (eventsByType) {
      setEvents(eventsByType);
    }
  }, [eventsByTypeIsLoading, eventsByTypeIsError, eventsByType]);
  // Handler functions
  const handleDateChange = (date: Date | null) => setStartDate(date);
  const handleEndDateChange = (date: Date | null) => setEndDate(date);
  const toggleDialog = () => setShowDialog(!showDialog);
  const handleSelectionTypeChange = (type: "month" | "range") => {
    setSelectionType(type);
    setStartDate(null);
    setEndDate(null);
  };
  const handleLocationChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setLocation(event.target.value);
  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setType(event.target.value);

  // Implement the UI
  return (
    <div className="p-20">
      <div className="max-w-full h-fit">
        <div className="flex flex-wrap justify-between w-fit">
          <select
            name="type"
            className="md:mr-3 poppins-regular px-2 bg-gray-200 text-gray-500 focus:outline-none rounded-3xl mb-2 md:mb-0 md:w-auto w-full"
            onChange={handleTypeChange}
          >
            <option value="" disabled selected className="text-gray-500">
              Tous les types
            </option>
            <option value="salons & exposition" className="text-gray-500">
              Salons & Exposition
            </option>
            <option value="conference & exposition" className="text-gray-500">
              Conference & Exposition
            </option>
            <option value="conference" className="text-gray-500">
              Conference
            </option>
            <option value="workshop" className="text-gray-500">
              Workshop
            </option>
            <option value="seminaires & ateliers" className="text-gray-500">
              Seminaires & Ateliers
            </option>
          </select>

          {/* Trigger for the date picker dialog */}
          <div onClick={toggleDialog} className="cursor-pointer">
            <DatePicker
              selected={startDate}
              onChange={handleDateChange}
              dateFormat="MM/yyyy"
              showMonthYearPicker
              placeholderText="N'importe quand"
              className="poppins-regular px-2 bg-gray-200 text-gray-500 focus:outline-none rounded-3xl mb-2 md:mb-0 md:w-auto w-full"
              readOnly
            />
          </div>

          <select
            name="location"
            className="poppins-regular px-2 bg-gray-200 text-gray-500 focus:outline-none rounded-3xl mb-2 md:mb-0 md:w-auto w-full"
            onChange={handleLocationChange}
          >
            <option value="" disabled selected className="text-gray-500">
              N'importe où
            </option>
            {/* Add your location options here */}
            <option value="Adrar" className="text-gray-500">
              Adrar
            </option>
            <option value="Chlef" className="text-gray-500">
              Chlef
            </option>
            <option value="Laghouat" className="text-gray-500">
              Laghouat
            </option>
            <option value="Oum El Bouaghi" className="text-gray-500">
              Oum El Bouaghi
            </option>
            <option value="Batna" className="text-gray-500">
              Batna
            </option>
            <option value="Béjaïa" className="text-gray-500">
              Béjaïa
            </option>
            <option value="Biskra" className="text-gray-500">
              Biskra
            </option>
            <option value="Béchar" className="text-gray-500">
              Béchar
            </option>
            <option value="Blida" className="text-gray-500">
              Blida
            </option>
            <option value="Bouira" className="text-gray-500">
              Bouira
            </option>
            <option value="Tamanrasset" className="text-gray-500">
              Tamanrasset
            </option>
            <option value="Tébessa" className="text-gray-500">
              Tébessa
            </option>
            <option value="Tlemcen" className="text-gray-500">
              Tlemcen
            </option>
            <option value="Tiaret" className="text-gray-500">
              Tiaret
            </option>
            <option value="Tizi Ouzou" className="text-gray-500">
              Tizi Ouzou
            </option>
            <option value="Alger" className="text-gray-500">
              Alger
            </option>
            <option value="Djelfa" className="text-gray-500">
              Djelfa
            </option>
            <option value="Jijel" className="text-gray-500">
              Jijel
            </option>
            <option value="Sétif" className="text-gray-500">
              Sétif
            </option>
            <option value="Saïda" className="text-gray-500">
              Saïda
            </option>
            <option value="Skikda" className="text-gray-500">
              Skikda
            </option>
            <option value="Sidi Bel Abbès" className="text-gray-500">
              Sidi Bel Abbès
            </option>
            <option value="Annaba" className="text-gray-500">
              Annaba
            </option>
            <option value="Guelma" className="text-gray-500">
              Guelma
            </option>
            <option value="Constantine" className="text-gray-500">
              Constantine
            </option>
            <option value="Médéa" className="text-gray-500">
              Médéa
            </option>
            <option value="Mostaganem" className="text-gray-500">
              Mostaganem
            </option>
            <option value="M'Sila" className="text-gray-500">
              M'Sila
            </option>
            <option value="Mascara" className="text-gray-500">
              Mascara
            </option>
            <option value="Ouargla" className="text-gray-500">
              Ouargla
            </option>
            <option value="Oran" className="text-gray-500">
              Oran
            </option>
            <option value="El Bayadh" className="text-gray-500">
              El Bayadh
            </option>
            <option value="Illizi" className="text-gray-500">
              Illizi
            </option>
            <option value="Bordj Bou Arréridj" className="text-gray-500">
              Bordj Bou Arréridj
            </option>
            <option value="Boumerdès" className="text-gray-500">
              Boumerdès
            </option>
            <option value="El Tarf" className="text-gray-500">
              El Tarf
            </option>
            <option value="Tindouf" className="text-gray-500">
              Tindouf
            </option>
            <option value="Tissemsilt" className="text-gray-500">
              Tissemsilt
            </option>
            <option value="El Oued" className="text-gray-500">
              El Oued
            </option>
            <option value="Khenchela" className="text-gray-500">
              Khenchela
            </option>
            <option value="Souk Ahras" className="text-gray-500">
              Souk Ahras
            </option>
            <option value="Tipaza" className="text-gray-500">
              Tipaza
            </option>
            <option value="Mila" className="text-gray-500">
              Mila
            </option>
            <option value="Aïn Defla" className="text-gray-500">
              Aïn Defla
            </option>
            <option value="Naâma" className="text-gray-500">
              Naâma
            </option>
            <option value="Aïn Témouchent" className="text-gray-500">
              Aïn Témouchent
            </option>
            <option value="Ghardaïa" className="text-gray-500">
              Ghardaïa
            </option>
            <option value="Relizane" className="text-gray-500">
              Relizane
            </option>
          </select>
        </div>
      </div>

      {/* Dialog */}
      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-4 w-11/12 md:w-1/2 lg:w-1/3">
            <div className="flex justify-between mb-4">
              <button
                className={`p-2 rounded-lg ${
                  selectionType === "month"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
                onClick={() => handleSelectionTypeChange("month")}
              >
                By Month
              </button>
              <button
                className={`p-2 rounded-lg ${
                  selectionType === "range"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
                onClick={() => handleSelectionTypeChange("range")}
              >
                By Date Range
              </button>
            </div>

            {/* Month Picker */}
            {selectionType === "month" && (
              <DatePicker
                selected={startDate}
                onChange={handleDateChange}
                dateFormat="MM/yyyy"
                showMonthYearPicker
                placeholderText="Select Month"
                className="poppins-regular px-2 bg-gray-200 text-gray-500 focus:outline-none rounded-3xl w-full"
              />
            )}

            {/* Date Range Picker */}
            {selectionType === "range" && (
              <div className="flex flex-col space-y-4">
                <DatePicker
                  selected={startDate}
                  onChange={handleDateChange}
                  selectsStart
                  startDate={startDate!}
                  endDate={endDate!}
                  dateFormat="MM/yyyy"
                  showMonthYearPicker
                  placeholderText="Start Month"
                  className="poppins-regular px-2 bg-gray-200 text-gray-500 focus:outline-none rounded-3xl w-full"
                />
                <DatePicker
                  selected={endDate}
                  onChange={handleEndDateChange}
                  selectsEnd
                  startDate={startDate!}
                  endDate={endDate!}
                  dateFormat="MM/yyyy"
                  showMonthYearPicker
                  placeholderText="End Month"
                  className="poppins-regular px-2 bg-gray-200 text-gray-500 focus:outline-none rounded-3xl w-full"
                  minDate={startDate!}
                />
              </div>
            )}

            <div className="flex justify-end mt-4">
              <button
                onClick={toggleDialog}
                className="p-2 bg-red-500 text-white rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Display Results */}
      <div className="mt-4">
        {events.length > 0 &&
          events.map((event) => <EventCard key={event._id} event={event} />)}
        {/* {eventsByLocation && (
          <div>Events by Location: {JSON.stringify(eventsByLocation)}</div>
        )}
        {eventsByMonth && (
          <div>Events by Month: {JSON.stringify(eventsByMonth)}</div>
        )}
        {eventsByDateRange && (
          <div>Events by Date Range: {JSON.stringify(eventsByDateRange)}</div>
        )}
        {eventsByType && (
          <div>Events by Type: {JSON.stringify(eventsByType)}</div>
        )} */}
      </div>
    </div>
  );
}

export default Search;
