import {
  InsuranceList,
  VehicleDescription,
  VehicleGallery,
} from "@components/index";
import { VehicleType } from "types/vehicle.type";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetchVehicleById } from "@api/index";
import "./VehiclePage.css";

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

  return (
    <section className="vehicle-page">
      <VehicleGallery vehicle={vehicle} />

      <section className="about-vehicle">
        <VehicleDescription vehicle={vehicle} />

        <div>
          <InsuranceList />

          <div className="pre-checkout">
            <h1>
              <span>CIJENA</span>
              <span>{vehicle.dailyPrice} €</span>
            </h1>

            <button>Nastavi</button>
          </div>
        </div>
      </section>
    </section>
  );
};
