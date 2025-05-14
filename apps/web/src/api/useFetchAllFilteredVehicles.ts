import { useQuery } from "@tanstack/react-query";
import { api } from "./base";
import { VehicleType } from "types/vehicle.type";

const getAllFilteredVehicles = async (filters?: {
  fuelType?: string;
  seats?: string;
  carCategory?: string;
  transmission?: string;
  dateRange?: [Date | null, Date | null];
}) => {
  const params = new URLSearchParams({
    ...(filters?.fuelType && { fuelType: filters.fuelType }),
    ...(filters?.carCategory && { category: filters.carCategory }),
    ...(filters?.transmission && { transmission: filters.transmission }),
    ...(filters?.seats && { seats: filters.seats }),
    ...(filters?.dateRange?.[0] && {
      startDate: filters?.dateRange?.[0].toISOString(),
    }),
    ...(filters?.dateRange?.[1] && {
      endDate: filters.dateRange?.[1].toISOString(),
    }),
  });

  return await api.get<never>(`/vehicle/filters?${params.toString()}`);
};

export const useFetchAllFilteredVehicles = () => {
  return useQuery({
    queryKey: ["vehicle-filters"],
    queryFn: getAllFilteredVehicles,
    // staleTime: 1000 * 60 * 3,
    staleTime: 0,
    refetchOnWindowFocus: false,
  });
};
