export type FiltersType = {
  sortBy: string;
  category: string;
  transmission: string;
  seatNumber: string;
  fuelType: string;
};

export type FilterPopUpProps = {
  filters: FiltersType;
  setFilters: React.Dispatch<React.SetStateAction<FiltersType>>;
};
