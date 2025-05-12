import { FiltersContext } from "context";
import { useContext } from "react";

export const useFiltersContext = () => {
  const context = useContext(FiltersContext);

  if (!context)
    throw new Error("useFilters must be used within a FiltersProvider");

  return context;
};
