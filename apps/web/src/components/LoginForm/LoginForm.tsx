import { useState } from "react";

export const LoginForm = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  return (
    <section>
      <h1>Login Form</h1>

      <form>
        <input
          type="text"
          placeholder="email"
          value={loginData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="password"
          value={loginData.password}
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
      </form>
    </section>
  );
};
