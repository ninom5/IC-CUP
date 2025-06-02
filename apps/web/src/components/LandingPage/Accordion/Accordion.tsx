import { accordionData } from "@constants/index";
import c from "./accordion.module.css";
import { downFAQ, upFAQ } from "@assets/images";
import { useState } from "react";

export const Accordion = () => {
  const [selected, setSelected] = useState<number | null>(null);

  const toggle = (i: number) => {
    if (selected === i) {
      return setSelected(null);
    }

    setSelected(i);
  };

  return (
    <div className={c.accordion}>
      {accordionData.map((item, i) => (
        <div className={c.item} key={i}>
          <div className={c.title} onClick={() => toggle(i)}>
            <h2>{item.question}</h2>
            {selected === i ? (
              <img src={upFAQ} alt="ˇ" />
            ) : (
              <img src={downFAQ} alt="ˇ" />
            )}
          </div>
          <div className={c.content}>{selected === i && item.answer}</div>
        </div>
      ))}
    </div>
  );
};
