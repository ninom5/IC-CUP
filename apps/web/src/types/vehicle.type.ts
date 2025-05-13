<<<<<<< Updated upstream
import {
  CarCategoryEnum,
  FuelTypeEnum,
  VehicleEnum,
} from "../enums/vehicle.enum";
=======
import { CarCategory, FuelType, VehicleType } from "../enums/vehicle.enum";

import { CarCategory, FuelType, VehicleType } from "../enums/vehicle.enum";
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
  vehicleType: VehicleEnum;
=======
  vehicleType: VehicleType;
>>>>>>> Stashed changes
  details: VehicleDetails;
  features: VehicleFeatures;
};

export type VehicleDetails = {
<<<<<<< Updated upstream
  fuelType: FuelTypeEnum;
  isAutomatic: boolean;
  category: CarCategoryEnum;
=======
  fuelType: FuelType;
  isAutomatic: boolean;
  category: CarCategory;
>>>>>>> Stashed changes
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
  ownerId: string;
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
