import { routes } from "@routes/routes";
import { Link } from "react-router-dom";
import "./siteMapFooter.css";

export const SiteMapFooter = () => {
  return (
    <section className="sitemap-section">
      <h2>Sitemap</h2>
      <Link to={routes}>O nama</Link>
      <Link to={routes.ABOUT}>Kako radi</Link>
      <Link to={routes.ADD_CAR}>Iznajmi svoj auto</Link>
      <Link to={routes}>Unajmi auto</Link>
      <Link to={routes}>Česta pitanja</Link>
    </section>
  );
};
