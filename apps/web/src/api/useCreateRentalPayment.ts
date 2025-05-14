import { useMutation } from "@tanstack/react-query";
import { api } from "./base";
import { CreatePayment, CreateRental, RentalResponse } from "types";
import { toast } from "react-toastify";

const createRental = async (
  rentalData: CreateRental
): Promise<RentalResponse> => {
  return await api.post<CreateRental, RentalResponse>("/rental", rentalData);
};

const createPayment = async (paymentData: CreatePayment) => {
  return await api.post<CreatePayment>("/payment", paymentData);
};

export const useCreateRentalPayment = () => {
  const paymentMutation = useMutation({
    mutationFn: createPayment,
  });

  return useMutation({
    mutationFn: createRental,
    onSuccess: (data) => {
      paymentMutation.mutate({
        rentalId: data.id,
        amount: data.totalPrice,
      });

      toast.success("Uspješno rezervirano vozilo i provedeno plaćanje");
    },
  });
};
