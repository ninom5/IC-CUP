import c from "./FourthStep.module.css";
import { StepProps } from "../../../types/index";

export const FourthStep = ({ data, onDataChange }: StepProps) => {
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onDataChange({
      [name]: Number(value),
      details: {
        ...data.details,
      },
    });
  };

  return (
    <div className={c.form}>
      <div className={c.inputContainer}>
        <h3>Cijena / po danu</h3>
        <label>
          <input
            type="text"
            name="dailyPrice"
            value={data.dailyPrice}
            placeholder="40.00"
            onChange={handlePriceChange}
          />{" "}
          €
        </label>
      </div>
    </div>
  );
};
