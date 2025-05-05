import { useState } from "react";

export const LoginForm = () => {
  const [loinData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    setLoginData({ ...loinData, [e.target.name]: e.target.value });
  };

  return (
    <section>
      <h1>Login Form</h1>

      <form>
        <input type="text" placeholder="email" onChange={handleChange} />
        <input type="text" placeholder="password" onChange={handleChange} />

        <button type="submit">Submit</button>
      </form>
    </section>
  );
};
