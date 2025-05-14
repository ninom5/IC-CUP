import { useMutation } from "@tanstack/react-query";
import { AvailabilityInterval } from "../types/index";
import { api } from "./base";
import { toast } from "react-toastify";

const createAvailability = async (
  availabilityInterval: AvailabilityInterval
) => {
  const response = await api.post(
    `/vehicle-availability`,
    availabilityInterval
  );

  return response;
};

export const useCreateAvailability = () => {
  return useMutation({
    mutationFn: createAvailability,
    onSuccess: () => {
      toast.success("Dostupnost vozila je uspješno kreirana!");
    },
    onError: (error: any) => {
      toast.error(error);
    },
  });
};
