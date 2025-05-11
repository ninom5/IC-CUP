import {
  cabrioletSvg,
  coupeSvg,
  gasSvg,
  hatchbackSvg,
  seatSvg,
  sedanSvg,
  suvSvg,
  transmissionSvg,
} from "@assets/images/index";

const carCategories = [cabrioletSvg, coupeSvg, hatchbackSvg, sedanSvg, suvSvg];
const sortFilters = [
  // key value pari mozda?
  "Cijena (niža > viša)",
  "Cijena (viša > niža)",
  "Ocjena (niža > viša)",
  "Ocjena (viša > niža)",
];

//mozda nesto extractat ka komponentu, ponavlja se struktura
export const FilterPopUp = () => {
  return (
    <div className="filters-section">
      <div>
        <h2>Sortiraj po</h2>
        <select name="" id="" value="">
          <option value="" disabled>
            Odaberite filter
          </option>

          {sortFilters.map((filter) => (
            <option key={filter} value={filter}>
              {filter}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h2>Kategorija vozila</h2>
        <div className="car-categories-images">
          {carCategories.map((img) => (
            <div key={img} className="category-wrapper">
              <img src={img} alt="slika categorije auta" />
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2>Vrsta mjenjača</h2>
        <div>
          <img src={transmissionSvg} alt="slika mjenjaca" />
          <select name="" id="">
            <option value="">Ručni</option>
            <option value="">Automatik</option>
          </select>
        </div>
      </div>

      <div>
        <h2>Broj sjedala</h2>
        <div>
          <img src={seatSvg} alt="slika sjedala" />
          <select name="" id="">
            <option value="2">2</option>
            <option value="5">5</option>
            <option value="7">7</option>
          </select>
        </div>
      </div>

      <div>
        <h2>Vrsta goriva</h2>
        <div>
          <img src={gasSvg} alt="slika goriva" />
          <select name="" id="">
            <option value="petrol">Benzin</option>
            <option value="diesel">Dizel</option>
          </select>
        </div>
      </div>
    </div>
  );
};
