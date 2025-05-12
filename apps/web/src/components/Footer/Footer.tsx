import { Contact, SiteMapFooter } from "@components/index";
import "./footer.css";
import { koloFooterSvg, lineSvg } from "assets/images/index";

export const Footer = () => {
  return (
    <section className="footer-section">
      <div className="footer-content">
        <div className="kolo-footer-wrapper">
          <img src={koloFooterSvg} alt="Kolo footer logo" />
        </div>

        <div className="footer-columns">
          <Contact />

          <SiteMapFooter />
        </div>
      </div>
      <img src={lineSvg} alt="Slika ceste" style={{ width: "100%" }} />
    </section>
  );
};
