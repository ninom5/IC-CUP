import { LandingSearch } from "@components/index";
import { kolo } from "assets/videos";
import "./heroSection.css";
import { spinnerSvg } from "assets/images/index";

export const HeroSection = () => {
  return (
    <section className="hero-section">
      <video
        className="landing-video"
        loop
        autoPlay
        muted
        playsInline
        preload="none"
        poster={spinnerSvg}
        width="100%"
      >
        <source src={kolo} type="video/mp4" />
      </video>

      <LandingSearch />
    </section>
  );
};
