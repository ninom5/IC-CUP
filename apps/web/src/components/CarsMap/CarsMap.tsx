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

//provjerit clusterer jel radi dobro

export const CarsMap = () => {
  const { data, isLoading, error } = useFetchAllVehicles();
  const map = useMap();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const clusterer = useRef<MarkerClusterer | null>(null);
  const markers = useRef<Marker[]>([]);

  useEffect(() => {
    if (!map || !window.google || !containerRef.current) return;

    const autoComplete = new google.maps.places.PlaceAutocompleteElement({});
    autoComplete.id = "place-autocomplete-input";
    containerRef.current.appendChild(autoComplete);

    map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(
      containerRef.current
    );

    autoComplete.addEventListener("gmpx-place-select", async (event: any) => {
      const prediction = event?.prediction;
      if (!prediction) return;

      const place = prediction.toPlace();
      await place.fetchFields({
        fields: ["geometry", "formattedAddress", "location", "viewport"],
      });

      if (!place.location) return;

      if (place.viewport) {
        map.fitBounds(place.viewport);
      } else {
        map.setCenter(place.location);
        map.setZoom(14);
      }
    });
  }, [map]);

  const [selectedVehicle, setSelectedVehicle] = useState<VehicleType | null>(
    null
  );

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

  const filteredVehicles = Array.isArray(data)
    ? data.filter((vehicle) => vehicle.isAvailable && vehicle.isVerified)
    : [];

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

  return (
    <section className="map-wrapper">
      <div className="map-wrapper-inner">
        <div
          ref={containerRef}
          className="map-search"
          style={{
            position: "absolute",
            top: 20,
            left: 20,
            zIndex: 10,
            backgroundColor: "white",
            borderRadius: "4px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
          }}
        />
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
              >
                <div className="custom-marker">{vehicle.dailyPrice}</div>
              </AdvancedMarker>
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
