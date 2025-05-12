import { VehicleType } from "types/vehicleType";
import "./vehicleCard.css";
import { useNavigate } from "react-router-dom";

export const VehicleCard = ({ vehicle }: { vehicle: VehicleType }) => {
  const navigate = useNavigate();
  return (
    <section
      className="vehicle-card"
      onClick={() => navigate(`vehicle/${vehicle.id}`)}
    >
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
        <p>
          <b>{vehicle.dailyPrice}</b> / per day po danu
        </p>
      </div>
    </section>
  );
};
