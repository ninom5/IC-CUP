import { StepProps } from "../../../types";
import c from "./SecondStep.module.css";
import gearBoxIcon from "../../../assets/images/gearboxIcon.svg";
import seatIcon from "../../../assets/images/seatIcon.svg";
import fuelIcon from "../../../assets/images/fuelIcon.svg";
import {
  AuxIcon,
  BluetoothIcon,
  ChairIcon,
  PetsIcon,
  SensorsIcon,
  UsbIcon,
} from "@components/icons";
import { FuelTypeEnum } from "enums";

const featureList = [
  { key: "usb", label: "USB", Icon: UsbIcon },
  { key: "aux", label: "AUX", Icon: AuxIcon },
  { key: "bluetooth", label: "Bluetooth", Icon: BluetoothIcon },
  { key: "sensors", label: "Senzori", Icon: SensorsIcon },
  { key: "pets", label: "Ljubimci", Icon: PetsIcon },
  { key: "childSeat", label: "Dječja stolica", Icon: ChairIcon },
] as const;

export const SecondStep = ({ data, onDataChange }: StepProps) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "transmission") {
      onDataChange({
        details: {
          ...data.details,
          isAutomatic: value === "automatic",
        },
      });
    } else {
      onDataChange({
        details: {
          ...data.details,
          [name]: name === "numOfSeats" ? Number(value) : value,
        },
      });
    }
  };

  const handleFeature = (feature: keyof typeof data.features) => {
    onDataChange({
      features: {
        ...data.features,
        [feature]: !data.features[feature],
      },
    });
  };

  return (
    <div className={c.form}>
      <div className={c.inputsWrapper}>
        <div className={c.inputContainer}>
          <h3>Vrsta mjenjača</h3>
          <div>
            <img src={gearBoxIcon} alt="gearbox" />

            <select
              name="transmission"
              value={data.details.isAutomatic ? "automatic" : "manual"}
              onChange={handleChange}
            >
              <option value="automatic">Automatic</option>
              <option value="manual">Manual</option>
            </select>
          </div>
        </div>

        <div className={c.inputContainer}>
          <h3>Broj sjedala</h3>
          <div>
            <img src={seatIcon} alt="seats" />

            <select
              name="numOfSeats"
              value={data.details.numOfSeats}
              onChange={handleChange}
            >
              {[2, 5, 7].map((seats) => (
                <option key={seats} value={seats}>
                  {seats}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={c.inputContainer}>
          <h3>Vrsta goriva</h3>
          <div>
            <img src={fuelIcon} alt="fuel" />

            <select
              name="fuelType"
              value={data.details.fuelType}
              onChange={handleChange}
            >
              {Object.values(FuelTypeEnum).map((ft) => (
                <option key={ft} value={ft}>
                  {ft}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className={c.featuresContainer}>
        <h3>Dodatci</h3>
        <div className={c.featuresWrapper}>
          {featureList.map(({ key, label, Icon }) => (
            <div
              key={key}
              className={c.feature}
              onClick={() => handleFeature(key)}
            >
              <Icon color={data.features[key] ? "#222" : "#C0BEBE"} />
              <p style={{ color: data.features[key] ? "#222" : "#C0BEBE" }}>
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
