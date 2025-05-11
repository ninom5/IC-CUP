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
    productionYear: 2025,
    dailyPrice: 0,
    description: "",
    vehicleLicenseImg: null,
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
      category: CarCategory.SEDAN,
      numOfSeats: 4,
    },
    features: {
      airConditioning: false,
      usb: false,
      aux: false,
      bluetooth: false,
      sensors: false,
      pets: false,
      gps: false,
      childSeat: false,
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
    <section className={c.addVehiclePageSection}>
      <div className={c.header}>
        <h1>Dodaj kola</h1>

        <div className={c.formSteps}>
          <p>{formStep} / 4</p>

          <div className={c.formStepBar}>
            <div style={{ width: `${formStep * 25}%` }}></div>
          </div>
        </div>
      </div>

      {steps[formStep]}

      <div className={c.buttonContainer}>
        {formStep < 4 ? (
          <button onClick={handleNextStep}>NEXT</button>
        ) : (
          <button onClick={handleSubmit}>SUBMIT</button>
        )}
        {formStep > 1 && (
          <button onClick={() => setFormStep((prev) => prev - 1)}>BACK</button>
        )}
      </div>
    </section>
  );
};
