import React, { useState } from "react";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import {
  LocalizationProvider,
  renderTimeViewClock,
  StaticTimePicker,
} from "@mui/x-date-pickers";
import { parse } from "date-fns";

interface TimePickerUiProps {
  setFormData: Function;
  name: string;
  initTime?: string;
}

function TimePickerUi({ setFormData, name, initTime }: TimePickerUiProps) {
  console.log(initTime);
  const INITTIME = initTime
    ? parse(initTime, "HH:mm", new Date()) // Parse "HH:mm" string into Date
    : new Date(); // Fallback to current date
  const [time, setTime] = useState<Date | null | undefined>(INITTIME);

  const handleTimeChange = (newValue: Date | null) => {
    setTime(newValue);
    if (newValue) {
      const hours = newValue.getHours().toString().padStart(2, "0");
      const minutes = newValue.getMinutes().toString().padStart(2, "0");
      // Update the parent form data with the selected time
      setFormData((prev: any) => ({
        ...prev,
        [name]: `${hours}:${minutes}`,
      }));
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="w-full">
        {" "}
        {/* Ensure the div takes full width */}
        <TimePicker
          sx={{ width: "100%" }} // Make the TimePicker take full width
          onChange={handleTimeChange}
          value={time}
          viewRenderers={{
            hours: renderTimeViewClock,
            minutes: renderTimeViewClock,
            seconds: renderTimeViewClock,
          }}
        />
      </div>
    </LocalizationProvider>
  );
}

export default TimePickerUi;
