import { axiosInstanceAPI } from "@api/base";
import { useEffect, useState } from "react";

export const useUploadImages = (file: File | null) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  const axiosInstance = axiosInstanceAPI();
  useEffect(() => {
    const uploadImages = async () => {
      if (!file) return;
      setIsLoading(true);

      try {
        const formData = new FormData();
        formData.append("file", file);
        console.log("FormData:", formData.get("file"));
        for (let [key, value] of formData.entries()) {
          console.log(key, value);
        }

        const response = await axiosInstance.post(
          "/cloudinary/upload",
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

    uploadImages();
  }, [file]);

  return { data, error, isLoading };
};
