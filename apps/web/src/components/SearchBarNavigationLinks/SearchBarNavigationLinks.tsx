import { notifSvg } from "@assets/images";
import { LoginForm } from "@components/LoginForm/LoginForm";
import { useToken } from "@hooks/index";
import { routes } from "@routes/index";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./searchBarNavigationLinks.css";
import { RegisterForm } from "@components/RegisterForm/RegisterForm";

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
