import { useToken } from "@hooks/index";
import { routes } from "@routes/index";
import { Link, useNavigate } from "react-router-dom";
import "./searchBar.css";
import logoSvg from "assets/images/Vector.svg";
import { AutoCompleteInput } from "@components/AutoCompleteInput/AutoCompleteInput";
import { useMapContext } from "@hooks/index";
import { toast } from "react-toastify";

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

      <div className="navigation-links">
        <Link to={routes.ABOUT}>How it works</Link>

        {token && !isExpired ? (
          <Link to={routes.HOME} onClick={handleLogout}>
            Logout
          </Link>
        ) : (
          <>
            <Link to={routes.REGISTER}>Register</Link>
            <Link to={routes.LOGIN}>Login</Link>
          </>
        )}
      </div>
    </nav>
  );
};
