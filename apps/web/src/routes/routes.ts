import { RouteType } from "types/index";

export const routes: RouteType = {
  HOME: "/",
  ABOUT: "/about",
  CARS: "/cars",
  CAR_PAGE: "/car/:id",
  ADD_CAR: "/createCar",
  NOT_FOUND: "*",
  BECOME_HOST: "/become-host",
  ADD_VEHICLE: "/add-vehicle",
  PROFILE_PAGE: "/profile/:id",
  USERS_DRIVES: "/user/drives",
  USER_VEHICLES: "/user/vehicles",
};
