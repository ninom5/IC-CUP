import { VehicleType } from "types/index";

export const getAverageVehicleRating = (vehicle: VehicleType) => {
  const { rentals } = vehicle;

  let totalRating = 0;
  let numberOfRatings = 0;

  if (!rentals) return { totalRating, numberOfRatings };

  rentals.forEach((rental) => {
    const review = rental.review;

    if (review) {
      totalRating += review.rating;
      numberOfRatings++;
    }
  });

  return { totalRating, numberOfRatings };
};
