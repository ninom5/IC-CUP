import { Neanderthal } from "@components/index";
import c from "./HomePage.module.css";
import { NavLink } from "react-router-dom";
import koloLogo from "assets/images/kolo-logo.svg";
import {
  FAQSection,
  Footer,
  Blogs,
  HeroSection,
  HowItWorks,
  Neanderthal,
  GetRentLandingSection,
} from "@components/index";

export const HomePage = () => {
  return (
    <main>
       <nav className={c.navBar}>
        <img src={koloLogo} />
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/register">Register</NavLink>
      </nav>
      <HeroSection />

      <Neanderthal />
      <Blogs />
      <GetRentLandingSection />
      <HowItWorks />
      <FAQSection />
      <Footer />
    </main>
  );
};
