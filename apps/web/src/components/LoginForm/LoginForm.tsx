import { useState } from "react";
import { useToken } from "@hooks/useToken";
import { useNavigate } from "react-router-dom";
import { useLogin } from "@api/index";
import { toast } from "react-toastify";
import { routes } from "@routes/index";
import axios from "axios";
import "./loginForm.css";

export const LoginForm = ({ onClose }: { onClose: () => void }) => {
  const { updateToken } = useToken();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const { mutate: login } = useLogin();

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    login(loginData, {
      onSuccess: () => {
        updateToken();

        setLoginData({
          email: "",
          password: "",
        });

        navigate(routes.CARS);
      },
      onError: (error: unknown) => {
        if (axios.isAxiosError(error)) {
          const message =
            error.response?.data?.message || "Unknown error occurred";
          toast.error(`Error logging in: ${message}`);
          console.error("Axios error:", error.response);
        } else {
          toast.error("An unexpected error occurred. Please try again.");
          console.error("Login error:", error);
        }
      },
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="login-pop-up" onClick={(e) => e.stopPropagation()}>
        <section className="login-section">
          <h1>Prijava</h1>

          <span className="close-span" onClick={onClose}>
            &times;
          </span>

          <form onSubmit={handleSubmit} className="login-form">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="example@email.com"
              value={loginData.email}
              onChange={handleChange}
              required
            />

            <label htmlFor="password">Lozinka</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="*********"
              value={loginData.password}
              onChange={handleChange}
              required
            />

            <button type="submit">Prijavi se</button>
          </form>

          <div className="aha">
            <h2>Još nemaš račun?</h2>

            <button type="button">Registriraj se</button>
          </div>
        </section>
      </div>
    </div>
  );
};
