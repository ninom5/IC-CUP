import { StepProps } from "../../../types";

export const FourthStep = ({ data, onDataChange }: StepProps) => {
  return (
    <div>
      <label>
        Cijena po danu:{" "}
        <input
          type="number"
          min="1"
          step="1"
          value={data.dailyPrice}
          onChange={(e) => onDataChange({ dailyPrice: Number(e.target.value) })}
        />{" "}
        €
      </label>

      <label>
        Opis vozila:{" "}
        <textarea
          value={data.description}
          onChange={(e) => onDataChange({ description: e.target.value })}
          rows={4}
        />
      </label>
    </div>
  );
};
