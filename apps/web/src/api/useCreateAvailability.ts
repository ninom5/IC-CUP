import { useMutation } from "@tanstack/react-query";
import { AvailabilityInterval } from "../types/index";
import { api } from "./base";
import { toast } from "react-toastify";

const createAvailability = async (
  availibilityIntervals: AvailabilityInterval[]
) => {
  const response = await api.post(
    `/vehicle-availability/create-multiple`,
    availibilityIntervals
  );

  return response.data;
};

export const useCreateAvailability = () => {
  return useMutation({
    mutationFn: createAvailability,
    onSuccess: () => {
      toast.success("Dostupnost vozila je uspješno kreirana!");
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message ||
        "Došlo je do greške prilikom kreiranja dostupnosti vozila.";
      toast.error(errorMessage);
    },
  });
};
