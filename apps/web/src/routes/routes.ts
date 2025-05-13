import { RouteType } from "types/index";

export const routes: RouteType = {
  HOME: "/",
  ABOUT: "/about",
  CARS: "/cars",
  VEHICLE_PAGE: "/vehicle/:id",
  ADD_CAR: "/createCar",
  NOT_FOUND: "*",
  BECOME_HOST: "/become-host",
  ADD_VEHICLE: "/add-vehicle",
  USERS_DRIVES: "/user/drives",
  USERS_VEHICLES: "/user/vehicles",
  BLOCKED: "/blocked",
};
