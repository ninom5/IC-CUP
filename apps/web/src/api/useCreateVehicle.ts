import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { VehicleData } from "../types";
import { api } from "./base";
import { toast } from "react-toastify";
import { uploadFiles } from "./useUploadImages";

const createVehicle = async (vehicleData: VehicleData) => {
  let newVehicleData = {};
  if (
    vehicleData.vehicleLicenseImg &&
    vehicleData.images &&
    vehicleData.images.length > 0
  ) {
    const licenseImgUrl = await uploadFiles(vehicleData.vehicleLicenseImg);

    const imageUrls = await Promise.all(
      vehicleData.images.map((image) => uploadFiles(image))
    );

    newVehicleData = {
      ...vehicleData,
      vehicleLicenseImg: licenseImgUrl?.secure_url,
      images: imageUrls.map((iu) => iu?.secure_url),
    };
  }

  console.log(newVehicleData);

  const response = await api.post(`/vehicle`, newVehicleData);
  return response.data;
};

export const useCreateVehicle = (): UseMutationResult<
  any,
  Error,
  VehicleData
> => {
  return useMutation({
    mutationFn: createVehicle,
    onSuccess: () => {
      toast.success("Vozilo uspješno dodano!");
    },
    onError: (error) => {
      console.error("Error creating vehicle:", error);
      toast.error(
        "Greška prilikom dodavanja vozila. Molimo pokušajte ponovno."
      );
    },
  });
};
