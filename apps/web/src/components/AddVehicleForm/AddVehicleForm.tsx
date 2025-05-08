import c from "./AddVehicleForm.module.css";

enum CarCategory {
  SMALL = "SMALL",
  MEDIUM = "MEDIUM",
  SUV = "SUV",
  VAN = "VAN",
  LUXURY = "LUXURY",
}

export const AddVehicleForm = () => {
  return (
    <div className={c.form}>
      <div className={c.formInputContainer}>
        <h3>Registracija</h3>
        <input type="text" placeholder="Registracija..." />
      </div>

      <div className={c.formInputContainer}>
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

      <div className={c.modelBrandContainer}>
        <div className={c.formInputContainer}>
          <h3>Marka</h3>
          <input type="text" placeholder="Marka..." />
        </div>

        <div className={c.formInputContainer}>
          <h3>Model</h3>
          <input type="text" placeholder="Model..." />
        </div>
      </div>

      <div className={c.formInputContainer}>
        <h3>Godina</h3>
        <input type="number" placeholder="Godina..." />
      </div>
    </div>
  );
};
