import React, { useState, useEffect } from "react";
import {
  format,
  addMonths,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  isBefore,
  isSameDay,
  isWithinInterval,
  setMonth,
} from "date-fns";
import { useSearchEventsByDateRangeQuery } from "@/store/features/api/apiSlice";
import { useDispatch } from "react-redux";
import { setSearchedEvents } from "@/store/features/eventSlice";

const Calendar = ({ setShowDialog }: { setShowDialog: Function }) => {
  const dispatch = useDispatch();
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date(Date.now()));
  const [isFilter, setIsFilter] = useState<boolean>(false);

  const [isSelectingEndDate, setIsSelectingEndDate] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<Date | null>();
  const [viewMode, setViewMode] = useState<"calendar" | "flexibles">(
    "calendar"
  );
  const {
    data: eventsByDateRange,
    isError: eventBuDateRangeError,
    isLoading: eventByDateRangeIsLoading,
  } = useSearchEventsByDateRangeQuery(
    {
      startDate: selectedStartDate && selectedStartDate!.toISOString(),

      endDate: selectedEndDate && selectedEndDate!.toISOString(),
    },
    { skip: !isFilter }
  );

  useEffect(() => {
    if (eventByDateRangeIsLoading) {
      console.log("Loading events by date range...");
    } else if (eventBuDateRangeError) {
      alert("Error fetching events by date range: " + eventBuDateRangeError);
    } else if (eventsByDateRange) {
      //  setEvents(eventsByDateRange);

      console.log("Fetched events by date range: ", eventsByDateRange);
      dispatch(setSearchedEvents(eventsByDateRange));
      setShowDialog(false);
    }
  }, [eventByDateRangeIsLoading, eventBuDateRangeError, eventsByDateRange]);

  // Convert start and end dates to ISO strings
  const getISODateRange = () => {
    if (selectedStartDate && selectedEndDate) {
      return {
        startDate: selectedStartDate.toISOString(),
        endDate: selectedEndDate.toISOString(),
      };
    }
    return { startDate: "", endDate: "" };
  };

  // Effect to log the ISO dates (replace with your fetch logic)
  useEffect(() => {
    const { startDate, endDate } = getISODateRange();
    if (startDate && endDate) {
      console.log(`Fetching data from ${startDate} to ${endDate}`);
      // Replace with your fetch logic
      // fetchData(startDate, endDate);
    }
  }, [selectedStartDate, selectedEndDate]);

  const handleDayClick = (day: Date) => {
    if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
      console.log(day);
      setSelectedStartDate(day);
      setSelectedEndDate(null);
      setIsSelectingEndDate(true);
    } else if (isSelectingEndDate) {
      if (isBefore(day, selectedStartDate)) {
        setSelectedStartDate(day);
      } else {
        setSelectedEndDate(day);
        setIsSelectingEndDate(false);
      }
    }
  };

  const handleSelectThisWeek = () => {
    const start = startOfWeek(new Date(), { weekStartsOn: 1 });
    const end = endOfWeek(new Date(), { weekStartsOn: 1 });
    setSelectedStartDate(start);
    setSelectedEndDate(end);
    setSelectedMonth(null);
  };

  const handleSelectThisMonth = () => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    setSelectedStartDate(start);
    setSelectedEndDate(end);
    setSelectedMonth(null);
  };

  const handleSelectNextMonth = () => {
    const nextMonth = addMonths(currentMonth, 1);
    const start = startOfMonth(nextMonth);
    const end = endOfMonth(nextMonth);
    setSelectedMonth(null);
    setSelectedStartDate(start);
    setSelectedEndDate(end);
  };

  const handleMonthClick = (month: Date) => {
    const start = startOfMonth(month);
    const end = endOfMonth(month);
    setSelectedMonth(month);
    setSelectedStartDate(start);
    setSelectedEndDate(end);
  };

  const renderCalendarDays = (month: Date, isNextMonth = false) => {
    const startOfMonth = new Date(month.getFullYear(), month.getMonth(), 1);
    const endOfMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0);
    const days = [];

    for (let i = 1; i <= endOfMonth.getDate(); i++) {
      const day = new Date(month.getFullYear(), month.getMonth(), i);
      const isSelected =
        (selectedStartDate && isSameDay(day, selectedStartDate)) ||
        (selectedEndDate && isSameDay(day, selectedEndDate)) ||
        (selectedStartDate &&
          selectedEndDate &&
          isWithinInterval(day, {
            start: selectedStartDate,
            end: selectedEndDate,
          }));
      const isStartOrEndDate =
        isSelected &&
        (isSameDay(day, selectedStartDate!) ||
          isSameDay(day, selectedEndDate!));

      days.push(
        <div
          key={i}
          onClick={() => handleDayClick(day)}
          className={`w-10 h-10 flex items-center justify-center rounded-full cursor-pointer 
        ${isSelected ? "bg-blue-500 text-white" : "text-gray-700"}
        ${isStartOrEndDate ? "poppins-bold" : ""}
        hover:bg-blue-300 
      `}
        >
          {i.toString().padStart(2, "0")}
        </div>
      );
    }

    return days;
  };
  const renderFlexibleMonths = () => {
    const months = [];
    for (let i = 0; i < 12; i++) {
      const month = addMonths(currentMonth, i);
      months.push(
        <div
          key={i}
          onClick={() => handleMonthClick(month)}
          className={`w-24 h-24 mr-3 mb-3 flex-shrink-0 flex flex-col items-center justify-center border rounded-lg cursor-pointer
          ${
            selectedMonth &&
            format(selectedMonth, "yyyy-MM") === format(month, "yyyy-MM")
              ? "bg-blue-500 text-white border-blue-500"
              : "text-gray-700 border-gray-300"
          }
          hover:bg-blue-300`}
        >
          <img
            alt={"monthIcon"}
            src="/icons/mdi_calendar.png"
            className="w-6 h-6 mb-1"
          />
          <p className="poppins-medium text-base">{format(month, "MMMM ")}</p>
          <p className="poppins-medium text-base">{format(month, " yyyy")}</p>
        </div>
      );
    }
    return months;
  };

  const handleFilterClick = () => {
    setIsFilter(true);

    console.log("Filter set to true");
    // Logging isFilter here will still show the old value due to asynchronous state update
    console.log("Current isFilter value:", isFilter); // This might show the old value
  };

  return (
    <div className="z-30 bg-white absolute w-full max-w-lg mx-auto p-4">
      <div className="flex justify-between border-b border-gray-300">
        <div
          onClick={() => setViewMode("calendar")}
          className={`cursor-pointer py-2 border-b-2 ${
            viewMode === "calendar" ? "border-blue-500" : "border-transparent"
          }`}
        >
          Calendrier
        </div>
        <div
          onClick={() => setViewMode("flexibles")}
          className={`cursor-pointer py-2 border-b-2 ${
            viewMode === "flexibles" ? "border-blue-500" : "border-transparent"
          }`}
        >
          Flexibles
        </div>
      </div>

      {viewMode === "calendar" ? (
        <div className="flex flex-col md:flex-row md:justify-between border-b border-gray-300">
          <div className="flex-1">
            <div className="flex justify-between items-center mb-2">
              <button
                onClick={() => setCurrentMonth(addMonths(currentMonth, -1))}
              >
                &lt;
              </button>
              <h3 className="text-center poppins-semibold">
                {format(currentMonth, "MMMM yyyy")}
              </h3>
              <button
                onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
              >
                &gt;
              </button>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {renderCalendarDays(currentMonth)}
            </div>
          </div>
          <div className="flex-1 md:border-l-2 md:border-gray-300">
            <div className="flex justify-between items-center mb-2">
              <button
                onClick={() => setCurrentMonth(addMonths(currentMonth, -1))}
              >
                &lt;
              </button>
              <h3 className="text-center poppins-semibold">
                {format(addMonths(currentMonth, 1), "MMMM yyyy")}
              </h3>
              <button
                onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
              >
                &gt;
              </button>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {renderCalendarDays(addMonths(currentMonth, 1), true)}
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-around mt-4 mb-4">
            <button
              onClick={handleSelectThisWeek}
              className="border border-gray-300 px-4 py-2 rounded-full hover:bg-gray-200"
            >
              Cette semaine
            </button>
            <button
              onClick={handleSelectThisMonth}
              className="border border-gray-300 px-4 py-2 rounded-full hover:bg-gray-200"
            >
              Ce mois
            </button>
            <button
              onClick={handleSelectNextMonth}
              className="border border-gray-300 px-4 py-2 rounded-full hover:bg-gray-200"
            >
              Mois prochain
            </button>
          </div>
          <div className="flex flex-wrap">{renderFlexibleMonths()}</div>
        </>
      )}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => {
            setShowDialog(false);
            setIsFilter(false);
          }}
          className="text-gray-500 poppins-regular"
        >
          Annuler
        </button>
        <button
          onClick={handleFilterClick}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center poppins-regular"
        >
          Filtrer <span className="ml-2">✈️</span>
        </button>
      </div>
    </div>
  );
};

export default Calendar;
