import c from "./Blogs.module.css";

export const Blogs = () => {
  return (
    <section className={c.blogsSection}>
      <div className={c.blogsContainer}>
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
      </div>
    </section>
  );
};
