import { jwtDecode } from "jwt-decode";

interface TokenDataType {
  id: string;
  email: string;
  role: string;
  isSuspended: boolean | null;
  exp: number;
}

export const extractUserInfo = () => {
  const token = localStorage.getItem("jwt");

  if (!token)
    return {
      data: {
        id: "",
        email: "",
        role: "",
        token: null,
        isSuspended: null,
        isExpired: null,
      },
      loading: false,
      error: "No token found",
    };

  try {
    const decoded: TokenDataType = jwtDecode<TokenDataType>(token);
    const isExpired = isTokenExpired(decoded);

    return {
      data: {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role,
        token: token,
        isSuspended: decoded.isSuspended,
        isExpired,
      },
      loading: false,
      error: null,
    };
  } catch (error) {
    console.error("Invalid token", error);

    return {
      data: {
        id: "",
        email: "",
        role: "",
        token: token,
        isExpired: null,
        isSuspended: null,
      },
      loading: false,
      error: "No token found",
    };
  }
};
const isTokenExpired = (decoded: TokenDataType) => {
  const currentDate = Date.now() / 1000;
  return decoded.exp < currentDate;
};
