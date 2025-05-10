import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Map,
  InfoWindow,
  AdvancedMarker,
  useMap,
} from "@vis.gl/react-google-maps";
import { Marker, MarkerClusterer } from "@googlemaps/markerclusterer";
import { useFetchAllVehicles } from "@api/index";
import { VehicleType } from "types";
import { SplitLocation } from "@constants/index";
import { toast } from "react-toastify";
import "./carsMap.css";
import { AutoCompleteInput } from "@components/AutoCompleteInput/AutoCompleteInput";
import { CustomPriceMarker } from "@components/CustomPriceMarker/CustomPriceMarker";

export const CarsMap = () => {
  const { data, isLoading } = useFetchAllVehicles();
  const map = useMap();
  const clusterer = useRef<MarkerClusterer | null>(null);
  const markers = useRef<Marker[]>([]);
  const [searchLocation, setSearchLocation] =
    useState<google.maps.LatLng | null>(null);

  const [selectedVehicle, setSelectedVehicle] = useState<VehicleType | null>(
    null
  );

  const handlePlaceResolved = (place: google.maps.places.PlaceResult) => {
    if (!place.geometry?.location) {
      toast.error("No location found for selected place");
      return;
    }
    const location = place.geometry.location;
    setSearchLocation(location);
    map?.setCenter(location);
    map?.setZoom(12);
  };

  useEffect(() => {
    if (map && !clusterer.current) {
      clusterer.current = new MarkerClusterer({
        map,
        markers: markers.current,
      });
    }

    return () => {
      if (clusterer.current) {
        clusterer.current.clearMarkers();
        clusterer.current = null;
      }
    };
  });

  const handleMarkerClick = (
    e: google.maps.MapMouseEvent,
    vehicle: VehicleType
  ) => {
    setSelectedVehicle(vehicle);

    if (!e.latLng) {
      toast.error("Can't get lat & lng of vehicle");
      return;
    }

    map?.setZoom(14);
    map?.panTo({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
  };

  const filteredVehicles = Array.isArray(data)
    ? data?.filter((v) => v.isAvailable && v.isVerified)
    : [];

  return (
    <section className="map-wrapper">
      <div className="map-wrapper-inner">
        <AutoCompleteInput onPlaceResolved={handlePlaceResolved} />
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
                  lat: vehicle.latitude,
                  lng: vehicle.longitude,
                }}
                onClick={(e) => handleMarkerClick(e, vehicle)}
              >
                <CustomPriceMarker price={vehicle.dailyPrice} />
              </AdvancedMarker>
            ))}

          {searchLocation && (
            <AdvancedMarker
              position={{
                lat: searchLocation.lat(),
                lng: searchLocation.lng(),
              }}
            />
          )}

          {selectedVehicle && (
            <InfoWindow
              position={{
                lat: selectedVehicle.latitude,
                lng: selectedVehicle.longitude,
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
                  Daily price:/Dnevna cijena:{" "}
                  <b>{selectedVehicle.dailyPrice}</b>
                  <br />
                  Rating:/Ocjena:
                </p>
                <Link to={`/car/${selectedVehicle.id}`}>
                  See more details/Provjeri detalje
                </Link>
              </div>
            </InfoWindow>
          )}
        </Map>
      </div>
    </section>
  );
};
