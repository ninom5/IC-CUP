import { createContext } from "react";

export interface FiltersContextType {
  fuelType: string;
  seats: string;
  carCategory: string;
  transmission: string;
  sortBy: string;
  dateRange: [Date | null, Date | null];
  setFilters: (
    filters: Partial<Omit<FiltersContextType, "setFilters">>
  ) => void;
}

export const FiltersContext = createContext<FiltersContextType>({
  fuelType: "",
  seats: "",
  carCategory: "",
  transmission: "",
  sortBy: "",
  dateRange: [null, null],
  setFilters: () => {},
});
