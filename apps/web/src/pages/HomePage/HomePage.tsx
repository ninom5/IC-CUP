import { routes } from "@routes/routes";
import { Link } from "react-router-dom";
export const HomePage = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Link to={routes.LOGIN}>LOGIN</Link>
      <Link to={routes.REGISTER}>REGISTER</Link>
      <Link to={routes.CARS}>CARS</Link>
    </div>
  );
};
