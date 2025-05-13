import { notifSvg } from "@assets/images";
import { LoginForm } from "@components/LoginForm/LoginForm";
import { useAuthContext, useToken } from "@hooks/index";
import { routes } from "@routes/index";
import { Link, useNavigate } from "react-router-dom";
import "./searchBarNavigationLinks.css";
import { RegisterForm } from "@components/RegisterForm/RegisterForm";

export const SearchBarNavigationLinks = () => {
  const {
    data: { token, isExpired },
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
