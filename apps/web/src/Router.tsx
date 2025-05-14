import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminRoute, routes } from "./routes/index";
import {
  AddVehiclePage,
  BecomeHostPage,
  VehiclesPage,
  HomePage,
  NotFoundPage,
  ProfilePage,
  UserVehiclesPage,
  UserVehiclePage,
  VehiclePage,
  BlockedPage,
  AdminPage,
} from "@pages/index";
import { SearchBarLayout, NavBarLayout } from "@layouts/index";
import { ProtectedRoute } from "./components";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SearchBarLayout />}>
          <Route path={routes.HOME} element={<HomePage />} />
          <Route path={routes.VEHICLES} element={<VehiclesPage />} />
          <Route path={routes.BECOME_HOST} element={<BecomeHostPage />} />
          <Route path={routes.ADD_VEHICLE} element={<AddVehiclePage />} />
          <Route path={routes.USER_VEHICLES} element={<UserVehiclesPage />} />
          <Route
            path={routes.USER_VEHICLE_PROFILE}
            element={<UserVehiclePage />}
          />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path={routes.BECOME_HOST} element={<BecomeHostPage />} />
          <Route path={routes.ADD_VEHICLE} element={<AddVehiclePage />} />

          <Route element={<SearchBarLayout />}>
            <Route path={routes.VEHICLE_PAGE} element={<VehiclePage />} />
          </Route>
        </Route>
        <Route element={<AdminRoute />}>
          <Route path={routes.ADMIN} element={<AdminPage />}></Route>
        </Route>

        <Route path={routes.BLOCKED} element={<BlockedPage />} />

        <Route element={<NavBarLayout />}>
          <Route path={routes.PROFILE_PAGE} element={<ProfilePage />} />
          <Route path={routes.NOT_FOUND} element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
