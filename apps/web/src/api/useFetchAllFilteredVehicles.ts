import { useQuery } from "@tanstack/react-query";
import { api } from "./base";

interface Filters {
  fuelType?: string;
  seats?: string;
  carCategory?: string;
  transmission?: string;
  dateRange?: [Date | null, Date | null];
}

const getAllFilteredVehicles = async ({
  queryKey,
}: {
  queryKey: [string, Filters?];
}) => {
  const [_key, filters] = queryKey;

  const params = new URLSearchParams({
    ...(filters?.fuelType && { fuelType: filters.fuelType }),
    ...(filters?.carCategory && { category: filters.carCategory }),
    ...(filters?.transmission && { transmission: filters.transmission }),
    ...(filters?.seats && { seats: filters.seats }),
    ...(filters?.dateRange?.[0] && {
      startDate: filters.dateRange[0].toISOString(),
    }),
    ...(filters?.dateRange?.[1] && {
      endDate: filters.dateRange[1].toISOString(),
    }),
  });

  return await api.get<never>(`/vehicle/filters?${params.toString()}`);
};

export const useFetchAllFilteredVehicles = (filters?: {
  fuelType?: string;
  seats?: string;
  carCategory?: string;
  transmission?: string;
  dateRange?: [Date | null, Date | null];
}) => {
  return useQuery({
    queryKey: ["vehicle-filters", filters],
    queryFn: getAllFilteredVehicles,
    staleTime: 0,
    refetchOnWindowFocus: false,
  });
};
