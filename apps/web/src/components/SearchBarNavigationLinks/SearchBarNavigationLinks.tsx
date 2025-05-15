import { notifSvg, profileLogo } from "@assets/images";
import { LoginForm } from "@components/LoginForm/LoginForm";
import { RegisterForm } from "@components/RegisterForm/RegisterForm";
import { useAuthContext, useToken } from "@hooks/index";
import { routes } from "@routes/index";
import { Link, useNavigate } from "react-router-dom";
import "./searchBarNavigationLinks.css";
import { useState } from "react";

export const SearchBarNavigationLinks = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const {
    data: { id, token, isExpired },
    updateToken,
  } = useToken();

  const { showLogin, showRegister, setShowLogin, setShowRegister } =
    useAuthContext();

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    updateToken();

    setTimeout(() => {
      navigate(routes.HOME, { replace: true });
    }, 0.5);
  };

  return (
    <div className="navigation-links">
      {token && !isExpired ? (
        <>
          <Link to={routes.USERS_DRIVES}>Tvoje vožnje</Link>
          <Link to={routes.USER_VEHICLES}>Tvoja kola</Link>

          <div
            className="icon-wrapper"
            id="profile-icon"
            onClick={() => setShowProfileMenu((prev) => !prev)}
          >
            <img src={profileLogo} alt="slikica profila" />
            {showProfileMenu && (
              <div className="profile-menu">
                <button onClick={() => navigate(`/profile/${id}`)}>
                  Uđi u profil
                </button>
                <button onClick={handleLogout}>Odjavi se</button>{" "}
              </div>
            )}
          </div>

          <div className="icon-wrapper">
            <img src={notifSvg} alt="slikica zvona" />
          </div>
        </>
      ) : (
        <>
          <Link to={routes.ABOUT}>Kako radi</Link>

          <button
            onClick={() => setShowRegister(true)}
            className="register-button"
          >
            Registracija
          </button>
          <button onClick={() => setShowLogin(true)} className="login-button">
            Prijavi se
          </button>
        </>
      )}

      {showLogin && <LoginForm />}

      {showRegister && <RegisterForm />}
    </div>
  );
};
