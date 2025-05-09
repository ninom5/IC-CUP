import { useQuery } from "@tanstack/react-query";
import { api } from "./base";
import { VehicleType } from "types/vehicleType";

const getAllVehicles = async (): Promise<VehicleType[]> => {
  const response = await api.get<never, VehicleType[]>("/vehicle");
  return response;
};

export const useFetchAllVehicles = () => {
  return useQuery({
    queryKey: ["vehicle"],
    queryFn: getAllVehicles,
    staleTime: 0,
  });
};
