import { CustomPriceMarker } from "@components/index";
import { AdvancedMarker } from "@vis.gl/react-google-maps";
import { VehicleType } from "@types/vehicle.type";

export const VehicleMarkers = ({
  data,
  onMarkerClick,
}: {
  data: VehicleType[];
  onMarkerClick: (e: google.maps.MapMouseEvent, vehicle: VehicleType) => void;
}) => {
  return (
    <>
      {data.map((v) => (
        <AdvancedMarker
          key={v.id}
          position={{ lat: v.latitude, lng: v.longitude }}
          onClick={(e) => onMarkerClick(e, v)}
        >
          <CustomPriceMarker price={v.dailyPrice} />
        </AdvancedMarker>
      ))}
    </>
  );
};
