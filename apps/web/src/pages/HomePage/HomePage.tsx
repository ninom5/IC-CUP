import { routes } from "@routes/index";
import { Link } from "react-router-dom";
import { Footer } from "@components/index";

export const HomePage = () => {
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Link to={routes.VEHICLES}>CARS</Link>
      </div>

      <Footer />
    </>
  );
};
