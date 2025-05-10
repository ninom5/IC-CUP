import c from "./SecondStep.module.css";

enum FuelType {
  PETROL = "PETROL",
  DIESEL = "DIESEL",
  ELECTRIC = "ELECTRIC",
  HYBRID = "HYBRID",
}

export const SecondStep = () => {
  return (
    <div className={c.form}>
      <div>
        <div className={c.formInputContainer}>
          <h3>Broj sjedala</h3>
          <select>
            <option value={2}>2</option>
            <option value={4}>4</option>
            <option value={6}>6</option>
          </select>
        </div>

        <div>
          <h3>Gorivo</h3>
          <select>
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
            <input type="radio" name="mjenjac" />
            manualni
          </label>
          <label>
            <input type="radio" name="mjenjac" />
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
