import { Footer, Neanderthal } from "@components/index";
import { kolo } from "assets/videos";

export const HomePage = () => {
  return (
    <>
      <video loop autoPlay muted playsInline width="100%">
        <source src={kolo} type="video/mp4" />
      </video>

      <Neanderthal />
      {/* <Footer /> */}
    </>
  );
};
