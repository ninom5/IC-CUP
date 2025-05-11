import { CarCategory, FuelType, VehicleType } from "../enums/vehicle.enum";

export type VehicleData = {
  brand: string;
  model: string;
  images: string[];
  productionYear: number;
  dailyPrice: number;
  description: string;
  registration: string;
  registrationExpiration: string;
  pickupAddress: string;
  city: string;
  longitude: number;
  latitude: number;
  vehicleType: VehicleType;
  details: VehicleDetails;
};

export type VehicleDetails = {
  licensePlate: string;
  fuelType: FuelType;
  isAutomatic: boolean;
  category: CarCategory;
  numOfSeats: number;
};

export type StepProps = {
  data: VehicleData;
  onDataChange: (newData: Partial<VehicleData>) => void;
};
