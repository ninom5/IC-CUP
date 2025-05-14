import { notifSvg } from "@assets/images";
import { LoginForm } from "@components/LoginForm/LoginForm";
import { RegisterForm } from "@components/RegisterForm/RegisterForm";
import { useToken } from "@hooks/index";
import { routes } from "@routes/index";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./searchBarNavigationLinks.css";

export const SearchBarNavigationLinks = () => {
  const {
    data: { token, isExpired },
    updateToken,
  } = useToken();

  const [showLoginPopUp, setShowLoginPopUp] = useState(false);
  const [showRegisterPopUp, setShowRegisterPopUp] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    updateToken();
  };

  return (
    <div className="navigation-links">
      {token && !isExpired ? (
        <>
          <NavLink to={routes.USERS_DRIVES}>Tvoje vožnje</NavLink>
          <NavLink to={routes.USER_VEHICLES}>Tvoja kola</NavLink>
          <NavLink to={routes.HOME} onClick={handleLogout}>
            Odjavi se
          </NavLink>

          <div className="icon-wrapper">
            <img src={notifSvg} alt="slikica zvona" />
          </div>
        </>
      ) : (
        <>
          <NavLink to={routes.ABOUT}>Kako radi</NavLink>

          <button
            onClick={() => setShowRegisterPopUp(true)}
            className="register-button"
          >
            Registracija
          </button>
          <button
            onClick={() => setShowLoginPopUp(true)}
            className="login-button"
          >
            Prijavi se
          </button>
        </>
      )}

      {showLoginPopUp && <LoginForm onClose={() => setShowLoginPopUp(false)} />}

      {showRegisterPopUp && (
        <RegisterForm onClose={() => setShowRegisterPopUp(false)} />
      )}
    </div>
  );
};
