import { Blogs, Footer, HowItWorks, Neanderthal } from "@components/index";
import { kolo } from "assets/videos";

export const HomePage = () => {
  return (
    <main>
      <video loop autoPlay muted playsInline width="100%">
        <source src={kolo} type="video/mp4" />
      </video>

      <Neanderthal />
      <Blogs />
      <HowItWorks />

      <Footer />
    </main>
  );
};
