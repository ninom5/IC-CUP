import { InfoWindow } from "@vis.gl/react-google-maps";
import { Link } from "react-router-dom";
import { VehicleType } from "types/vehicleType";

export const VehicleInfoWindow = ({
  vehicle,
  onClose,
}: {
  vehicle: VehicleType;
  onClose: () => void;
}) => (
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
        Ocjena:
      </p>
      <Link to={`/car/${vehicle.id}`}>Provjeri detalje</Link>
    </div>
  </InfoWindow>
);
