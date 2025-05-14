import c from "./VehicleDescriptionEdit.module.css";
import pencilIcon from "../../assets/images/pencilIcon.svg";
import xIcon from "../../assets/images/xIcon.svg";
import { useState } from "react";
import { VehicleData } from "../../types/index";

export const VehicleDescriptionEdit = ({
  description,
  handleUpdateVehicle,
}: {
  description: string;
  handleUpdateVehicle: (data: Partial<VehicleData>) => void;
}) => {
  const [textareaValue, setTextareaValue] = useState<string>(description);

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(e.target.value);
  };

  const handleSave = () => {
    setIsEditing(false);
    handleUpdateVehicle({ description: textareaValue });
  };

  const handleToggleEdit = () => {
    if (isEditing) {
      setTextareaValue(description);
    }
    setIsEditing((prev) => !prev);
  };

  return (
    <div className={c.descriptionContainer}>
      <h3>
        Opis{" "}
        <img
          src={isEditing ? xIcon : pencilIcon}
          className={c.pencilIcon}
          onClick={handleToggleEdit}
        />
      </h3>
      {isEditing ? (
        <textarea
          value={isEditing ? textareaValue : description}
          onChange={handleChange}
        ></textarea>
      ) : (
        <p>{description ? description : "Nema opisa"}</p>
      )}

      {isEditing && <button onClick={handleSave}>Spremi promjene</button>}
    </div>
  );
};
