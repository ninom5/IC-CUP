import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from "./routes/routes";
import {
  CarsPage,
  HomePage,
  LoginPage,
  NotFoundPage,
  RegisterPage,
} from "@pages/index";
// import { AdminRoutes } from "@routes/adminRoutes";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.HOME} element={<HomePage />} />
        <Route path={routes.LOGIN} element={<LoginPage />} />
        <Route path={routes.REGISTER} element={<RegisterPage />} />
        <Route path={routes.CARS} element={<CarsPage />} />
        {/* <AdminRoutes>

        </AdminRoutes> */}

        <Route path={routes.NOT_FOUND} element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};
