import { LandingSearch } from "@components/index";
import { kolo } from "assets/videos";
import "./heroSection.css";

export const HeroSection = () => {
  return (
    <section className="hero-section">
      <video
        loop
        autoPlay
        muted
        playsInline
        width="100%"
        className="landing-video"
      >
        <source src={kolo} type="video/mp4" />
      </video>

      <LandingSearch />
    </section>
  );
};
