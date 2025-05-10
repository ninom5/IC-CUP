import { MapContext } from "context";
import { useContext } from "react";

export const useMapContext = () => {
  const context = useContext(MapContext);

  if (!context) throw new Error("useMap must be used within a MapProvider");

  return context;
};
