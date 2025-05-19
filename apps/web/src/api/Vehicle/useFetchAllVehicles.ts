import { useQuery } from "@tanstack/react-query";
import { api } from "@api/index";
import { VehicleType } from "types";

const getAllVehicles = async (): Promise<VehicleType[]> => {
  const response = await api.get<never, VehicleType[]>("/vehicle");
  return response;
};

export const useFetchAllVehicles = () => {
  return useQuery({
    queryKey: ["vehicle"],
    queryFn: getAllVehicles,
    // staleTime: 1000 * 60 * 3,
    staleTime: 0,
    refetchOnWindowFocus: false,
  });
};
