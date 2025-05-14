import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from "./routes/index";
import {
  AddVehiclePage,
  BecomeHostPage,
  VehiclesPage,
  HomePage,
  NotFoundPage,
  UserVehiclesPage,
  UserVehiclePage,
  VehiclePage,
  BlockedPage,
} from "@pages/index";
import { SearchBarLayout, NavBarLayout } from "@layouts/index";
import { ProtectedRoute } from "./components";
// import { AdminRoutes } from "@routes/index ";

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
        {/* <AdminRoutes>

</AdminRoutes> */}

        <Route path={routes.BLOCKED} element={<BlockedPage />} />

        <Route element={<NavBarLayout />}>
          <Route path={routes.NOT_FOUND} element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
