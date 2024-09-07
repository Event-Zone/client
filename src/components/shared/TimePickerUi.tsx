import React, { useEffect, useState } from "react";
import TimePicker from "react-times";
import "react-times/css/material/default.css"; // Material theme

interface TimePickerUiProps {
  setFormData: Function;
  name: string;
}

function TimePickerUi({ setFormData, name }: TimePickerUiProps) {
  const [time, setTime] = useState({ hour: "00", minute: "00" });
  const onTimeChange = ({ hour, minute }: { hour: string; minute: string }) => {
    setTime({ hour, minute });
    // Update the parent form data with the selected time
    setFormData((prev: any) => ({
      ...prev,
      [name]: `${hour}:${minute}`,
    }));
  };

  return (
    <div className=" flex items-center space-x-2 relative w-full h-full">
      {" "}
      <div>
        <TimePicker
          time={`${time.hour}:${time.minute}`} // Set initial time based on state
          onTimeChange={onTimeChange} // Trigger the callback when time changes
          showTimezone // Show the timezone (optional)
          focused={false} // Controls whether the time picker is open on render
          withoutIcon // Whether to hide the time icon on button
          colorPalette="dark" // Color theme
          theme="material" // Material theme (can switch to classic)
          timeMode="24" // 12-hour or 24-hour mode
          timezone="America/New_York" // Optional timezone
        />{" "}
      </div>
    </div>
  );
}
export default TimePickerUi;
