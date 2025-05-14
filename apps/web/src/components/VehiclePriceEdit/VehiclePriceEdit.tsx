import c from "./VehiclePriceEdit.module.css";
import pencilIcon from "../../assets/images/pencilIcon.svg";
import xIcon from "../../assets/images/xIcon.svg";
import { useState } from "react";
import { VehicleData } from "../../types/index";

export const VehiclePriceEdit = ({
  dailyPrice,
  handleUpdateVehicle,
}: {
  dailyPrice: number;
  handleUpdateVehicle: (data: Partial<VehicleData>) => void;
}) => {
  const [inputValue, setInputValue] = useState<number>(dailyPrice);

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(Number(e.target.value));
  };

  const handleSave = () => {
    setIsEditing(false);
    handleUpdateVehicle({ dailyPrice: inputValue });
  };

  const handleToggleEdit = () => {
    if (isEditing) {
      setInputValue(dailyPrice);
    }
    setIsEditing((prev) => !prev);
  };

  return (
    <div className={c.inputContainer}>
      <h3>
        Cijena / po danu{" "}
        <img
          src={isEditing ? xIcon : pencilIcon}
          className={c.pencilIcon}
          onClick={handleToggleEdit}
        />
      </h3>
      <label className={c.priceLabel}>
        <input
          type="number"
          name="dailyPrice"
          placeholder="40.00"
          value={isEditing ? inputValue : dailyPrice}
          disabled={!isEditing}
          onChange={handleChange}
        />{" "}
        €
      </label>

      {isEditing && <button onClick={handleSave}>Spremi promjene</button>}
    </div>
  );
};
