import { useState } from "react";
import { useToken } from "@hooks/useToken";
import { useNavigate } from "react-router-dom";
import { useLogin } from "@api/index";
import { toast } from "react-toastify";
import { routes } from "@routes/routes";
import axios from "axios";

export const LoginForm = () => {
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
    <section>
      <h1>Login Form</h1>

      <form onSubmit={handleSubmit}>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="email"
          value={loginData.email}
          onChange={handleChange}
          required
        />
        <input
          id="password"
          name="password"
          type="password"
          placeholder="password"
          value={loginData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Submit</button>
      </form>
    </section>
  );
};
