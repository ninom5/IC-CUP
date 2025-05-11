import { Role } from "enums";

export type UserProfileType = {
  firstName: string;
  lastName: string;
  role: Role;
  personPhoto: string;
  description?: string;
};
