import * as React from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";

export default function ResponsiveDatePickers() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {/* <DesktopDatePicker defaultValue={dayjs('2022-04-17')} /> */}
      <StaticDatePicker defaultValue={dayjs("2022-04-17")} />
    </LocalizationProvider>
  );
}
