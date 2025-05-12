import { CarCategory, FuelType, VehicleType } from "../enums/vehicle.enum";

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
  vehicleType: VehicleType;
  details: VehicleDetails;
  features: VehicleFeatures;
};

export type VehicleDetails = {
  fuelType: FuelType;
  isAutomatic: boolean;
  category: CarCategory;
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
