import { StepProps } from "types";
import c from "./FirstStep.module.css";
import { getMinDate } from "@utils/index";
import { useRef } from "react";
import {
  CabrioletIcon,
  CoupeIcon,
  HatchbackIcon,
  SedanIcon,
  SuvIcon,
} from "@components/icons";
import checkmarkIcon from "../../../assets/images/checkmarkIcon.svg";
import { CarCategoryEnum } from "enums";

const CAR_CATEGORIES = [
  CarCategoryEnum.COUPE,
  CarCategoryEnum.SEDAN,
  CarCategoryEnum.CABRIOLET,
  CarCategoryEnum.SUV,
  CarCategoryEnum.HATCHBACK,
] as const;

const CATEGORY_ICONS = {
  [CarCategoryEnum.COUPE]: CoupeIcon,
  [CarCategoryEnum.SEDAN]: SedanIcon,
  [CarCategoryEnum.CABRIOLET]: CabrioletIcon,
  [CarCategoryEnum.SUV]: SuvIcon,
  [CarCategoryEnum.HATCHBACK]: HatchbackIcon,
};

export const FirstStep = ({ data, onDataChange }: StepProps) => {
  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleCategoryChange = (category: CarCategoryEnum) => {
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

  const getIconColor = (
    category: CarCategoryEnum,
    selectedCategory: CarCategoryEnum
  ) => {
    return category === selectedCategory ? "#222" : "#C0BEBE";
  };

  const renderCategoryIcons = () => {
    return CAR_CATEGORIES.map((category) => {
      const Icon = CATEGORY_ICONS[category];
      return (
        <div
          key={category}
          className={
            data.details.category === category
              ? `${c.categoryContainer} ${c.selected}`
              : c.categoryContainer
          }
          onClick={() => handleCategoryChange(category)}
        >
          <Icon color={getIconColor(category, data.details.category)} />
          <p>{category}</p>
        </div>
      );
    });
  };

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
            max={getMinDate(365)}
            value={data.registrationExpiration}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className={c.inputContainer}>
        <h3>Slika prometne dozvole</h3>

        {data.vehicleLicenseImg && <img src={checkmarkIcon} alt="checkmark" />}

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
        </div>
      </div>

      <div className={c.categoriesInputContainer}>
        <h3>Kategorija vozila</h3>

        <div className={c.categoriesWrapper}>{renderCategoryIcons()}</div>
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
