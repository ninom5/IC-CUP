import { useMutation } from "@tanstack/react-query";
import { api } from "./base";
import { CreateRental, RentalResponse } from "types";
import { toast } from "react-toastify";

const createRental = async (
  rentalData: CreateRental
): Promise<RentalResponse> => {
  return await api.post<CreateRental, RentalResponse>("/rental", rentalData);
};

export const useCreateRentalPayment = () => {
  return useMutation({
    mutationFn: createRental,
    onSuccess: () => {
      toast.success("Uspješno rezervirano vozilo i provedeno plaćanje");
    },
  });
};
