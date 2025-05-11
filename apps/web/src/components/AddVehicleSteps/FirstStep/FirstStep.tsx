import { CarCategory } from "enums";
import { StepProps } from "../../../types";
import c from "./FirstStep.module.css";
import { getMinDate } from "@utils/getMinDate.util";
import { useRef } from "react";
import coupeIcon from "../../../assets/images/coupeIcon.svg";
import sedanIcon from "../../../assets/images/sedanIcon.svg";
import cabrioletIcon from "../../../assets/images/cabrioletIcon.svg";
import suvIcon from "../../../assets/images/suvIcon.svg";
import hatchbackIcon from "../../../assets/images/hatchbackIcon.svg";

const carCategoryIcons = [
  { name: CarCategory.COUPE, icon: coupeIcon },
  { name: CarCategory.SEDAN, icon: sedanIcon },
  { name: CarCategory.CABRIOLET, icon: cabrioletIcon },
  { name: CarCategory.SUV, icon: suvIcon },
  { name: CarCategory.HATCHBACK, icon: hatchbackIcon },
];

export const FirstStep = ({ data, onDataChange }: StepProps) => {
  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleCategoryChange = (category: CarCategory) => {
    onDataChange({
      details: {
        ...data.details,
        category: category,
      },
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onDataChange({ vehicleLicenseImg: file });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    onDataChange({
      [name]: value,
      details: {
        ...data.details,
      },
    });
  };

  console.log(data);

  return (
    <div className={c.form}>
      <div className={c.registrationContainer}>
        <div className={c.inputContainer}>
          <h3>Registracija</h3>
          <input
            type="text"
            name="registration"
            value={data.registration}
            onChange={handleChange}
            placeholder="ST-8888-AA"
          />
        </div>
        <div className={c.inputContainer}>
          <h3>Datum isteka</h3>
          <input
            type="date"
            name="registrationExpiration"
            min={getMinDate(30)}
            value={data.registrationExpiration}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className={c.inputContainer}>
        <h3>Slika prometne dozvole</h3>
        <div>
          <button
            onClick={() => inputFileRef.current?.click()}
            className={c.fileInput}
          >
            {data.vehicleLicenseImg ? "Promijeni" : "Prenesi"}
          </button>
          <input
            type="file"
            name=""
            ref={inputFileRef}
            onChange={handleFileChange}
            accept="image/*"
            style={{ display: "none" }}
          />
          {data.vehicleLicenseImg && (
            <p>Odabrano: {data.vehicleLicenseImg.name}</p>
          )}
        </div>
      </div>

      <div className={c.categoriesInputContainer}>
        <h3>Kategorija vozila</h3>

        <div className={c.categoriesWrapper}>
          {carCategoryIcons.map((category) => (
            <div
              key={category.name}
              className={
                data.details.category === category.name
                  ? `${c.categoryContainer} ${c.selected}`
                  : c.categoryContainer
              }
              onClick={() => handleCategoryChange(category.name)}
            >
              <img src={category.icon} alt={category.name} />
              <p>{category.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={c.modelBrandYearContainer}>
        <div className={c.inputContainer}>
          <h3>Marka</h3>
          <input
            type="text"
            name="brand"
            value={data.brand}
            onChange={handleChange}
            placeholder="Volkswagen"
          />
        </div>

        <div className={c.inputContainer}>
          <h3>Model</h3>
          <input
            type="text"
            name="model"
            value={data.model}
            onChange={handleChange}
            placeholder="Golf"
          />
        </div>

        <div className={c.inputContainer}>
          <h3>Godina</h3>
          <input
            type="number"
            name="productionYear"
            min="1900"
            max={new Date().getFullYear()}
            value={data.productionYear}
            onChange={handleChange}
            placeholder="2025"
          />
        </div>
      </div>
    </div>
  );
};
