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
import { FilterRow, ButtonAccent } from "@components/index";
import { FilterPopUpProps, FiltersType } from "@types/FilterTypes/filter.type";
import { useEffect, useState } from "react";
import { useFiltersContext } from "@hooks/useFiltersContext";

const carCategories = [
  { label: "Coupe", value: "coupe", img: coupeSvg },
  { label: "Sedan", value: "sedan", img: sedanSvg },
  { label: "Cabriolet", value: "cabriolet", img: cabrioletSvg },
  { label: "SUV", value: "suv", img: suvSvg },
  { label: "Hatchback", value: "hatchback", img: hatchbackSvg },
];

const sortFilters = {
  price_lower_higher: "Cijena (niža > viša)",
  price_higher_lower: "Cijena (viša > niža)",
  rating_lower_higher: "Ocjena (niža > viša)",
  rating_higher_lower: "Ocjena (viša > niža)",
};

export const FilterPopUp = ({
  userFilters,
  setUserFilters,
  setShowFilters,
  handleSearch,
}: FilterPopUpProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { setFilters } = useFiltersContext();

  const defaultFilters: FiltersType = {
    sortBy: "",
    category: "",
    transmission: "",
    seatNumber: "",
    fuelType: "",
  };

  const handleChange = (key: keyof FiltersType, value: string) => {
    setUserFilters((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    setSelectedCategory(userFilters.category || null);
  }, []);

  return (
    <div className="filters-section">
      <div className="sort-section">
        <div className="filter-pop-up-header">
          <h2>Sortiraj</h2>

          <ButtonAccent
            content="Resetiraj filtere ×"
            onClick={() => {
              setUserFilters(defaultFilters);
              setSelectedCategory(null);
              setFilters({
                carCategory: "",
                fuelType: "",
                seats: "",
                sortBy: "",
                transmission: "",
                dateRange: [null, null],
              });
              setShowFilters(false);
            }}
          />
        </div>

        <select
          name=""
          id="sort-select"
          value={userFilters.sortBy}
          className="filter-select"
          onChange={(e) => handleChange("sortBy", e.target.value)}
        >
          <option value="" disabled>
            Odaberite filter
          </option>

          {Object.entries(sortFilters).map(([key, value]) => (
            <option key={key} value={key}>
              {value}
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
          content="Primjeni"
          onClick={() => {
            setShowFilters(false);
            handleSearch();
          }}
        />
      </div>
    </div>
  );
};
