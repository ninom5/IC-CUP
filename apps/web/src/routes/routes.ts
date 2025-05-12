import { RouteType } from "types/index";

export const routes: RouteType = {
  HOME: "/",
  ABOUT: "/about",
  LOGIN: "/login",
  REGISTER: "/register",
  CARS: "/cars",
  CAR_PAGE: "/car/:id",
  ADD_CAR: "/createCar",
  NOT_FOUND: "*",
  BECOME_HOST: "/become-host",
  ADD_VEHICLE: "/add-vehicle",
  USERS_DRIVES: "/user/drives",
  USERS_VEHICLES: "/user/vehicles",
};
