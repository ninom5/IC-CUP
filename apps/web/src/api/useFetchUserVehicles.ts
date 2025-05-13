import { useQuery } from "@tanstack/react-query";
import { api } from "./base";
import { VehicleType } from "types/vehicle.type";

interface UserVehiclesType extends VehicleType {
  avgRating: number | null;
  reviewCount: number;
}

const getUserVehicles = async (userId: string): Promise<UserVehiclesType[]> => {
  const response = await api.get<never, UserVehiclesType[]>(
    `/vehicle/user/${userId}`
  );
  return response;
};

export const useFetchUserVehicles = (userId: string) => {
  return useQuery({
    queryKey: ["user-vehicles", userId],
    queryFn: () => getUserVehicles(userId),
    staleTime: 0,
    refetchOnWindowFocus: false,
    enabled: !!userId,
  });
};
