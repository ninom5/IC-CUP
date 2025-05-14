import { useState } from "react";
import { useToken } from "@hooks/useToken";
import { useNavigate } from "react-router-dom";
import { useLogin } from "@api/index";
import { toast } from "react-toastify";
import { routes } from "@routes/index";
import axios from "axios";
import "./loginForm.css";
import { useAuthContext } from "@hooks/useAuthContext";

export const LoginForm = () => {
  const { updateToken } = useToken();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const { mutate: login } = useLogin();
  const { setShowLogin, setShowRegister } = useAuthContext();

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

        setShowLogin(false);
        navigate(routes.VEHICLES);
      },
      onError: (error: unknown) => {
        if (axios.isAxiosError(error)) {
          const message =
            error.response?.data?.message || "Unknown error occurred";
          toast.error(`Pogresška prilikom prijave: ${message}`);
          console.error("Axios error:", error.response);
        } else {
          console.error("Login error:", error);
        }
      },
    });
  };

  return (
    <div className="modal-overlay" onClick={() => setShowLogin(false)}>
      <div className="login-pop-up" onClick={(e) => e.stopPropagation()}>
        <section className="login-section">
          <h1>Prijava</h1>

          <span className="close-span" onClick={() => setShowLogin(false)}>
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

          <div className="no-account">
            <h2>Još nemaš račun?</h2>

            <button
              type="button"
              onClick={() => {
                setShowLogin(false);
                setShowRegister(true);
              }}
            >
              Registriraj se
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
