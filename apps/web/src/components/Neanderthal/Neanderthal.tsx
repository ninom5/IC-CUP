import "./neanderthal.css";
import { path, neanderthal, neanderthalKolo } from "@assets/images";

export const Neanderthal = () => {
  return (
    <section className="neanderthal-section">
      <div className="entering-text">
        <h1>
          kolo, najbolji izum <br /> od izuma kola
        </h1>
        <p>
          Kolo Vaš partner za najam vozila s karakterom! <br /> Dobro došli na
          prvu hrvatsku peer-to-peer platformu!
        </p>
      </div>

      <div className="neanderthal-images-wrapper">
        <img src={path} alt="neanderthal path" id="path" />
        <img src={neanderthal} alt="neanderthal" id="neanderthal" />
        <img src={neanderthalKolo} alt="wheel" id="wheel" />
      </div>
    </section>
  );
};
