import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDateRangePicker } from "@mui/x-date-pickers-pro/DesktopDateRangePicker";
import { Box } from "@mui/material";
import "./customDatePicker.css";
import { isWithinInterval } from "date-fns";

type CustomDatePickerProps = {
  value: [Date | null, Date | null];
  onChange: (value: [Date | null, Date | null]) => void;
  availableDateRanges?: { startDate: Date; endDate: Date }[];
};

export const CustomDatePicker = ({
  value,
  availableDateRanges,
  onChange,
}: CustomDatePickerProps) => {
  const shouldDisableDate = (date: Date) => {
    return !availableDateRanges?.some((range) =>
      isWithinInterval(date, { start: range.startDate, end: range.endDate })
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ backgroundColor: "#fafafa", borderRadius: 8 }}>
        <DesktopDateRangePicker
          value={value}
          onChange={onChange}
          shouldDisableDate={shouldDisableDate}
        />
      </Box>
    </LocalizationProvider>
  );
};
