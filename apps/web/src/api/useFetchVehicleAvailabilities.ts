import { useQuery } from "@tanstack/react-query";
import { api } from "./base";
import { UserVehiclesType } from "../types/index";

const getVehicleAvailaibilities = async (
  vehicleId: string
): Promise<UserVehiclesType[]> => {
  const response = await api.get<never, UserVehiclesType[]>(
    `/vehicle-availability/vehicle/${vehicleId}`
  );
  return response;
};

export const useVehicleAvailabilities = (vehicleId: string) => {
  return useQuery({
    queryKey: ["vehicle-availabilities", vehicleId],
    queryFn: () => getVehicleAvailaibilities(vehicleId),
    staleTime: 0,
    refetchOnWindowFocus: false,
    enabled: !!vehicleId,
  });
};
