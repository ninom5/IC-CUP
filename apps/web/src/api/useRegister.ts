import { RegisterDataType } from "types";
import { api } from "./base";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

const registerUser = async (registerData: RegisterDataType) => {
  await api.post("/auth/register", registerData);
};

export const useRegister = (): UseMutationResult<
  void,
  Error,
  RegisterDataType,
  unknown
> => {
  return useMutation({
    mutationFn: registerUser,
  });
};
