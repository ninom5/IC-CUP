import { AutoCompleteInput } from "@components/index";
import { routes } from "@routes/index";
import { Link } from "react-router-dom";
import { Footer } from "@components/index";

export const HomePage = () => {
  return ( 
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Link to={routes.CARS}>CARS</Link>
      </div>
      
      <Footer />
    </>
  );
};
