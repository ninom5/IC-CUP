import { CarCategory } from "enums";
import { StepProps } from "../../../types";
import c from "./FirstStep.module.css";
import { getMinDate } from "@utils/getMinDate.util";
import { useRef } from "react";

export const FirstStep = ({ data, onDataChange }: StepProps) => {
  const inputFileRef = useRef<HTMLInputElement>(null);

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
        ...(name === "category" && { category: value as CarCategory }),
      },
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
            Prenesi
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
            <p>Odabrana: {data.vehicleLicenseImg.name}</p>
          )}
        </div>
      </div>

      <div>
        <h3>Kategorija vozila</h3>
        <select
          name="category"
          value={data.details.category}
          onChange={handleChange}
        >
          {Object.values(CarCategory).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="modelBrandContainer">
        <div className="formInputContainer">
          <h3>Marka</h3>
          <input
            type="text"
            name="brand"
            value={data.brand}
            onChange={handleChange}
          />
        </div>

        <div className="formInputContainer">
          <h3>Model</h3>
          <input
            type="text"
            name="model"
            value={data.model}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="formInputContainer">
        <h3>Godina</h3>
        <input
          type="number"
          name="productionYear"
          min="1900"
          max={new Date().getFullYear()}
          value={data.productionYear}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};
