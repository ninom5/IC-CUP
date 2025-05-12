import { VehicleList, VehiclesMap } from "@components/index";
import "./vehiclesPage.css";

export const VehiclesPage = () => {
  return (
    <section className="vehicles-page">
      <VehicleList />
      <VehiclesMap />
    </section>
  );
};
