import { VehicleType } from "types/vehicle.type";
import { api } from "./base";
import { useInfiniteQuery } from "@tanstack/react-query";

const fetchAllVehiclesPagination = async (
  page: number,
  limit = 10,
  filters?: {
    fuelType?: string;
    seats?: string;
    carCategory?: string;
    transmission?: string;
  }
) => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...(filters?.fuelType && { fuelType: filters.fuelType }),
    ...(filters?.carCategory && { category: filters.carCategory }),
    ...(filters?.transmission && { transmission: filters.transmission }),
    ...(filters?.seats && { seats: filters.seats }),
  });

  return await api.get<never, PaginatedVehiclesResponse>(
    `/vehicle/pagination?${params.toString()}`
  );
};

interface PaginatedVehiclesResponse {
  data: VehicleType[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

export const useFetchAllVehiclesPagination = (
  fuelType?: string,
  carCategory?: string,
  seats?: string,
  transmission?: string
) => {
  return useInfiniteQuery({
    queryKey: [
      "vehicles-pagination",
      fuelType,
      seats,
      carCategory,
      transmission,
    ],
    queryFn: async ({ pageParam = 1 }) =>
      fetchAllVehiclesPagination(pageParam, 10, {
        fuelType,
        seats,
        carCategory,
        transmission,
      }),

    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.currentPage >= lastPage.totalPages) return undefined;

      return lastPage.currentPage + 1;
    },
    staleTime: 0,
    refetchOnWindowFocus: false,
  });
};
