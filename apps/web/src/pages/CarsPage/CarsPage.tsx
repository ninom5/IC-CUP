import { VehicleList, CarsMap } from "@components/index";
import { APIProvider } from "@vis.gl/react-google-maps";
import { toast } from "react-toastify";
import "./carsPage.css";

export const CarsPage = () => {
  return (
    <section className="cars-page">
      <VehicleList />

      <APIProvider
        apiKey={import.meta.env.VITE_APP_MAPS_API}
        onLoad={() => console.log("Successfully loded map")}
        onError={(error: Error | any) => {
          console.error(`Error loading map: ${error}`);
          toast.error(`Error loading map: ${error?.message}`);
        }}
      >
        <CarsMap />
      </APIProvider>
    </section>
  );
};
