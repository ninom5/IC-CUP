import { notifSvg } from "@assets/images";
import { useToken } from "@hooks/index";
import { routes } from "@routes/index";
import { Link } from "react-router-dom";

export const SearchBarNavigationLinks = () => {
  const {
    data: { token, isExpired },
    updateToken,
  } = useToken();

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    updateToken();
  };

  return (
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
  );
};
