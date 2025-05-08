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
  locationId: string;
  vehicleTypeId: string;
};
