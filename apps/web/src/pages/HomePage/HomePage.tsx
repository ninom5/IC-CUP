import { Footer } from "@components/index";
import { AutoCompleteInput } from "@components/index";
import { routes } from "@routes/index";
import { Link } from "react-router-dom";
export const HomePage = () => {
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Link to={routes.LOGIN}>LOGIN</Link>
        <Link to={routes.REGISTER}>REGISTER</Link>
        <Link to={routes.CARS}>CARS</Link>
        <AutoCompleteInput />
      </div>
      <Footer />
    </>
  );
};
