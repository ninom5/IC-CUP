import { AuthContext } from "context";
import { FC, useState } from "react";

export const AuthProvider: FC<React.PropsWithChildren> = ({ children }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <AuthContext.Provider
      value={{ showLogin, showRegister, setShowLogin, setShowRegister }}
    >
      {children}
    </AuthContext.Provider>
  );
};
