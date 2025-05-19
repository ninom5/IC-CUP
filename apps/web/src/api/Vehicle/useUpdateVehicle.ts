import { useMutation } from "@tanstack/react-query";
import { api } from "@api/index";
import { toast } from "react-toastify";
import { CloudinaryFileResponseType, VehicleData } from "types";
import { uploadFiles } from "@api/index";

const updateVehicle = async ({
  id,
  data,
}: {
  id: string;
  data: Partial<VehicleData>;
}) => {
  if (data.vehicleLicenseImg) {
    const vehicleLicenseImgURL: CloudinaryFileResponseType | null =
      await uploadFiles(data.vehicleLicenseImg);

    if (vehicleLicenseImgURL) {
      const newData = {
        ...data,
        vehicleLicenseImg: vehicleLicenseImgURL.secure_url,
      };

      const response = await api.patch(`/vehicle/${id}`, newData);
      return response;
    }
  }

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
