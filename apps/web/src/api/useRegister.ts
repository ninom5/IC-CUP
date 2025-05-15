import { RegisterDataType } from "types";
import { api } from "./base";
import { useMutation } from "@tanstack/react-query";
import { JwtResponse } from "./useLogin";
import { toast } from "react-toastify";

const registerUser = (registerData: RegisterDataType) => {
  return api.post<RegisterDataType, JwtResponse>(
    "/auth/register",
    registerData
  );
};

export const useRegister = (onSuccessCallback: () => void) =>
  useMutation({
    mutationKey: ["register-user"],
    mutationFn: registerUser,
    onSuccess: () => {
      toast.success("Uspješno ste se registrirali. Sada se možete prijaviti!");

      onSuccessCallback();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Registracija neuspješna");
    },
  });
