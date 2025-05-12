import "./vehicleCard.css";
import { VehicleType } from "types/vehicle.type";
import { useNavigate } from "react-router-dom";
import { getAverageVehicleRating } from "@utils/getAverageVehicleRating.util";

export const VehicleCard = ({ vehicle }: { vehicle: VehicleType }) => {
  const navigate = useNavigate();

  const { totalRating, numberOfRatings } = getAverageVehicleRating(vehicle);
  return (
    <section
      className="vehicle-card"
      onClick={() => navigate(`/vehicle/${vehicle.id}`)}
    >
      <div className="vehicle-image-wrapper">
        <img
          src={vehicle.images?.[0]}
          alt="vehicle main image"
          className="vehicle-image"
        />
      </div>

      <div className="vehicle-info">
        <h2>
          {vehicle.brand} {vehicle.model} {vehicle.productionYear}
        </h2>

        <p className="rating-info">
          {numberOfRatings > 0 ? (
            <>
              {(totalRating / numberOfRatings).toFixed(1)} &#9733; (
              {numberOfRatings})
            </>
          ) : (
            "Još nema recenzija za ovo vozilo"
          )}
        </p>

        <p className="price">
          <span className="price-span">{vehicle.dailyPrice} €</span> / po danu
        </p>
      </div>
    </section>
  );
};
