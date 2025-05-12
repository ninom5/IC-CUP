import { useState } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDateRangePicker } from "@mui/x-date-pickers-pro/DesktopDateRangePicker";
import { Box } from "@mui/material";
import "./customDatePicker.css";

export const CustomDatePicker = () => {
  const [value, setValue] = useState<[Date | null, Date | null]>([
    new Date(),
    new Date(),
  ]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ backgroundColor: "#fafafa", borderRadius: 8 }}>
        <DesktopDateRangePicker
          value={value}
          onChange={(newValue) => setValue(newValue)}
        />
      </Box>
    </LocalizationProvider>
  );
};
