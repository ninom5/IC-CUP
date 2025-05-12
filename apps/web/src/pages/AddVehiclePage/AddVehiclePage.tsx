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
import { toast } from "react-toastify";
import { useCreateVehicle } from "@api/useCreateVehicle";
import { extractUserInfo } from "@utils/extractUserInfo.util";

export const AddVehiclePage = () => {
  const userData = extractUserInfo();

  const [formStep, setFormStep] = useState(1);
  const [vehicleData, setVehicleData] = useState<VehicleData>({
    ownerId: "a825bd08-2605-4166-9a19-32d373c63b26",
    brand: "",
    model: "",
    images: [],
    productionYear: 2025,
    dailyPrice: 40.0,
    description: "",
    vehicleLicenseImg: null,
    registration: "",
    registrationExpiration: "",
    pickupAddress: "bla",
    city: "bla",
    longitude: 0,
    latitude: 0,
    vehicleType: VehicleType.CAR,
    details: {
      fuelType: FuelType.PETROL,
      isAutomatic: false,
      category: CarCategory.SEDAN,
      numOfSeats: 5,
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

  const createVehicleMutation = useCreateVehicle();

  const canProceedToNextStep = (): boolean => {
    if (formStep === 1) {
      const {
        registration,
        registrationExpiration,
        vehicleLicenseImg,
        brand,
        model,
      } = vehicleData;
      if (
        !registration ||
        !registrationExpiration ||
        !vehicleLicenseImg ||
        !brand ||
        !model
      ) {
        toast.error("Molimo popunite sve podatke u 1. koraku.");
        return false;
      }
    }

    if (formStep === 3) {
      if (vehicleData.images.length !== 5) {
        toast.error("Morate dodati točno 5 slika vozila.");
        return false;
      }
    }

    if (formStep === 4) {
      if (vehicleData.dailyPrice <= 0) {
        toast.error("Cijena po danu mora biti veca od 0.");
        return false;
      }
    }

    return true;
  };

  const handleDataChange = (newData: Partial<VehicleData>) => {
    setVehicleData((prev) => ({ ...prev, ...newData }));
  };

  const handleSubmit = () => {
    if (!canProceedToNextStep) return;
    createVehicleMutation.mutate(vehicleData);
  };

  const handleNextStep = () => {
    if (!canProceedToNextStep()) return;
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
          <button onClick={handleNextStep}>Nastavi</button>
        ) : (
          <button onClick={handleSubmit}>Završi</button>
        )}
        {formStep > 1 && (
          <button onClick={() => setFormStep((prev) => prev - 1)}>Nazad</button>
        )}
      </div>
    </section>
  );
};
