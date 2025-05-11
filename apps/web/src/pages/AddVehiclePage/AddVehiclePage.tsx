import { JSX, useState } from "react";
import c from "./AddVehiclePage.module.css";
import {
  FirstStep,
  FourthStep,
  SecondStep,
  ThirdStep,
} from "@components/index";
import { useFetchAllVehicles } from "@api/useFetchAllVehicles";

export const AddVehiclePage = () => {
  const [formStep, setFormStep] = useState(1);
  const { data } = useFetchAllVehicles();

  const handleNextStep = () => {
    setFormStep((prevStep) => prevStep + 1);
  };

  const steps: Record<number, JSX.Element> = {
    1: <FirstStep />,
    2: <SecondStep />,
    3: <ThirdStep />,
    4: <FourthStep />,
  };

  console.log("Data from API:", data);

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
