import {
  cabriolet,
  coupe,
  fuelSvg,
  hatchback,
  seatSvg,
  sedan,
  suv,
  transmissionSvg,
} from "@assets/images/index";
import "./filterPopUp.css";
import { FilterRow } from "@components/FilterRow/FilterRow";

const carCategories = [coupe, sedan, cabriolet, suv, hatchback];
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
      <div className="sort-section">
        <h2>Sortiraj po</h2>
        <select name="" id="sort-select" value="" className="filter-select">
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

      <div className="vehicle-category">
        <h2>Kategorija vozila</h2>
        <div className="car-categories-images">
          {carCategories.map((img) => (
            <div key={img} className="category-wrapper">
              <img src={img} alt="slika categorije auta" />
            </div>
          ))}
        </div>
      </div>

      <FilterRow
        label="Vrsta mjenjača"
        imgSrc={transmissionSvg}
        imgAlt="Slikica mjenjača"
        selectOptions={[
          { label: "Ručni", value: "manual" },
          { label: "Automatik", value: "automatic" },
        ]}
      />
      <FilterRow
        label="Broj sjedala"
        imgSrc={seatSvg}
        imgAlt="Slikica sjedala"
        selectOptions={[
          { label: "2", value: "2" },
          { label: "5", value: "5" },
          { label: "7", value: "7" },
        ]}
      />
      <FilterRow
        label="Vrsta goriva"
        imgSrc={fuelSvg}
        imgAlt="Slikica goriva"
        selectOptions={[
          { label: "Benzin", value: "petrol" },
          { label: "Dizel", value: "diesel" },
        ]}
      />
    </div>
  );
};
