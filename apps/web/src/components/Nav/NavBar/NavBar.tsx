import { logoSvg } from "@assets/images";
import { SearchBarNavigationLinks } from "@components/index";
import { routes } from "@routes/index";
import { useNavigate } from "react-router-dom";
import "./navBar.css";

export const NavBar = () => {
  const navigate = useNavigate();

  return (
    <nav className="search-navigation">
      <img
        src={logoSvg}
        alt="Kolo logo"
        className="kolo-logo"
        onClick={() => navigate(routes.HOME)}
      />

      <SearchBarNavigationLinks />
    </nav>
  );
};
