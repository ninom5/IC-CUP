export type FiltersType = {
  sortBy: string;
  category: string;
  transmission: string;
  seatNumber: string;
  fuelType: string;
  dateRange?: [Date | null, Date | null];
};

export type FilterPopUpProps = {
  userFilters: FiltersType;
  setUserFilters: React.Dispatch<React.SetStateAction<FiltersType>>;
  setShowFilters: React.Dispatch<React.SetStateAction<boolean>>;
  handleSearch: () => void;
};
