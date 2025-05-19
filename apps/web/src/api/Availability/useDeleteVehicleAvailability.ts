import { useMutation } from "@tanstack/react-query";
import { api } from "@api/index";
import { toast } from "react-toastify";

const deleteVehicleAvailability = async (availabilityId: string) => {
  const response = await api.delete(`/vehicle-availability/${availabilityId}`);
  return response;
};

export const useDeleteVehicleAvailability = () => {
  return useMutation({
    mutationFn: deleteVehicleAvailability,
    onSuccess: () => {
      toast.success("Period dostupnosti je uspješno obrisan!");
    },
    onError: (error: any) => {
      "Došlo je do greške prilikom brisanja perioda dostupnosti";
      toast.error(error);
    },
  });
};
