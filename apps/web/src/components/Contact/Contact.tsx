import { Link } from "react-router-dom";
import "./contact.css";
import { tikTokSvg, faceSvg, instagramSvg } from "assets/images/index";

export const Contact = () => {
  return (
    <section className="contact-section">
      <h2>Kontakt</h2>

      <Link to="mailto:info.hr.kolo@gmail.com">info.hr.kolo@gmail.com</Link>

      <p>Domovinksog rata 95, 21000 Split</p>
      <p>+385 99 302 6566</p>

      <div className="social-media-icons">
        <div className="social-media-icon-wrapper">
          <img src={instagramSvg} alt="instagram ikonica" />
        </div>

        <div className="social-media-icon-wrapper">
          <img src={faceSvg} alt="facebook ikonica" />
        </div>

        <div className="social-media-icon-wrapper">
          <img src={tikTokSvg} alt="tik tok ikonica" />
        </div>
      </div>
    </section>
  );
};
