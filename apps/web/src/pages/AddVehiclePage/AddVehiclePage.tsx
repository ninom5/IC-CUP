import { JSX, useState } from "react";
import c from "./AddVehiclePage.module.css";
import {
  FirstStep,
  FourthStep,
  SecondStep,
  ThirdStep,
} from "@components/index";

enum CarCategory {
  SMALL = "SMALL",
  MEDIUM = "MEDIUM",
  SUV = "SUV",
  VAN = "VAN",
  LUXURY = "LUXURY",
}

enum FuelType {
  PETROL = "PETROL",
  DIESEL = "DIESEL",
  ELECTRIC = "ELECTRIC",
  HYBRID = "HYBRID",
}

type VehicleData = {
  registration?: string;
  registrationExpiry?: string;
  category?: CarCategory;
  brand?: string;
  model?: string;
  year?: number;
  seats?: number;
  fuelType?: FuelType;
  transmission?: "manualni" | "automatik";
  features?: string[];
  images?: File[];
  price?: number;
};

export const AddVehiclePage = () => {
  const [formStep, setFormStep] = useState(1);
  const [vehicleData, setVehicleData] = useState({});

  const handleNextStep = () => {
    setFormStep((prevStep) => prevStep + 1);
  };

  const steps: Record<number, JSX.Element> = {
    1: <FirstStep />,
    2: <SecondStep />,
    3: <ThirdStep />,
    4: <FourthStep />,
  };

  return (
    <section>
      <h1>List your car</h1>

      <div className={c.formSteps}>
        <div className={c.formStepBar}>
          <div style={{ width: `${formStep * 25}%` }}></div>
        </div>
        <p>{formStep} / 4</p>
      </div>

      {steps[formStep]}

      {formStep < 4 ? (
        <button onClick={handleNextStep}>NEXT</button>
      ) : (
        <button>SUBMIT</button>
      )}
    </section>
  );
};
