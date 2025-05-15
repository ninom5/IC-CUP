import { faqAuto } from "@assets/images";
import c from "./faqSection.module.css";
import { Accordion } from "@components/index";

export const FAQSection = () => {
  return (
    <div className={c.faqSection}>
      <div className={c.faqContent}>
        <h1>Česta pitanja</h1>
        <Accordion />
      </div>
      <div className={c.faqImage}>
        <img src={faqAuto} alt="Car with ??" />
      </div>
    </div>
  );
};
