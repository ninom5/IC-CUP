import { FuelType } from "enums";
import { StepProps } from "../../../types";
import c from "./SecondStep.module.css";

export const SecondStep = ({ data, onDataChange }: StepProps) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    onDataChange({
      details: {
        ...data.details,
        [name]: name === "numOfSeats" ? Number(value) : value,
      },
    });
  };

  const handleTransmissionChange = (isAutomatic: boolean) => {
    onDataChange({
      details: {
        ...data.details,
        isAutomatic,
      },
    });
  };

  return (
    <div className={c.form}>
      <div>
        <div className={c.formInputContainer}>
          <h3>Broj sjedala</h3>
          <select
            name="numOfSeats"
            value={data.details.numOfSeats}
            onChange={handleChange}
          >
            {[2, 5, 7].map((seats) => (
              <option key={seats} value={seats}>
                {seats}
              </option>
            ))}
          </select>
        </div>

        <div>
          <h3>Gorivo</h3>
          <select
            name="fuelType"
            value={data.details.fuelType}
            onChange={handleChange}
          >
            {Object.values(FuelType).map((ft) => (
              <option key={ft} value={ft}>
                {ft}
              </option>
            ))}
          </select>
        </div>

        <div>
          <h3>Mjenjač</h3>
          <label>
            <input
              type="radio"
              checked={!data.details.isAutomatic}
              onChange={() => handleTransmissionChange(false)}
            />
            manualni
          </label>
          <label>
            <input
              type="radio"
              checked={data.details.isAutomatic}
              onChange={() => handleTransmissionChange(true)}
            />
            automatik
          </label>
        </div>
      </div>
      <div>
        Additional features
        <div>
          <label>
            <input type="checkbox" />
            Feature
          </label>
          <label>
            <input type="checkbox" />
            Feature
          </label>
          <label>
            <input type="checkbox" />
            Feature
          </label>
        </div>
      </div>
    </div>
  );
};
