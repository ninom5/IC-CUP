import { useState } from "react";
import c from "./Blogs.module.css";
import { blackArrowRight, blackArrowLeft } from "@assets/images";

export const Blogs = () => {
  const [slide, setSlide] = useState<"left" | "right">("left");

  const handleSlide = (direction: "left" | "right") => {
    setSlide(direction);
  };

  return (
    <section className={c.blogsSection}>
      <div
        className={c.blogsContainer}
        style={{
          transform: `translateX(${slide === "right" ? "-50%" : "0"})`,
          transition: "transform 0.5s ease-in-out",
        }}
      >
        <div className={c.blogItem}>
          <div className={c.blogText}>
            <h2>ŠTO JE KOLO I KAKO JE NASTALO?</h2>

            <h3>SVAKA PRIČA IMA SVOJ POČETAK, A KOLO IMA DVA</h3>

            <p>
              Svaka priča ima svoj početak, ali kolo je toliko važno da ima čak
              dva. Prva priča o kolu počinje još davnih dana kada su ljudi
              počeli uviđati kako im taj okrugli oblik olakšava život. Nova
              priča o Kolu počinje u Splitu, gdje se skupina mladih, ambicioznih
              studenata odlučila na poduzetnički pothvat
            </p>
          </div>

          <button>SAZNAJ VIŠE</button>
        </div>

        <div className={c.blogItem}>
          <div className={c.blogText}>
            <h2>UČINI SVOJ ODMOR POSEBNIM</h2>

            <h3>ZAŠTO IZNAJMITI AUTOMOBIL LOKALACA?</h3>

            <p>
              Putovanja nisu samo destinacije, to su trenutci koje dijelimo sa
              samim sobom i drugima. Trenutci nastaju među nama ali zaslužuju
              imati svoje mjesto. Upravo to je razlog zbog kojeg putovanja
              lokalnim područjem u automobilu lokalca mijenjaju doživljaj, kako
              cijelog putovanja tako i same destinacije.
            </p>
          </div>

          <button>SAZNAJ VIŠE</button>
        </div>

        <div className={c.blogItem}>
          <div className={c.blogText}>
            <h2>TVOJA VOŽNJA ZA SVAKU PRILIKU</h2>

            <h3>ŽELIŠ NEŠTO DRUGAČIJE ZA SVOJ POSEBAN DAN U ŽIVOTU?</h3>

            <p>
              Kolo ti nudi mogućnost da svoj poseban dan pamtiš i po posebnom
              prijevozu. Od elegantnih vozila ako želiš dodati dašak luksuza pa
              do oldtimera ako želiš da tvoj dan bude putovanje kroz vrijeme.
            </p>
          </div>

          <button>SAZNAJ VIŠE</button>
        </div>
      </div>

      <img
        src={blackArrowRight}
        alt="crna strelica u desno"
        className={`${c.blackArrowRight} ${slide === "right" ? "" : c.display}`}
        onClick={() => handleSlide("right")}
      />

      <img
        src={blackArrowLeft}
        alt="crna strelica u lijevo"
        className={`${c.blackArrowLeft} ${slide === "left" ? "" : c.display}`}
        onClick={() => handleSlide("left")}
      />
    </section>
  );
};
