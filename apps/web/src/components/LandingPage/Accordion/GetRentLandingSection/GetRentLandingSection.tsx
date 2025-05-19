import "./getRentLandingSection.css";
import { get, rent } from "@assets/images";

export const GetRentLandingSection = () => {
  return (
    <section className="get-rent-section">
      <div>
        <h2>unajmi vozilo</h2>
        <img src={rent} alt="slika" />
      </div>
      <div>
        <h2>iznajmi vozilo</h2>
        <img src={get} alt="slika" />
      </div>
    </section>
  );
};
