import { useNavigate } from "react-router-dom";
import "./notFoundPage.css";
import { routes } from "@routes/routes";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <section className="not-found-section">
      <h1>
        404, <br />
        PAGE NOT FOUND
      </h1>
      <button onClick={() => navigate(routes.HOME)}>Home</button>
      <button onClick={() => navigate(-1)}>Go back</button>
    </section>
  );
};
