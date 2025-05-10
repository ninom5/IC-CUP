import { VehicleCard } from "@components/index";
import InfiniteScroll from "react-infinite-scroll-component";
import "./vehicleList.css";
import { useFetchAllVehiclesPagination } from "@api/useFetchAllVehiclesPagination";

export const VehicleList = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
    isLoading,
  } = useFetchAllVehiclesPagination();

  console.log(data);

  const vehicles =
    data?.pages
      .flatMap((page) => page.data)
      .filter((v) => v.isAvailable && v.isVerified) || [];

  if (error) return <div>{error.message}</div>;

  return (
    <section>
      <div id="scrollableContainer" className="vehicle-list-scroll-container">
        {isLoading && <div>loading...</div>}
        {!isLoading && vehicles.length === 0 && (
          <div>No vehicles available</div>
        )}

        <InfiniteScroll
          dataLength={vehicles.length}
          next={fetchNextPage}
          hasMore={!!hasNextPage}
          loader={<div>Loading more...</div>}
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
