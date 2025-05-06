import { createContext } from "react";
import { TokenDataType } from "types/tokenDataType";

export interface TokenContextType {
  data: TokenDataType;
  loading: boolean;
  error: string | null;
  updateToken: () => void;
}

export const TokenContext = createContext<TokenContextType>({
  data: {
    id: "",
    email: "",
    role: "",
    token: "",
    isExpired: null,
    isSuspended: null,
  },
  loading: true,
  error: null,
  updateToken: () => {},
});
