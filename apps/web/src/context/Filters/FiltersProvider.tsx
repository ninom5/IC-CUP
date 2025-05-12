import { FiltersContext, FiltersContextType } from "context";
import { FC, useCallback, useState } from "react";

export const FiltersProvider: FC<React.PropsWithChildren> = ({ children }) => {
  const [filtersState, setFiltersState] = useState({
    fuelType: "",
    seats: "",
    carCategory: "",
    transmission: "",
  });

  const setFilters = useCallback(
    (newFilters: Partial<Omit<FiltersContextType, "setFilters">>) => {
      setFiltersState((prev) => ({ ...prev, ...newFilters }));
    },
    []
  );

  return (
    <FiltersContext.Provider value={{ ...filtersState, setFilters }}>
      {children}
    </FiltersContext.Provider>
  );
};
