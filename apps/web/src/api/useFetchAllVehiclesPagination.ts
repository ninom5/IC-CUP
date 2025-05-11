import { VehicleType } from "types/vehicleType";
import { api } from "./base";
import { useInfiniteQuery } from "@tanstack/react-query";

const fetchAllVehiclesPagination = async (page: number, limit = 10) => {
  return await api.get<never, PaginatedVehiclesResponse>(
    `/vehicle/pagination?page=${page}&limit=${limit}`
  );
};

interface PaginatedVehiclesResponse {
  data: VehicleType[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

export const useFetchAllVehiclesPagination = () => {
  return useInfiniteQuery({
    queryKey: ["vehicles-pagination"],
    queryFn: async ({ pageParam = 1 }) => fetchAllVehiclesPagination(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.currentPage >= lastPage.totalPages) return undefined;
      return lastPage.currentPage + 1;
    },
    staleTime: 0,
    refetchOnWindowFocus: false,
  });
};
