import { useToken, useMapContext } from "@hooks/index";
import { routes } from "@routes/index";
import { Link, useNavigate } from "react-router-dom";
import "./searchBar.css";
import { logoSvg, searchSvg, filterSvg, notifSvg } from "assets/images/index";
import {
  AutoCompleteInput,
  CustomDatePicker,
  FilterPopUp,
} from "@components/index";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { FiltersType } from "types";

export const SearchBar = () => {
  const navigate = useNavigate();
  const {
    data: { token, isExpired },
    updateToken,
  } = useToken();
  const { goToLocation, setSearchLocation } = useMapContext();

  const defaultFilters: FiltersType = {
    sortBy: "",
    category: "",
    transmission: "",
    seatNumber: "",
    fuelType: "",
  };

  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState(defaultFilters);

  useEffect(() => {
    console.log(filters);
  }, [filters]);

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    updateToken();
  };

  // const handle;

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

          <CustomDatePicker />

          <div className="icon-wrapper">
            <img src={searchSvg} alt="Search icon" />
          </div>

          <div className="icon-wrapper" onClick={() => setShowFilters(true)}>
            <img src={filterSvg} alt="Filter icon" style={{ width: "22px" }} />
          </div>
        </div>
        <div className="navigation-links">
          {token && !isExpired ? (
            <>
              <Link to={routes.USERS_DRIVES}>Tvoje vožnje</Link>
              <Link to={routes.USERS_VEHICLES}>Tvoja kola</Link>
              <Link to={routes.HOME} onClick={handleLogout}>
                Odjavi se
              </Link>

              <div className="icon-wrapper">
                <img src={notifSvg} alt="slikica zvona" />
              </div>
            </>
          ) : (
            <>
              <Link to={routes.ABOUT}>Kako radi</Link>
              <Link to={routes.REGISTER}>Registracija</Link>
              <Link to={routes.LOGIN}>Prijavi se</Link>
            </>
          )}
        </div>
      </nav>
      {showFilters && (
        <div className="modal-overlay" onClick={() => setShowFilters(false)}>
          <div className="filter-pop-up" onClick={(e) => e.stopPropagation()}>
            <FilterPopUp
              filters={filters}
              setFilters={setFilters}
              setShowFilters={setShowFilters}
            />
          </div>
        </div>
      )}
    </>
  );
};
