import { getMinDate } from "@utils/getMinDate.util";
import c from "./VehicleRegistrationEdit.module.css";
import pencilIcon from "../../assets/images/pencilIcon.svg";
import xIcon from "../../assets/images/xIcon.svg";
import { useState } from "react";
import { convertStringToDate } from "@utils/convertStringToDate.util";
import { VehicleData } from "../../types/index";

export const VehicleRegistrationEdit = ({
  registration,
  registrationExpiration,
  handleUpdateVehicle,
}: {
  registration: string;
  registrationExpiration: string;
  handleUpdateVehicle: (data: Partial<VehicleData>) => void;
}) => {
  const [inputsValues, setInputsValues] = useState({
    firstInputValue: registration,
    secondInputValue: registrationExpiration,
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleRegistrationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputsValues((prev) => ({
      ...prev,
      firstInputValue: e.target.value,
    }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputsValues((prev) => ({
      ...prev,
      secondInputValue: e.target.value,
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    handleUpdateVehicle({
      registration: inputsValues.firstInputValue,
      registrationExpiration: inputsValues.secondInputValue,
    });
  };

  const handleToggleEdit = () => {
    if (isEditing) {
      setInputsValues({
        firstInputValue: registration,
        secondInputValue: registrationExpiration,
      });
    }
    setIsEditing((prev) => !prev);
  };

  return (
    <div className={c.mainContainer}>
      <div className={c.registrationContainer}>
        <div className={c.inputContainer}>
          <h3>Registracija</h3>
          <input
            type="text"
            name="registration"
            placeholder="ST-1234-AB"
            value={isEditing ? inputsValues.firstInputValue : registration}
            disabled={!isEditing}
            onChange={handleRegistrationChange}
          />
        </div>

        <div className={c.inputContainer}>
          <h3>Datum isteka</h3>
          <input
            type="date"
            name="registrationExpiration"
            min={getMinDate(30)}
            max={getMinDate(365)}
            value={
              isEditing
                ? convertStringToDate(inputsValues.secondInputValue)
                : convertStringToDate(registrationExpiration)
            }
            disabled={!isEditing}
            onChange={handleDateChange}
          />
        </div>

        <img
          src={isEditing ? xIcon : pencilIcon}
          className={c.pencilIcon}
          onClick={handleToggleEdit}
        />
      </div>

      {isEditing && <button onClick={handleSave}>Spremi promjene</button>}
    </div>
  );
};
