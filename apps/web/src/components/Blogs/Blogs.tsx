import c from "./Blogs.module.css";

export const Blogs = () => {
  return (
    <section className={c.blogsSection}>
      <div className={c.blog}>
        <div className={c.blogText}>
          <h2>Što je kolo i kako je nastalo?</h2>

          <h3>Svaka priča ima svoj početak, a kolo ima dva</h3>

          <p>
            Svaka priča ima svoj početak, ali kolo je toliko važno da ima čak
            dva. Prva priča o kolu počinje još davnih dana kada su ljudi počeli
            uviđati kako im taj okrugli oblik olakšava život. Nova priča o Kolu
            počinje u Splitu, gdje se skupina mladih, ambicioznih studenata
            odlučila na poduzetnički pothvat
          </p>
        </div>

        <button>SAZNAJ VIŠE</button>
      </div>

      <div className={c.blog}>
        <div className={c.blogText}>
          <h2>Učini svoj odmor posebnim</h2>

          <h3>Zašto iznajmiti automobil lokalaca?</h3>

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
    </section>
  );
};
