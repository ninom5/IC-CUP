import { axiosInstanceAPI } from "@api/index";
import { CloudinaryFileResponseType } from "types/cloudinaryTypes";
import { useEffect, useState } from "react";

export const useUploadFiles = (
  file: File | File[],
  type: "image" | "raw" = "image"
) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<
    CloudinaryFileResponseType | CloudinaryFileResponseType[] | null
  >(null);

  const axiosInstance = axiosInstanceAPI();
  useEffect(() => {
    const uploadFiles = async () => {
      if (!file) return;
      setIsLoading(true);

      try {
        const formData = new FormData();

        if (Array.isArray(file)) {
          formData.append("idPdf", file[0]);
          formData.append("driverPdf", file[1]);
          console.log("idPdf: ", formData.get("idPdf"));
          console.log("driverPdf: ", formData.get("driverPdf"));
        } else {
          formData.append("file", file);

          console.log("FormData:", formData.get("file"));
        }
        for (let [key, value] of formData.entries()) {
          console.log(key, value);
        }

        const response = await axiosInstance.post(
          `/cloudinary/upload/${type}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.status !== 201) throw new Error();

        setData(response.data);
      } catch (error: any | Error) {
        console.error("Error uploading images:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    uploadFiles();
  }, [file]);

  return { data, error, isLoading };
};
