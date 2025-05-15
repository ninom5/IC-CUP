
import {
  Blogs,
  HeroSection,
  HowItWorks,
  Neanderthal,
  GetRentLandingSection,
} from "@components/index";
import { kolo } from "assets/videos";
import { spinnerSvg } from "assets/images/index";


export const HomePage = () => {
  return (
    <main>

      <HeroSection />

      <video
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


      <Neanderthal />
      <Blogs />
      <GetRentLandingSection />
      <HowItWorks />

      <Footer />
    </main>
  );
};
