import { useFetchAllVehicles } from "@api/index";
import { VehicleCard } from "@components/index";
import { VehicleType } from "types/vehicleType";
import { useEffect, useState } from "react";
import "./vehicleList.css";
import { toast } from "react-toastify";

export const VehicleList = () => {
  const { data, error, isLoading } = useFetchAllVehicles();
  const [filteredData, setFilteredData] = useState<VehicleType[]>([]);

  if (error) return <div>{error.message}</div>;

  useEffect(() => {
    if (!data) {
      toast.error("No data available");
      return;
    }

    setFilteredData(data.filter((v) => v.isAvailable && v.isVerified));
  }, [data]);

  return (
    <section>
      {isLoading && <div>loading...</div>}
      {(!filteredData || filteredData.length === 0) && (
        <div>No vehicles available</div>
      )}

      {filteredData.map((vehicle) => {
        console.log(vehicle);

        return <VehicleCard vehicle={vehicle} />;
      })}
    </section>
  );
};
