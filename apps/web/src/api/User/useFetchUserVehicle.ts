import { useQuery } from "@tanstack/react-query";
import { api } from "@api/index";
import { UserVehiclesType } from "types";

const getUserVehicle = async (vehicleId: string): Promise<UserVehiclesType> => {
  const response = await api.get<never, UserVehiclesType>(
    `/vehicle/${vehicleId}`
  );
  return response;
};

export const useFetchUserVehicle = (vehicleId: string) => {
  return useQuery({
    queryKey: ["user-vehicles", vehicleId],
    queryFn: () => getUserVehicle(vehicleId),
    staleTime: 0,
    refetchOnWindowFocus: false,
    enabled: !!vehicleId,
  });
};
