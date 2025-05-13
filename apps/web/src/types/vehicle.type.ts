import { CarCategoryEnum, FuelTypeEnum, VehicleEnum } from "enums";

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
  isAutomatic: boolean;
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
