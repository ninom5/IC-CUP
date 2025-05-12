import { StepProps } from "../../../types";
import c from "./FourthStep.module.css";

export const FourthStep = ({ data, onDataChange }: StepProps) => {
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
          />{" "}
          €
        </label>
      </div>

      <div className={c.inputContainer}>
        <h3>Unesi slobodne periode</h3>
      </div>
    </div>
  );
};
