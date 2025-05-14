import c from "./VehicleLicenseImgEdit.module.css";
import checkmarkIcon from "../../assets/images/checkmarkIcon.svg";
import xIcon from "../../assets/images/xIcon.svg";
import { useRef, useState } from "react";
import { VehicleData } from "../../types/index";

export const VehicleLicenseImgEdit = ({
  handleUpdateVehicle,
}: {
  handleUpdateVehicle: (data: Partial<VehicleData>) => void;
}) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleQuitUpdate = () => {
    setImageFile(null);

    if (inputFileRef.current) {
      inputFileRef.current.value = "";
    }
  };

  const handleSave = () => {
    handleUpdateVehicle({ vehicleLicenseImg: imageFile });
    setImageFile(null);

    if (inputFileRef.current) {
      inputFileRef.current.value = "";
    }
  };

  return (
    <div className={c.inputContainer}>
      <h3>
        Slika prometne dozvole{" "}
        {imageFile && (
          <img src={xIcon} alt="x icon" onClick={handleQuitUpdate} />
        )}
      </h3>

      <img src={checkmarkIcon} alt="checkmark" />

      {imageFile && <p>{imageFile.name}</p>}

      <div>
        <div className={c.buttonsContainer}>
          <button
            className={c.fileInput}
            onClick={() => inputFileRef.current?.click()}
          >
            Promijeni
          </button>
          {imageFile && (
            <button className={c.fileInput} onClick={handleSave}>
              Spremi
            </button>
          )}
        </div>

        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          ref={inputFileRef}
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};
