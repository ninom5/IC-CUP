import { useFetchAllVehicles } from "@api/index";
import { VehicleCard } from "@components/index";
import { VehicleType } from "types/vehicleType";
import { useEffect, useState } from "react";
import "./vehicleList.css";

export const VehicleList = () => {
  const { data, error, isLoading } = useFetchAllVehicles();
  const [filteredData, setFilteredData] = useState<VehicleType[]>([]);

  useEffect(() => {
    setFilteredData(
      Array.isArray(data)
        ? data.filter((v) => v.isAvailable && v.isVerified)
        : []
    );
  }, [data]);

  if (error) return <div>{error.message}</div>;

  return (
    <section>
      {isLoading && <div>loading...</div>}
      {(!filteredData || filteredData.length === 0) && (
        <div>No vehicles available</div>
      )}

      {filteredData.map((vehicle) => {
        return <VehicleCard key={vehicle.id} vehicle={vehicle} />;
      })}
    </section>
  );
};
