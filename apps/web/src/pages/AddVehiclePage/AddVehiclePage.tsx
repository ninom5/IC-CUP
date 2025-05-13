import { JSX, useState } from "react";
import c from "./AddVehiclePage.module.css";
import {
  FirstStep,
  FourthStep,
  SecondStep,
  ThirdStep,
} from "@components/index";
import { VehicleData } from "../../types";
import { toast } from "react-toastify";
import { useCreateVehicle } from "@api/useCreateVehicle";
import { extractUserInfo } from "@utils/extractUserInfo.util";
import { isRegistrationValid } from "@utils/isRegistrationValid.util";
import { CarCategoryEnum, FuelTypeEnum, VehicleEnum } from "enums";
import xIcon from "../../assets/images/xIcon.svg";
import { useNavigate } from "react-router-dom";

export const AddVehiclePage = () => {
  const userData = extractUserInfo();
  const navigate = useNavigate();

  const [formStep, setFormStep] = useState(1);
  const [vehicleData, setVehicleData] = useState<VehicleData>({
    ownerId: userData.data.id,
    brand: "",
    model: "",
    images: [],
    productionYear: 2025,
    dailyPrice: 40.0,
    description: "",
    vehicleLicenseImg: null,
    registration: "",
    registrationExpiration: "",
    pickupAddress: "",
    city: "",
    longitude: 0,
    latitude: 0,
    vehicleType: VehicleEnum.CAR,
    details: {
      fuelType: FuelTypeEnum.PETROL,
      isAutomatic: false,
      category: CarCategoryEnum.SEDAN,
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

  const createVehicleMutation = useCreateVehicle(navigate);

  const canProceedToNextStep = (): boolean => {
    if (formStep === 1) {
      const {
        registration,
        registrationExpiration,
        vehicleLicenseImg,
        brand,
        model,
        productionYear,
      } = vehicleData;
      if (
        !isRegistrationValid(vehicleData.registration) ||
        !registration ||
        !registrationExpiration ||
        !vehicleLicenseImg ||
        !brand ||
        !model ||
        productionYear > new Date().getFullYear()
      ) {
        toast.error("Molimo popunite točno sve podatke u 1. koraku.");
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
        toast.error("Cijena po danu mora biti veća od 0.");
        return false;
      }
      if (!vehicleData.pickupAddress || !vehicleData.city) {
        toast.error("Molimo odaberite validnu lokaciju preuzimanja vozila.");
        return false;
      }
    }

    return true;
  };

  const handleDataChange = (newData: Partial<VehicleData>) => {
    setVehicleData((prev) => ({ ...prev, ...newData }));
  };

  const handleSubmit = () => {
    if (!canProceedToNextStep()) return;
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

  return (
    <section className={c.addVehiclePageSection}>
      <div>
        <div className={c.header}>
          <h1>
            Dodaj kola{" "}
            <img src={xIcon} onClick={() => navigate("/user/vehicle")} />
          </h1>

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
            <button
              onClick={handleSubmit}
              disabled={createVehicleMutation.isPending}
            >
              {createVehicleMutation.isPending ? "Spremanje..." : "Završi"}
            </button>
          )}
          {formStep > 1 && (
            <button
              onClick={() => setFormStep((prev) => prev - 1)}
              disabled={createVehicleMutation.isPending}
            >
              Nazad
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
