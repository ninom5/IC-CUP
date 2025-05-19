import { RouteType } from "types/index";

export const routes: RouteType = {
  ADMIN: "/admin",
  HOME: "/",
  ABOUT: "/about",
  VEHICLES: "/vehicles",
  VEHICLE_PAGE: "/vehicle/:id",
  BECOME_HOST: "/become-host",
  USER_VEHICLES: "/user/vehicle",
  USER_VEHICLE_PROFILE: "/user/vehicle/:id",
  ADD_VEHICLE: "/user/vehicle/add-vehicle",
  USERS_DRIVES: "/user/drives",
  BLOCKED: "/blocked",
  NOT_FOUND: "*",
  PROFILE_PAGE: "/profile/:id",
  LOGIN_PAGE: "/login",
  REGISTER_PAGE: "/register",
};
