import { routes } from "@routes/index";
import { Link } from "react-router-dom";
export const HomePage = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Link to={routes.CARS}>CARS</Link>
    </div>
  );
};
