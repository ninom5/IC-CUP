import { InfoWindow } from "@vis.gl/react-google-maps";
import { Link } from "react-router-dom";
import { VehicleType } from "types/vehicle.type";
import "./vehcileInfoWindow.css";
import { getAverageVehicleRating } from "@utils/getAverageVehicleRating.util";

export const VehicleInfoWindow = ({
  vehicle,
  onClose,
}: {
  vehicle: VehicleType;
  onClose: () => void;
}) => {
  const { totalRating, numberOfRatings } = getAverageVehicleRating(vehicle);

  return (
    <InfoWindow
      position={{
        lat: vehicle.latitude,
        lng: vehicle.longitude,
      }}
      onClose={onClose}
      className="info-window"
    >
      <div className="info-window-vehicle-info">
        <h3>
          {vehicle.brand} {vehicle.model}
        </h3>
        <p>{vehicle.description}</p>
        <p>
          Dnevna cijena: <b>{vehicle.dailyPrice}</b>
          <br />
          Ocjena: &nbsp;
          {totalRating > 0 ? (
            <>
              {totalRating / numberOfRatings} ({numberOfRatings})
            </>
          ) : (
            "još nema recenzija za ovo vozilo"
          )}
        </p>
        <Link to={`/vehicle/${vehicle.id}`}>Provjeri detalje</Link>
      </div>
    </InfoWindow>
  );
};
