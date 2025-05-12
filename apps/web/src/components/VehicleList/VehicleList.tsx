import { VehicleCard } from "@components/index";
import InfiniteScroll from "react-infinite-scroll-component";
import "./vehicleList.css";
import { useFetchAllVehiclesPagination } from "@api/useFetchAllVehiclesPagination";
import { useFiltersContext } from "@hooks/index";
import { getAverageVehicleRating } from "@utils/index";

export const VehicleList = () => {
  const { fuelType, carCategory, seats, transmission, sortBy } =
    useFiltersContext();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
    isLoading,
  } = useFetchAllVehiclesPagination(fuelType, carCategory, seats, transmission);

  const vehicles = data?.pages
    .flatMap((page) => page.data)
    .map((vehicle) => {
      const { totalRating, numberOfRatings } = getAverageVehicleRating(vehicle);
      const avgRating = totalRating > 0 ? totalRating / numberOfRatings : 0;

      return { ...vehicle, avgRating };
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price_higher_lower":
          return b.dailyPrice - a.dailyPrice;

        case "price_lower_higher":
          return a.dailyPrice - b.dailyPrice;

        case "rating_higher_lower":
          return b.avgRating - a.avgRating;

        case "rating_lower_higher":
          return a.avgRating - b.avgRating;

        default:
          return 0;
      }
    });

  if (error) return <div>{error.message}</div>;
  if (!vehicles || vehicles.length === 0) return <div>No data available</div>;

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
