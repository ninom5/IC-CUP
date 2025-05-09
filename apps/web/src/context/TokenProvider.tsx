import { PropsWithChildren, useEffect, useState, FC } from "react";
import { extractUserInfo } from "@utils/extractUserInfo.util";
import { TokenContext } from "./TokenContext";

export const TokenProvider: FC<PropsWithChildren> = ({ children }) => {
  const getNormalizedData = () => {
    const result = extractUserInfo();
    const user = result.data;

    return {
      data: {
        id: user.id,
        email: user.email,
        role: user.role,
        token: user.token || "",
        isExpired: user.isExpired,
        isSuspended: user.isSuspended,
      },
      loading: result.loading,
      error: result.error,
    };
  };

  const [state, setState] = useState(() => ({
    ...getNormalizedData(),
    updateToken: () => {},
  }));

  const updateToken = () => {
    const { data, loading, error } = getNormalizedData();
    setState((prev) => ({
      ...prev,
      data,
      loading,
      error,
    }));
  };

  useEffect(() => {
    const onChange = () => updateToken();
    window.addEventListener("storage", onChange);

    return () => window.removeEventListener("storage", onChange);
  }, []);

  return (
    <TokenContext.Provider
      value={{
        data: state.data,
        loading: state.loading,
        error: state.error,
        updateToken,
      }}
    >
      {children}
    </TokenContext.Provider>
  );
};
