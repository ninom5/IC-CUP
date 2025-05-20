import { useQuery } from "@tanstack/react-query";
import { api } from "@api/index";
import { AvailabilityInterval } from "types";

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
