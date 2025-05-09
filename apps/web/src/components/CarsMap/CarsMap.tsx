import { SplitLocation } from "@constants/lnglat";
import { Map, MapCameraChangedEvent } from "@vis.gl/react-google-maps";
import "./carsMap.css";

export const CarsMap = () => {
  return (
    <section className="map-wrapper">
      <Map
        defaultZoom={10}
        defaultCenter={{ lat: SplitLocation.lat, lng: SplitLocation.lng }}
        mapId={import.meta.env.VITE_APP_MAP_ID}
        mapTypeControl={false}
        fullscreenControl={false} //mozemo ukljucit pa ka da se prikaze na vecem ekranu
        streetViewControl={false}
      />
    </section>
  );
};
