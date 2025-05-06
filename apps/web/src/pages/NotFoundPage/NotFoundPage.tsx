import { useNavigate } from "react-router-dom";
import "./notFoundPage.css";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <section className="not-found-section">
      <h1>
        404, <br />
        PAGE NOT FOUND
      </h1>
      <button id="go-back-button" onClick={() => navigate(-1)}>
        Go back
      </button>
    </section>
  );
};
