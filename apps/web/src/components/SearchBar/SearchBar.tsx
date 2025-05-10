import { useToken } from "@hooks/index";
import { routes } from "@routes/index";
import { Link } from "react-router-dom";
import "./searchBar.css";

export const SearchBar = () => {
  const {
    data: { token, isExpired },
    updateToken,
  } = useToken();

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    updateToken();
  };

  return (
    <nav>
      <input type="text" />

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
    </nav>
  );
};
