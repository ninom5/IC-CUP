import { useToken } from "@hooks/index";
import { routes } from "@routes/index";
import { Link, useNavigate } from "react-router-dom";
import "./searchBar.css";
import { logoSvg, searchSvg, filterSvg } from "assets/images/index";
import { AutoCompleteInput } from "@components/AutoCompleteInput/AutoCompleteInput";
import { useMapContext } from "@hooks/index";
import { toast } from "react-toastify";
import { FilterPopUp } from "@components/FilterPopUp/FilterPopUp";

export const SearchBar = () => {
  const navigate = useNavigate();
  const {
    data: { token, isExpired },
    updateToken,
  } = useToken();
  const { goToLocation, setSearchLocation } = useMapContext();

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    updateToken();
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
    <nav className="search-navigation">
      <div className="filters-wrapper">
        <img
          src={logoSvg}
          alt="Kolo logo"
          className="kolo-logo"
          onClick={() => navigate(routes.HOME)}
        />

        <div className="location-wrapper">
          <label htmlFor="location">Lokacija</label>
          <AutoCompleteInput onPlaceResolved={handlePlaceResolved} />
        </div>

        <div>
          <input type="text" />
        </div>

        <div className="icon-wrapper">
          <img src={searchSvg} alt="Search icon" />
        </div>

        <div className="icon-wrapper">
          <img src={filterSvg} alt="Filter icon" style={{ width: "22px" }} />
        </div>
      </div>
      <div className="navigation-links">
        <Link to={routes.ABOUT}>Kako radi</Link>

        {token && !isExpired ? (
          <Link to={routes.HOME} onClick={handleLogout}>
            Odjavi se
          </Link>
        ) : (
          <>
            <Link to={routes.REGISTER}>Registracija</Link>
            <Link to={routes.LOGIN}>Prijavi se</Link>
          </>
        )}
      </div>
    </nav>
  );
};
