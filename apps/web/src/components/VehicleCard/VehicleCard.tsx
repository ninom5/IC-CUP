import { VehicleType } from "types/vehicleType";
import "./vehicleCard.css";

export const VehicleCard = ({ vehicle }: { vehicle: VehicleType }) => {
  return (
    <section className="vehicle-card">
      <div className="vehicle-image-wrapper">
        <img
          src={vehicle.images[0]}
          alt="vehicle main image"
          className="vehicle-image"
        />
      </div>
      <div className="vehicle-info">
        <h2>
          {vehicle.brand} {vehicle.model}
        </h2>
        <p>
          {/*ovde ide rating*/} &#9733; {/*broj recenzija*/}
        </p>
        <b>{vehicle.dailyPrice}</b> / per day
      </div>
    </section>
  );
};
