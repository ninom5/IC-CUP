import { JSX, useState } from "react";
import c from "./AddVehiclePage.module.css";
import {
  FirstStep,
  FourthStep,
  SecondStep,
  ThirdStep,
} from "@components/index";
import { VehicleData } from "../../types";
import { CarCategory, FuelType, VehicleType } from "enums";

export const AddVehiclePage = () => {
  const [formStep, setFormStep] = useState(1);
  const [vehicleData, setVehicleData] = useState<VehicleData>({
    brand: "",
    model: "",
    images: [],
    productionYear: 0,
    dailyPrice: 0,
    description: "",
    registration: "",
    registrationExpiration: "",
    pickupAddress: "",
    city: "",
    longitude: 0,
    latitude: 0,
    vehicleType: VehicleType.CAR,
    details: {
      licensePlate: "",
      fuelType: FuelType.PETROL,
      isAutomatic: false,
      category: CarCategory.SMALL,
      numOfSeats: 4,
    },
  });

  const handleDataChange = (newData: Partial<VehicleData>) => {
    setVehicleData((prev) => ({ ...prev, ...newData }));
  };

  const handleSubmit = () => {
    console.log("Submitting data:", vehicleData);
    // Ovdje dodaj API poziv
  };

  const handleNextStep = () => {
    if (formStep < 4) setFormStep((prevStep) => prevStep + 1);
  };

  const steps: Record<number, JSX.Element> = {
    1: <FirstStep data={vehicleData} onDataChange={handleDataChange} />,
    2: <SecondStep data={vehicleData} onDataChange={handleDataChange} />,
    3: <ThirdStep data={vehicleData} onDataChange={handleDataChange} />,
    4: <FourthStep data={vehicleData} onDataChange={handleDataChange} />,
  };

  console.log("Vehicle data:", vehicleData);

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
        <button onClick={handleSubmit}>SUBMIT</button>
      )}
      {formStep > 1 && (
        <button onClick={() => setFormStep((prev) => prev - 1)}>BACK</button>
      )}
    </section>
  );
};
