import { useState } from "react";
import { axiosInstanceAPI } from "@api/base";
import { toast } from "react-toastify";
import { useToken } from "@hooks/useToken";
import { routes } from "@routes/routes";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const axiosInstance = axiosInstanceAPI();
  const { updateToken } = useToken();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/auth/login", loginData);
      const token = response.data?.token;

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
    } catch (error: any) {
      console.error(`Error trying to log in: ${error}`);

      toast.error(`Error trying to login: ${error.response?.data?.message}`);
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
