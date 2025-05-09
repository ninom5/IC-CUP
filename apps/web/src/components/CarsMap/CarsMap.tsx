import { SplitLocation } from "@constants/lnglat";
import {
  Map,
  MapCameraChangedEvent,
  InfoWindow,
  AdvancedMarker,
} from "@vis.gl/react-google-maps";
import { useFetchAllVehicles } from "@api/index";
import { VehicleType } from "types";
import { useState } from "react";

import "./carsMap.css";
import { Link } from "react-router-dom";
import { routes } from "@routes/routes";
export const CarsMap = () => {
  const { data, isLoading, error } = useFetchAllVehicles();
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleType | null>(
    null
  );

  const filteredVehicles = Array.isArray(data)
    ? data.filter((vehicle) => vehicle.isAvailable && vehicle.isVerified)
    : [];

  const handleMarkerClick = (
    e: google.maps.MapMouseEvent,
    vehicle: VehicleType
  ) => {
    setSelectedVehicle(vehicle);
  };

  return (
    <section className="map-wrapper">
      <div className="map-wrapper-inner">
        <Map
          defaultZoom={12}
          defaultCenter={{ lat: SplitLocation.lat, lng: SplitLocation.lng }}
          mapId={import.meta.env.VITE_APP_MAP_ID}
          mapTypeControl={false}
          fullscreenControl={false}
          streetViewControl={false}
          cameraControl={false}
        >
          {!isLoading &&
            filteredVehicles.map((vehicle) => (
              <AdvancedMarker
                key={vehicle.id}
                position={{
                  lat: vehicle.location.latitude,
                  lng: vehicle.location.longitude,
                }}
                onClick={(e) => handleMarkerClick(e, vehicle)}
              />
            ))}

          {selectedVehicle && (
            <InfoWindow
              position={{
                lat: selectedVehicle.location.latitude,
                lng: selectedVehicle.location.longitude,
              }}
              onClose={() => setSelectedVehicle(null)}
              className="info-window"
            >
              <div className="info-window-vehicle-info">
                <h3>
                  {selectedVehicle.brand} {selectedVehicle.model}
                </h3>
                <p>{selectedVehicle.description}</p>
                <p>
                  Daily price: <b>{selectedVehicle.dailyPrice}</b>
                  <br />
                  Rating:
                </p>
                <Link to={`/car/${selectedVehicle.id}`}>See more details</Link>
              </div>
            </InfoWindow>
          )}
        </Map>
      </div>
    </section>
  );
};
