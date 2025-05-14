import { RegisterDataType } from "types";
import { api } from "./base";
import { useMutation } from "@tanstack/react-query";
import { JwtResponse } from "./useLogin";

const registerUser = (registerData: RegisterDataType) => {
  return api.post<RegisterDataType, JwtResponse>(
    "/auth/register",
    registerData
  );
};

export const useRegister = () =>
  useMutation({
    mutationKey: ["register-user"],
    mutationFn: registerUser,
  });
