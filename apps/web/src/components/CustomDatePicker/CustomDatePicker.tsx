import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDateRangePicker } from "@mui/x-date-pickers-pro/DesktopDateRangePicker";
import { Box } from "@mui/material";
import "./customDatePicker.css";

type CustomDatePickerProps = {
  value: [Date | null, Date | null];
  onChange: (value: [Date | null, Date | null]) => void;
};

export const CustomDatePicker = ({
  value,
  onChange,
}: CustomDatePickerProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ backgroundColor: "#fafafa", borderRadius: 8 }}>
        <DesktopDateRangePicker value={value} onChange={onChange} />
      </Box>
    </LocalizationProvider>
  );
};
