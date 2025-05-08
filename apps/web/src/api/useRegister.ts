import { RegisterDataType } from "types/registerDataType";
import { api } from "./base";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

const registerUser = async (registerData: RegisterDataType) => {
  const response = await api.post("/auth/register", registerData);

  if (response.status !== 201) throw new Error("Error registering user");
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
