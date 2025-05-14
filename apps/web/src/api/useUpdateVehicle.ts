import { useMutation } from "@tanstack/react-query";
import { api } from "./base";
import { toast } from "react-toastify";
import { VehicleData } from "../types/index";

const updateVehicle = async ({
  id,
  data,
}: {
  id: string;
  data: Partial<VehicleData>;
}) => {
  const response = await api.patch(`/vehicle/${id}`, data);
  return response;
};

export const useUpdateVehicle = () => {
  return useMutation({
    mutationFn: updateVehicle,
    onSuccess: () => {
      toast.success("Vozilo je uspješno ažurirano!");
    },
    onError: (error: any) => {
      toast.error(error);
    },
  });
};
