import { LoginForm } from "@components/LoginForm/LoginForm";
import { useToken } from "@hooks/index";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const BlockedPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    data: { token, isExpired },
  } = useToken();

  const redirectOnLogin = location?.state.from || "/";

  useEffect(() => {
    if (token && !isExpired) navigate(redirectOnLogin, { replace: true });
  }, [token, isExpired]);

  return (
    <section>
      <LoginForm />
    </section>
  );
};
