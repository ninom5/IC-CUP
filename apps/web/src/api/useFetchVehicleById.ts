import { VehicleType } from "types/vehicle.type";
import { api } from "./base";
import { useQuery } from "@tanstack/react-query";

const fetchVehicleById = async (id: string): Promise<VehicleType> => {
  return await api.get<never, VehicleType>(`/vehicle/${id}`);
};

export const useFetchVehicleById = (id: string) => {
  return useQuery({
    queryKey: ["vehicle-id"],
    queryFn: () => fetchVehicleById(id),
    // staleTime: 1000 * 60 * 3,
  });
};
