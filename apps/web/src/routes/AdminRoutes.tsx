import { useToken } from "@hooks/useToken";
import { Navigate, Outlet } from "react-router-dom";
import { routes } from "./routes";
import { useAuthContext } from "@hooks/useAuthContext";
import { toast } from "react-toastify";

export const AdminRoute = () => {
  const {
    data: { role, isExpired },
  } = useToken();
  const { setShowLogin } = useAuthContext();

  if (isExpired) {
    toast.error("Sesija istekla. Molimo prijavite se ponovno");
    setShowLogin;
  }

  return role === "ADMIN" ? <Outlet /> : <Navigate to={routes.HOME} replace />;
};
