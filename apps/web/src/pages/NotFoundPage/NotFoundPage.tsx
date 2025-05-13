import { useNavigate } from "react-router-dom";
import "./notFoundPage.css";
import { routes } from "@routes/index";
import { desert1Svg, wheelSvg, desert2Svg } from "assets/images/index";
import { ButtonAccent } from "@components/index";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <section className="not-found-section">
      <h1>Kolo ti se otkotrljalo u nepoznato područje</h1>

      <section className="wheels-section">
        <div className="wheels-section-image-wrapper">
          <img src={desert1Svg} alt="pustinjski kolut" />
        </div>
        <div className="wheels-section-image-wrapper">
          <img src={wheelSvg} alt="staro kolo" />
        </div>
        <div className="wheels-section-image-wrapper">
          <img src={desert2Svg} alt="pustinjski kolut" />
        </div>
      </section>

      <div className="not-found-buttons">
        <ButtonAccent content="Home" onClick={() => navigate(routes.HOME)} />
        <ButtonAccent content="Vrati se nazad" onClick={() => navigate(-1)} />
      </div>
    </section>
  );
};
