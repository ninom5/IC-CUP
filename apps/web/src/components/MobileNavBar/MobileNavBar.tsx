import { MobileNavBarComponent } from "@components/MobileNavBarComponent/MobileNavBarComponent";
import "./mobileNavBar.css";
import { searchSvg, roadSvg, profileWhiteLogo, car } from "assets/images/index";

export const MobileNavBar = () => {
  return (
    <nav className="mobile-navigation">
      <MobileNavBarComponent
        imgSrc={searchSvg}
        imgAlt="povecalo"
        text="Traži"
      />

      <MobileNavBarComponent imgSrc={roadSvg} imgAlt="cesta" text="Vožnje" />

      <MobileNavBarComponent imgSrc={car} imgAlt="auto" text="Vozila" />

      <MobileNavBarComponent
        imgSrc={profileWhiteLogo}
        imgAlt="profil"
        text="Profil"
      />
    </nav>
  );
};
