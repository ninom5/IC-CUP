import { VehicleCard } from "@components/index";
import InfiniteScroll from "react-infinite-scroll-component";
import "./vehicleList.css";
import { useFetchAllVehiclesPagination } from "@api/useFetchAllVehiclesPagination";
import { useFiltersContext } from "@hooks/useFiltersContext";

export const VehicleList = () => {
  const { fuelType, carCategory, seats, transmission } = useFiltersContext();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
    isLoading,
  } = useFetchAllVehiclesPagination(fuelType, carCategory, seats, transmission);

  const vehicles = // viska
    data?.pages
      .flatMap((page) => page.data)
      .filter((v) => v.isAvailable && v.isVerified) || [];

  if (error) return <div>{error.message}</div>;

  return (
    <section className="vehicle-list-section">
      <div id="scrollableContainer" className="vehicle-list-scroll-container">
        {isLoading && <div>loading...</div>}
        {!isLoading && vehicles.length === 0 && (
          <div>Nema dostupnih vozila</div>
        )}

        <InfiniteScroll
          dataLength={vehicles.length}
          next={fetchNextPage}
          hasMore={vehicles.length > 0 && !!hasNextPage}
          loader={isFetchingNextPage ? <div>Loading more...</div> : null}
          scrollableTarget="scrollableContainer"
        >
          {vehicles.map((v) => (
            <VehicleCard key={v.id} vehicle={v} />
          ))}
        </InfiniteScroll>
      </div>

      {isFetchingNextPage && <div>Loading more vehicles</div>}
    </section>
  );
};
