import { useQuery } from "@tanstack/react-query";
import { api } from "./base";
import { VehicleType } from "types/vehicleType";

const getAllVehicles = async (): Promise<VehicleType[]> => {
  const response = await api.get(`/vehicle`);
  return response?.data;
};

export const useFetchAllVehicles = () => {
  return useQuery<VehicleType[]>({
    queryFn: getAllVehicles,
    queryKey: ["vehicles"],
  });
};
