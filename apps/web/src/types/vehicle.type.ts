export type VehicleType = {
  id: string;
  owner: Owner;
  brand: string;
  model: string;
  images: string[];
  productionYear: number;
  dailyPrice: number;
  isAvailable: boolean;
  description: string;
  isVerified: boolean;
  registration: string;
  vehicleTypeId: string;
  pickupAddress: string;
  city: string;
  details: VehicleDetails;
  longitude: number;
  latitude: number;
  rentals: Rental[];
};

export type Rental = {
  review: Review;
};

export type Review = {
  rating: number;
};

export type Owner = {
  id: string;
  firstName: string;
  lastName: string;
  personPhoto: string;
};

export interface VehicleDetails {
  seats: string;
  fuelType: string;
  carCategory: CarCategory;
  transmission: string;
}

export type CarCategory = "coupe" | "sedan" | "suv" | "cabriolet" | "hatchback";
