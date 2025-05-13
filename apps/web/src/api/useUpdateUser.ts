import { useMutation } from "@tanstack/react-query";
import { api } from "./base";
import { toast } from "react-toastify";

export type UpdateUserPayload = {
  id: string;
  description?: string;
};

const updateUser = async ({ id, ...data }: UpdateUserPayload) => {
  return api.patch(`/user/${id}`, data);
};

export const useUpdateUser = () =>
  useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      toast.success("Profil ažuriran!");
    },
    onError: () => {
      toast.error("Greška prilikom spremanja profila.");
    },
  });
