import { Role } from "enums";

export type UserProfileType = {
  id: string;
  firstName: string;
  lastName: string;
  role: Role;
  personPhoto: string;
  description: string;
};
