import { Neanderthal } from "@components/index";
import { kolo } from "assets/videos";
import { spinnerSvg } from "assets/images/index";
import c from "./HomePage.module.css";
import { NavLink } from "react-router-dom";
import koloLogo from "assets/images/kolo-logo.svg";

export const HomePage = () => {
  return (
    <>
      <nav className={c.navBar}>
        <img src={koloLogo} />
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/register">Register</NavLink>
      </nav>
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
      {/* <Footer /> */}
    </>
  );
};
