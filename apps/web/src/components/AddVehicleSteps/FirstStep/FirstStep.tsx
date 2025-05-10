import c from "./FirstStep.module.css";

enum CarCategory {
  SMALL = "SMALL",
  MEDIUM = "MEDIUM",
  SUV = "SUV",
  VAN = "VAN",
  LUXURY = "LUXURY",
}

const getMinDate = () => {
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 30);
  return minDate.toISOString().split("T")[0];
};

export const FirstStep = () => {
  return (
    <div className={c.form}>
      <div className="modelBrandContainer">
        <div className="formInputContainer">
          <h3>Registracija</h3>
          <input type="text" placeholder="Registracija..." />
        </div>
        <div className="formInputContainer">
          <h3>Istek Registracija</h3>
          <input type="date" min={getMinDate()} />
        </div>
      </div>

      <div className="formInputContainer">
        <h3>Slika prometne</h3>
        <input type="file" />
      </div>

      <div>
        <h3>Kategorija</h3>
        <select>
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
          <input type="text" placeholder="Marka..." />
        </div>

        <div className="formInputContainer">
          <h3>Model</h3>
          <input type="text" placeholder="Model..." />
        </div>
      </div>

      <div className="formInputContainer">
        <h3>Godina</h3>
        <input type="number" placeholder="Godina..." />
      </div>
    </div>
  );
};
