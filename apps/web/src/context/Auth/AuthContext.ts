import { createContext } from "react";

export interface AuthContextType {
  showLogin: boolean;
  showRegister: boolean;
  setShowLogin: (value: boolean) => void;
  setShowRegister: (value: boolean) => void;
}

export const AuthContext = createContext<AuthContextType>({
  showLogin: false,
  showRegister: false,
  setShowLogin: () => {},
  setShowRegister: () => {},
});
