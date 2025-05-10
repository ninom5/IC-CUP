import { CarCategory, FuelType } from "../enums/vehicle.enum";

export type VehicleData = {
  registration?: string;
  registrationExpiry?: string;
  category?: CarCategory;
  brand?: string;
  model?: string;
  year?: number;
  seats?: number;
  fuelType?: FuelType;
  transmission?: "manualni" | "automatik";
  features?: string[];
  images?: File[];
  price?: number;
};
