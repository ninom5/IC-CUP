import { useMapContext, useFiltersContext } from "@hooks/index";
import { routes } from "@routes/index";
import { useNavigate } from "react-router-dom";
import "./searchBar.css";
import { logoSvg, searchSvg, filterSvg } from "assets/images/index";
import {
  AutoCompleteInput,
  CustomDatePicker,
  FilterPopUp,
  SearchBarNavigationLinks,
} from "@components/index";
import { toast } from "react-toastify";
import { useState } from "react";
import { FiltersType } from "types";

export const SearchBar = () => {
  const navigate = useNavigate();

  const { goToLocation, setSearchLocation } = useMapContext();
  const { setFilters } = useFiltersContext();

  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);

  const defaultFilters: FiltersType = {
    sortBy: "",
    category: "",
    transmission: "",
    seatNumber: "",
    fuelType: "",
  };

  const [showFilters, setShowFilters] = useState(false);
  const [userFilters, setUserFilters] = useState(defaultFilters);

  const handleSearch = () => {
    navigate(routes.VEHICLES);
    setFilters({
      fuelType: userFilters.fuelType,
      carCategory: userFilters.category,
      seats: userFilters.seatNumber,
      transmission: userFilters.transmission,
      sortBy: userFilters.sortBy,
      dateRange: dateRange,
    });
  };

  const handlePlaceResolved = (place: google.maps.places.PlaceResult) => {
    const location = place.geometry?.location;
    if (!location) {
      toast.error("Location not found");
      return;
    }

    setSearchLocation(location);
    goToLocation(location, 12);
  };

  return (
    <>
      <nav className="search-navigation">
        <div className="filters-wrapper">
          <img
            src={logoSvg}
            alt="Kolo logo"
            className="kolo-logo"
            onClick={() => navigate(routes.HOME)}
          />

          <div className="location-wrapper">
            <label htmlFor="location" className="location-label">
              Lokacija
            </label>
            <AutoCompleteInput onPlaceResolved={handlePlaceResolved} />
          </div>

          <CustomDatePicker dateRange={dateRange} setDateRange={setDateRange} />

          <div className="icon-wrapper" onClick={handleSearch}>
            <img src={searchSvg} alt="Search icon" />
          </div>

          <div className="icon-wrapper" onClick={() => setShowFilters(true)}>
            <img src={filterSvg} alt="Filter icon" />
          </div>
        </div>

        <SearchBarNavigationLinks />
      </nav>

      {showFilters && (
        <div className="modal-overlay" onClick={() => setShowFilters(false)}>
          <div className="filter-pop-up" onClick={(e) => e.stopPropagation()}>
            <FilterPopUp
              userFilters={userFilters}
              setUserFilters={setUserFilters}
              setShowFilters={setShowFilters}
              handleSearch={handleSearch}
            />
          </div>
        </div>
      )}
    </>
  );
};
