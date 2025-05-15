import { useMutation } from "@tanstack/react-query";
import { api } from "@api/index";
import { toast } from "react-toastify";

export type UpdateUserPayload = {
  id: string;
  description?: string;
  personPhoto?: string;
  password?: string;
  phoneNumber?: string;
  address?: string;
  idCard?: string;
  driverLicense?: string;
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
