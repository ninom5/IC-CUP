import { useState } from "react";
import { toast } from "react-toastify";
import { useToken } from "@hooks/useToken";
import { routes } from "@routes/routes";
import { useNavigate } from "react-router-dom";
import { useLogin } from "@api/index";
import axios from "axios";

export const LoginForm = () => {
  const { updateToken } = useToken();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const login = useLogin(loginData);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const token = await login();

      if (!token) {
        toast.error("Invalid username or password");
        return;
      }

      localStorage.setItem("jwt", token);
      updateToken();

      toast.success("Successfully logged in");
      setLoginData({
        email: "",
        password: "",
      });

      navigate(routes.CARS);
    } catch (error: Error | any) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error response:", error.response);
        const errorMessage =
          error.response?.data?.message || "Unknown error occurred";
        toast.error(`Error logging in: ${errorMessage}`);
      } else {
        console.error(`Error logging in: ${error}`);
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
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
