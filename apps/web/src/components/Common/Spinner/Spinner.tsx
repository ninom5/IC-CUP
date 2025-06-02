import "./spinner.css";
import { spinnerSvg } from "@assets/images";

export const Spinner = () => {
  return (
    <section className="spinner">
      <img src={spinnerSvg} alt="spinner wheel" />
    </section>
  );
};
