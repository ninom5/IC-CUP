import { Role } from "@enums/index";

export type UserProfileType = {
  id: string;
  firstName: string;
  lastName: string;
  role: Role;
  personPhoto: string;
  description: string;
  phoneNumber: string;
  address: string;
  idCard: string;
  driverLicense: string;
};

export type UserRating = {
  averageRating: number;
  reviewCount: number;
};
