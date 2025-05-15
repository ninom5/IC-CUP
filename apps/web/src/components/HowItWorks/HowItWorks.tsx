import { useState, useEffect } from "react";
import c from "./HowItWorks.module.css";
import {
  howItWorksPath,
  stopSign,
  arrowIcon,
  howItWorksCar,
} from "@assets/images";

export const HowItWorks = () => {
  const [step, setStep] = useState(0);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSlideRight = () => {
    if (step < 4) setStep((prev) => prev + 1);
  };

  const handleSlideLeft = () => {
    if (step > 0) setStep((prev) => prev - 1);
  };

  const isMobile = windowWidth < 700;
  const stepWidth = isMobile ? 100 : 50;
  const gap = isMobile ? 0 : 37.5;

  const transformValue = isMobile
    ? `translateX(-${step * 100}vw)`
    : `translateX(calc(-${step * (stepWidth + gap)}vw - 20px))`;

  console.log("isMobile:", isMobile);
  console.log("transformValue:", transformValue);

  return (
    <section className={c.howItWorksSection}>
      <div className={c.howItWorksHeader}>
        <h1>kako radi?</h1>

        <div className={c.actionsHeader}>
          <h3>UNAJMLJIVANJE</h3>
          <h3>IZNAJMLJIVANJE</h3>
        </div>
      </div>

      <div
        className={c.stepsContainer}
        style={{
          transform: isMobile
            ? `translateX(-${step * 100}vw)`
            : `translateX(calc(-${step * (stepWidth + gap)}vw - 20px))`,
          transition: "transform 0.5s ease-in-out",
        }}
      >
        <div className={c.step}>
          <div className={c.stepHeader}>
            <h3>1. REGISTRIRAJ SE</h3>
            <p>
              Sigurnost nam je na prvom mjesto stoga pri svakoj registraciji
              provjeravamo valjanost i ispravnost podataka i dokumenata
            </p>
          </div>

          <img src={stopSign} alt="znak stop" />
        </div>

        <div className={c.step}>
          <div className={c.stepHeader}>
            <h3>2. ODABERI LOKACIJU I DATUM</h3>
            <p>
              Biraj gdje, kada i koliko dugo ti je potrebno vozilo, a mi ćemo ti
              ponuditi najbolje opcije za tebe
            </p>
          </div>

          <img src={stopSign} alt="znak stop" />
        </div>

        <div className={c.step}>
          <div className={c.stepHeader}>
            <h3>3. IZABERI VOZILO</h3>
            <p>
              Pretraži našu ponudu vozila i odaberi ono koje ti najviše
              odgovara, bilo prema cijeni, tipu ili karakteristikama.
            </p>
          </div>

          <img src={stopSign} alt="znak stop" />
        </div>

        <div className={c.step}>
          <div className={c.stepHeader}>
            <h3>4. SIGURNO PLATI</h3>
            <p>
              Sigurno plati i tvoje vozilo je rezervirano. Vrijeme je da se
              prepustiš doživljaju!
            </p>
          </div>

          <img src={stopSign} alt="znak stop" />
        </div>

        <img src={howItWorksCar} alt="car" className={c.carImage} />
      </div>

      <img src={howItWorksPath} alt="staza" className={c.pathImage} />

      {step < 4 && (
        <img
          src={arrowIcon}
          alt="ikona strelice"
          className={c.arrowIconRight}
          onClick={handleSlideRight}
        />
      )}

      {step > 0 && (
        <img
          src={arrowIcon}
          alt="ikona strelice"
          className={c.arrowIconleft}
          onClick={handleSlideLeft}
        />
      )}
    </section>
  );
};
