import { createContext } from "react";

export interface MapContextType {
  setMap?: (map: google.maps.Map) => void;
  goToLocation: (location: google.maps.LatLng, zoom?: number) => void;
  searchLocation: google.maps.LatLng | null;
  setSearchLocation: (location: google.maps.LatLng) => void;
}

export const MapContext = createContext<MapContextType>({
  goToLocation: () => {},
  searchLocation: null,
  setSearchLocation: () => {},
});
