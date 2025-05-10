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

//provjerit clusterer jel radi dobro

export const CarsMap = () => {
  const { data, isLoading, error } = useFetchAllVehicles();
  const map = useMap();
  const clusterer = useRef<MarkerClusterer | null>(null);
  const markers = useRef<Marker[]>([]);
  const [searchLocation, setSearchLocation] =
    useState<google.maps.LatLng | null>(null);

  useEffect(() => {
    if (!map || !window.google) return;

    const geocoder = new google.maps.Geocoder();

    const input = document.getElementById(
      "autocomplete-input"
    ) as HTMLInputElement;
    if (!input) return;

    const autocomplete = new google.maps.places.Autocomplete(input, {
      fields: ["geometry", "name"],
      types: ["geocode"],
    });

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      console.log("Selected place:", place);

      if (!place.geometry || !place.geometry.location) {
        toast.error("No geometry found for selected place.");
        setSearchLocation(null);
        return;
      }

      geocoder.geocode(
        { location: place.geometry.location },
        (results, status) => {
          if (
            status === google.maps.GeocoderStatus.OK &&
            results &&
            results[0]
          ) {
            const addressComponents = results[0].address_components;
            console.log(addressComponents);
          }
        }
      );

      map.setCenter(place.geometry.location);
      map.setZoom(12);
      setSearchLocation(place.geometry.location);
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
        <AutoCompleteInput />
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
