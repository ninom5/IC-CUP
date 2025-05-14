import { VehicleType } from "types/vehicle.type";
import { useNavigate } from "react-router-dom";
import { getAverageVehicleRating } from "@utils/getAverageVehicleRating.util";
import c from "./vehicleCard.module.css";

type Props = {
  vehicle: VehicleType;
  variant?: "default" | "profile";
};

export const VehicleCard = ({ vehicle, variant = "default" }: Props) => {
  const isProfile = variant === "profile";
  const navigate = useNavigate();

  const { totalRating, numberOfRatings } = getAverageVehicleRating(vehicle);
  return (
    <section
      className={`${c.vehicleCard} ${isProfile ? c.profileCard : ""}`}
      onClick={() => navigate(`/vehicle/${vehicle.id}`)}
    >
      <div className={c.vehicleImageWrapper}>
        <img
          src={vehicle.images?.[0]}
          alt="vehicle main image"
          className={c.vehicleImage}
        />
      </div>

      <div className={c.vehicleInfo}>
        <h2>
          {vehicle.brand} {vehicle.model} {vehicle.productionYear}
        </h2>

        <p className={c.ratingInfo}>
          {numberOfRatings > 0 ? (
            <>
              {(totalRating / numberOfRatings).toFixed(1)} &#9733; (
              {numberOfRatings})
            </>
          ) : (
            "Još nema recenzija za ovo vozilo"
          )}
        </p>

        <p className={c.price}>
          <span className={c.priceSpan}>{vehicle.dailyPrice} €</span> / po danu
        </p>
      </div>
    </section>
  );
};
