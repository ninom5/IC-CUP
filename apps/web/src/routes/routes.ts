import { RouteType } from "types/index";

export const routes: RouteType = {
  HOME: "/",
  ABOUT: "/about",
  CARS: "/cars",
  CAR_PAGE: "/car/:id",
  ADD_CAR: "/createCar",
  NOT_FOUND: "*",
  BECOME_HOST: "/become-host",
  USER_VEHICLES: "/user/vehicle",
  USER_VEHICLE_PROFILE: "/user/vehicle/:id",
  ADD_VEHICLE: "/user/vehicle/add-vehicle",
  USERS_DRIVES: "/user/drives",
};
