import { CarCategory } from "enums";
import { StepProps } from "../../../types";
import c from "./FirstStep.module.css";
import { getMinDate } from "@utils/getMinDate.util";

export const FirstStep = ({ data, onDataChange }: StepProps) => {
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
      <div className="modelBrandContainer">
        <div className="formInputContainer">
          <h3>Registracija</h3>
          <input
            type="text"
            name="registration"
            value={data.registration}
            onChange={handleChange}
          />
        </div>
        <div className="formInputContainer">
          <h3>Istek Registracija</h3>
          <input
            type="date"
            name="registrationExpiration"
            min={getMinDate(30)}
            value={data.registrationExpiration}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="formInputContainer">
        <h3>Slika prometne</h3>
        <input type="file" />
      </div>

      <div>
        <h3>Kategorija</h3>
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
