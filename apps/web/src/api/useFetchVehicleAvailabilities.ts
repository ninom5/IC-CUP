import { useQuery } from "@tanstack/react-query";
import { api } from "./base";
import { AvailabilityInterval } from "../types/index";

interface ExtendedAvailabilityInterval extends AvailabilityInterval {
  id: string;
}

const getVehicleAvailaibilities = async (
  vehicleId: string
): Promise<ExtendedAvailabilityInterval[]> => {
  const response = await api.get<never, ExtendedAvailabilityInterval[]>(
    `/vehicle-availability/vehicle/${vehicleId}`
  );
  return response;
};

export const useFetchVehicleAvailabilities = (vehicleId: string) => {
  return useQuery({
    queryKey: ["vehicle-availabilities", vehicleId],
    queryFn: () => getVehicleAvailaibilities(vehicleId),
    staleTime: 0,
    refetchOnWindowFocus: false,
    enabled: !!vehicleId,
  });
};
