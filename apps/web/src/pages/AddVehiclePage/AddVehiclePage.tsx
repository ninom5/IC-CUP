import { useState } from "react";
import c from "./AddVehiclePage.module.css";
import { AddVehicleForm } from "@components/index";

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

      <AddVehicleForm />

      {formStep < 4 ? (
        <button onClick={handleNextStep}>NEXT</button>
      ) : (
        <button>SUBMIT</button>
      )}
    </section>
  );
};
