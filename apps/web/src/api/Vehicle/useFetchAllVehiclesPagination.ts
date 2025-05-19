import { VehicleType } from "types";
import { api } from "@api/index";
import { useInfiniteQuery } from "@tanstack/react-query";

const fetchAllVehiclesPagination = async (
  page: number,
  limit = 10,
  filters?: {
    fuelType?: string;
    seats?: string;
    carCategory?: string;
    transmission?: string;
    dateRange?: [Date | null, Date | null];
  }
) => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
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
  transmission?: string,
  dateRange?: [Date | null, Date | null]
) => {
  return useInfiniteQuery({
    queryKey: [
      "vehicles-pagination",
      fuelType,
      seats,
      carCategory,
      transmission,
      dateRange,
    ],
    queryFn: async ({ pageParam = 1 }) =>
      fetchAllVehiclesPagination(pageParam, 10, {
        fuelType,
        seats,
        carCategory,
        transmission,
        dateRange,
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
