import interiorMirror from "../../assets/images/interiorMirror.svg";
import c from "./UserVehicles.module.css";

export const UserVehicles = () => {
  return (
    <section className={c.userVehiclesSection}>
      <h1>Nisi još dodao svoje vozilo!</h1>

      <div className={c.callToActionContainer}>
        <img src={interiorMirror} />
        <button>Dodaj vozilo</button>
      </div>
    </section>
  );
};
