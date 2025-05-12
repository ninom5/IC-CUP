import { MapContext } from "context/Map/MapContext";
import { FC, PropsWithChildren, useState } from "react";

export const MapProvider: FC<PropsWithChildren> = ({ children }) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [searchLocation, setSearchLocation] =
    useState<google.maps.LatLng | null>(null);

  const goToLocation = (location: google.maps.LatLng, zoom: number = 12) => {
    if (map) {
      map.setCenter(location);
      map.setZoom(zoom);
    }
  };

  return (
    <MapContext.Provider
      value={{ setMap, goToLocation, searchLocation, setSearchLocation }}
    >
      {children}
    </MapContext.Provider>
  );
};
