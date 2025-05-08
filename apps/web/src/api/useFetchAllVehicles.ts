import { useEffect, useState } from "react";
import { axiosInstanceAPI } from "./base";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { VehicleType } from "types/vehicleType";

export const useFetchAllVehicles = () => {
  const axiosInstance = axiosInstanceAPI();
  const [data, setData] = useState<VehicleType[]>([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllVehicles = async () => {
      try {
        const response = await axiosInstance.get("/vehicles");
        if (response.status !== 200)
          throw new Error(`Error fetching all vehicles`);

        setData(response.data);
      } catch (error: AxiosError | Error | any) {
        toast.error(
          `Error getting all vehicles: ${error.response.data.message}`
        );
        console.error(`Error getting all vehicles: ${error}`);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllVehicles();
  }, []);

  return { data, error, isLoading };
};
