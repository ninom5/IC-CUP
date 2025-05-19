import {
  CarCategoryEnum,
  FuelTypeEnum,
  TransmissionTypeEnum,
  VehicleEnum,
} from "enums";
import { AvailabilityInterval } from "types";

export type VehicleData = {
  ownerId: string;
  brand: string;
  model: string;
  images: File[];
  productionYear: number;
  dailyPrice: number;
  description: string;
  vehicleLicenseImg: File | null;
  registration: string;
  registrationExpiration: string;
  pickupAddress: string;
  city: string;
  longitude: number;
  latitude: number;
  vehicleType: VehicleEnum;
  details: VehicleDetails;
  features: VehicleFeatures;
};

export type VehicleDetails = {
  fuelType: FuelTypeEnum;
  transmission: TransmissionTypeEnum;
  category: CarCategoryEnum;
  numOfSeats: number;
};

export type VehicleFeatures = {
  airConditioning: boolean;
  usb: boolean;
  aux: boolean;
  bluetooth: boolean;
  sensors: boolean;
  pets: boolean;
  gps: boolean;
  childSeat: boolean;
};

export type StepProps = {
  data: VehicleData;
  onDataChange: (newData: Partial<VehicleData>) => void;
};

export type VehicleType = {
  id: string;
  owner: User;
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
  availabilities: AvailabilityInterval[];
  features: VehicleFeatures;
  ownerId: string;
};

export type VehicleType2 = {
  id: string;
  brand: string;
  model: string;
  images: string[];
  productionYear: number;
  dailyPrice: number;
  description: string;
  registration: string;
  pickupAddress: string;
  city: string;
  details: VehicleDetails;
  longitude: number;
  latitude: number;
  features: VehicleFeatures;
  ownerId: string;
};

export type Rental = {
  review: Review;
  renter: User;
};

export type CreateRental = {
  renterId: string;
  vehicleId: string;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
};

export type RentalResponse = {
  id: string;
  totalPrice: number;
};

export type Review = {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
};

export type UserVehiclesType = {
  id: string;
  ownerId: string;
  brand: string;
  model: string;
  images: string[];
  productionYear: number;
  dailyPrice: number;
  description: string;
  vehicleLicenseImg: string;
  registration: string;
  registrationExpiration: string;
  pickupAddress: string;
  city: string;
  longitude: number;
  latitude: number;
  vehicleType: VehicleEnum;
  details: VehicleDetails;
  features: VehicleFeatures;
  avgRating: number | null;
  reviewCount: number;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  personPhoto: string;
};

export type CarCategory = "coupe" | "sedan" | "suv" | "cabriolet" | "hatchback";
