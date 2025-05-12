import { VehicleGallery } from "@components/index";
import { VehicleType } from "types/vehicle.type";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetchVehicleById } from "@api/index";

export const VehiclePage = () => {
  const { id } = useParams<{ id: string }>();
  const [vehicle, setVehicle] = useState<VehicleType | null>(null);

  if (!id) return;

  const { data, isLoading, error } = useFetchVehicleById(id);
  console.log(data);

  useEffect(() => {
    console.log(data);
    if (data) setVehicle(data);
  }, [data]);

  if (isLoading) return <div>Loading</div>;

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!vehicle) return <div>Problem with getting vehicle info</div>;

  return <VehicleGallery vehicleImages={vehicle?.images} />;
};
