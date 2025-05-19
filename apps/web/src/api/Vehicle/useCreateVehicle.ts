import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { VehicleData } from "../../types";
import { api } from "@api/index";
import { toast } from "react-toastify";
import { uploadFiles } from "../Cloudinary/useUploadImages";

const createVehicle = async (vehicleData: VehicleData) => {
  if (vehicleData.vehicleLicenseImg && vehicleData.images?.length) {
    try {
      const licenseImgUrl = await uploadFiles(vehicleData.vehicleLicenseImg);
      if (!licenseImgUrl?.secure_url) {
        throw new Error("Neuspješan upload licence vozila");
      }

      const imageUrls = await Promise.all(
        vehicleData.images.map((image) => uploadFiles(image))
      );

      if (imageUrls.some((img) => !img?.secure_url)) {
        throw new Error("Neuspješan upload jedne ili više slika vozila");
      }

      const newVehicleData = {
        ...vehicleData,
        vehicleLicenseImg: licenseImgUrl.secure_url,
        images: imageUrls.map((img) => img?.secure_url),
      };

      const response = await api.post(`/vehicle`, newVehicleData);
      return response.data;
    } catch (error) {
      console.error("Error uploading images:", error);
      throw new Error(
        "Greška prilikom uploada slika. Molimo pokušajte ponovno."
      );
    }
  }

  const response = await api.post(`/vehicle`, vehicleData);
  return response.data;
};

export const useCreateVehicle = (
  navigate: (to: string) => void
): UseMutationResult<any, Error, VehicleData> => {
  return useMutation({
    mutationFn: createVehicle,
    onSuccess: () => {
      toast.success("Vozilo uspješno dodano!");
      navigate("/user/vehicle");
    },
    onError: (error) => {
      console.error("Error creating vehicle:", error);
      toast.error(
        "Greška prilikom dodavanja vozila. Molimo pokušajte ponovno."
      );
    },
  });
};
