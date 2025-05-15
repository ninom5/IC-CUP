import { searchSvg } from "@assets/images";
import { AutoCompleteInput, CustomDatePicker } from "@components/index";
import { useFiltersContext } from "@hooks/index";
import { routes } from "@routes/index";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const LandingSearch = () => {
  const { setFilters } = useFiltersContext();
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);

  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(routes.VEHICLES);
    setFilters({
      dateRange: dateRange,
    });
  };

  return (
    <div className="landing-search">
      <div className="location-wrapper landing-location">
        <label htmlFor="location" className="location-label">
          Lokacija
        </label>
        <AutoCompleteInput />
      </div>
      <CustomDatePicker dateRange={dateRange} setDateRange={setDateRange} />

      <div className="icon-wrapper" onClick={handleSearch}>
        <img src={searchSvg} alt="Search icon" />
      </div>
    </div>
  );
};
