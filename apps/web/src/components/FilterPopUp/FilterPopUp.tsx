import {
  cabrioletSvg,
  coupeSvg,
  fuelSvg,
  hatchbackSvg,
  seatSvg,
  sedanSvg,
  suvSvg,
  transmissionSvg,
} from "@assets/images/index";
import "./filterPopUp.css";
import { FilterRow } from "@components/FilterRow/FilterRow";
import { FilterPopUpProps, FiltersType } from "types/filter.type";
import { ButtonAccent } from "@components/ButtonAccent/ButtonAccent";
import { useState } from "react";

const carCategories = [
  { label: "Coupe", value: "coupe", img: coupeSvg },
  { label: "Sedan", value: "sedan", img: sedanSvg },
  { label: "Cabriolet", value: "cabriolet", img: cabrioletSvg },
  { label: "SUV", value: "suv", img: suvSvg },
  { label: "Hatchback", value: "hatchback", img: hatchbackSvg },
];

const sortFilters = [
  // key value pari mozda?
  "Cijena (niža > viša)",
  "Cijena (viša > niža)",
  "Ocjena (niža > viša)",
  "Ocjena (viša > niža)",
];

export const FilterPopUp = ({
  userFilters,
  setUserFilters,
  setShowFilters,
}: FilterPopUpProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleChange = (key: keyof FiltersType, value: string) => {
    setUserFilters((prev) => ({ ...prev, [key]: value }));
  };

  const defaultFilters: FiltersType = {
    sortBy: "",
    category: "",
    transmission: "",
    seatNumber: "",
    fuelType: "",
  };

  return (
    <div className="filters-section">
      <span className="close-span" onClick={() => setShowFilters(false)}>
        &times;
      </span>

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
          {carCategories.map(({ img, value, label }) => (
            <div
              key={img}
              className={`category-wrapper ${selectedCategory === value ? "selected" : ""}`}
              onClick={() => {
                handleChange("category", value);
                setSelectedCategory(value);
              }}
            >
              <img src={img} alt="slika categorije auta" />
              <h3>{label}</h3>
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
        value={userFilters.transmission}
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
        value={userFilters.seatNumber}
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
        value={userFilters.fuelType}
        onChange={(val: string) => handleChange("fuelType", val)}
      />

      <div className="filter-buttons">
        <ButtonAccent
          content="Resetiraj"
          onClick={() => {
            setUserFilters(defaultFilters);
            setSelectedCategory(null);
          }}
        />

        <ButtonAccent
          content="Primjeni"
          onClick={() => setShowFilters(false)}
        />
      </div>
    </div>
  );
};
