import { useState } from "react";
import c from "./AddVehiclePage.module.css";
import {
  FirstStep,
  FourthStep,
  SecondStep,
  ThirdStep,
} from "@components/index";

export const AddVehiclePage = () => {
  const [formStep, setFormStep] = useState(1);

  const handleNextStep = () => {
    setFormStep((prevStep) => prevStep + 1);
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

      {formStep === 1 && <FirstStep />}
      {formStep === 2 && <SecondStep />}
      {formStep === 3 && <ThirdStep />}
      {formStep === 4 && <FourthStep />}

      {formStep < 4 ? (
        <button onClick={handleNextStep}>NEXT</button>
      ) : (
        <button>SUBMIT</button>
      )}
    </section>
  );
};
