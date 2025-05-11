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
import { FilterPopUpProps, FiltersType } from "types/filter.type";

const carCategories = [
  { label: "Coupe", value: "coupe", img: coupe },
  { label: "Sedan", value: "sedan", img: sedan },
  { label: "Cabriolet", value: "cabriolet", img: cabriolet },
  { label: "SUV", value: "suv", img: suv },
  { label: "Hatchback", value: "hatchback", img: hatchback },
];

const sortFilters = [
  // key value pari mozda?
  "Cijena (niža > viša)",
  "Cijena (viša > niža)",
  "Ocjena (niža > viša)",
  "Ocjena (viša > niža)",
];

export const FilterPopUp = ({ filters, setFilters }: FilterPopUpProps) => {
  const handleChange = (key: keyof FiltersType, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };
  return (
    <div className="filters-section">
      <div className="sort-section">
        <h2>Sortiraj po</h2>
        <select
          name=""
          id="sort-select"
          value=""
          className="filter-select"
          onChange={(e) => handleChange("sortBy", e.target.value)}
        >
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
          {carCategories.map(({ img, value }) => (
            <div
              key={img}
              className="category-wrapper"
              onClick={() => handleChange("category", value)}
            >
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
        value={filters.transmission}
        onChange={(val: string) => handleChange("transmission", val)}
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
        value={filters.seatNumber}
        onChange={(val: string) => handleChange("seatNumber", val)}
      />
      <FilterRow
        label="Vrsta goriva"
        imgSrc={fuelSvg}
        imgAlt="Slikica goriva"
        selectOptions={[
          { label: "Benzin", value: "petrol" },
          { label: "Dizel", value: "diesel" },
        ]}
        value={filters.fuelType}
        onChange={(val: string) => handleChange("fuelType", val)}
      />
    </div>
  );
};
