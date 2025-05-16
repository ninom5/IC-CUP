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
import { SearchBarLayout, NavBarLayout, MobileLayout } from "@layouts/index";
import { ProtectedRoute } from "./components";
import { RegisterPage } from "@pages/RegisterPage/RegisterPage";
import { LoginPage } from "@pages/LoginPage/LoginPage";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MobileLayout />}>
          <Route element={<SearchBarLayout />}>
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
            <Route path={routes.HOME} element={<HomePage />} />
            <Route path={routes.PROFILE_PAGE} element={<ProfilePage />} />
            <Route path={routes.NOT_FOUND} element={<NotFoundPage />} />
            <Route path={routes.REGISTER_PAGE} element={<RegisterPage />} />
            <Route path={routes.LOGIN_PAGE} element={<LoginPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
