import { VehicleList, CarsMap } from "@components/index";
import { toast } from "react-toastify";
import "./vehiclesPage.css";
import { APIProvider } from "@vis.gl/react-google-maps";

export const VehiclesPage = () => {
  return (
    <section className="vehicles-page">
      <VehicleList />

      <APIProvider
        apiKey={import.meta.env.VITE_APP_MAPS_API}
        onLoad={() => console.log("Successfully loaded map")}
        onError={(error: Error | any) => {
          console.error(`Error loading map: ${error}`);
          toast.error(`Error loading map: ${error?.message}`);
        }}
        libraries={["places"]}
        version="beta"
      >
        <CarsMap />
      </APIProvider>
    </section>
  );
};
