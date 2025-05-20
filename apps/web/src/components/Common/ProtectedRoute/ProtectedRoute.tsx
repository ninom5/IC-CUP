import { useToken } from "@hooks/index";
import { routes } from "@routes/index";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const ProtectedRoute = () => {
  const {
    data: { token, isExpired, isSuspended },
  } = useToken();

  const location = useLocation();

  if (!token || isExpired || isSuspended)
    return (
      <Navigate
        to={routes.BLOCKED}
        replace
        state={{ from: location.pathname }}
      />
    );

  return <Outlet />;
};
