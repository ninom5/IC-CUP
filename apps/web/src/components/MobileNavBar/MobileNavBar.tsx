import { MobileNavBarComponent } from "@components/MobileNavBarComponent/MobileNavBarComponent";
import "./mobileNavBar.css";
import { extractUserInfo } from "@utils/extractUserInfo.util";
import { SearchIcon, ProfileIcon, CarIcon, RoadIcon } from "@components/icons";

export const MobileNavBar = () => {
  const { data: userData } = extractUserInfo();

  return (
    <nav className="mobile-navigation">
      <MobileNavBarComponent
        Icon={SearchIcon}
        imgAlt="povecalo"
        text="Traži"
        path="/vehicles"
      />

      <MobileNavBarComponent
        Icon={RoadIcon}
        imgAlt="cesta"
        text="Vožnje"
        path="/user/drives"
      />

      <MobileNavBarComponent
        Icon={CarIcon}
        imgAlt="auto"
        text="Vozila"
        path="/user/vehicle"
      />

      <MobileNavBarComponent
        Icon={ProfileIcon}
        imgAlt="profil"
        text="Profil"
        path={`/profile/${userData.id}`}
      />
    </nav>
  );
};
