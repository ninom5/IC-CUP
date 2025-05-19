import { useEffect, useRef, useState } from "react";
import { Map, AdvancedMarker, useMap } from "@vis.gl/react-google-maps";
import { Marker, MarkerClusterer } from "@googlemaps/markerclusterer";
import { VehicleMarkers, VehicleInfoWindow } from "@components/index";
import { useFetchAllVehicles } from "@api/index";
import { SplitLocation } from "@constants/index";
import { useMapContext } from "@hooks/index";
import { toast } from "react-toastify";
import { VehicleType } from "types";
import "./vehiclesMap.css";

export const VehiclesMap = () => {
  const { data, isLoading } = useFetchAllVehicles();
  const { searchLocation, setMap } = useMapContext();

  const [selectedVehicle, setSelectedVehicle] = useState<VehicleType | null>(
    null
  );

  const map = useMap();
  const clusterer = useRef<MarkerClusterer | null>(null);
  const markers = useRef<Marker[]>([]);

  useEffect(() => {
    if (map && setMap) setMap(map);
  }, [map, setMap]);

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
  }, [map]);

  const handleMarkerClick = (
    e: google.maps.MapMouseEvent,
    vehicle: VehicleType
  ) => {
    setSelectedVehicle(vehicle);

    if (!e.latLng) {
      toast.error(
        "Nije moguće dohvatiti geografsku širinu i duljinu odobrane lokacije"
      );
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
        <Map
          defaultZoom={12}
          defaultCenter={{ lat: SplitLocation.lat, lng: SplitLocation.lng }}
          mapId="83bc94c68d72a376"
          mapTypeControl={false}
          fullscreenControl={false}
          streetViewControl={false}
          cameraControl={false}
        >
          {!isLoading && data && (
            <VehicleMarkers data={data} onMarkerClick={handleMarkerClick} />
          )}

          {searchLocation && (
            <AdvancedMarker
              position={{
                lat: searchLocation.lat(),
                lng: searchLocation.lng(),
              }}
            />
          )}

          {selectedVehicle && (
            <VehicleInfoWindow
              vehicle={selectedVehicle}
              onClose={() => setSelectedVehicle(null)}
            />
          )}
        </Map>
      </div>
    </section>
  );
};
