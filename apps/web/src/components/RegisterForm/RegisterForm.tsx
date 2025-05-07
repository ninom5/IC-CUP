import { useUploadFiles } from "@api/index";
import { generatePDF } from "@utils/generatePdf";
import { isRegisterDataValid } from "@utils/isRegisterDataValid";
import { AxiosError } from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

export const RegisterForm = () => {
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    address: "",
  });
  const [personPhoto, setPersonPhoto] = useState<File | null>(null);
  const [idCard, setIdCard] = useState<File[]>([]);
  const [driverLicense, setDriverLicense] = useState<File[]>([]);
  // const [driverPdf, setDriverPdf] = useState<Blob | null>(null);
  // const [idCardPdf, setIdCardPdf] = useState<Blob | null>(null);

  const handlePersonPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? e.target.files[0] : null;
    if (!files) return;

    setPersonPhoto(files);
  };

  const handleIdCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const images = Array.from(e.target.files || []);
    if (images.length > 2) {
      toast.error("You can only upload 2 images for ID card.");
      return;
    }

    setIdCard(images);
  };

  const handleDriverLicenseChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const images = Array.from(e.target.files || []);
    if (images.length > 2) {
      toast.error("You can only upload 2 images for Driver License card.");
      return;
    }

    setDriverLicense(images);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fullRegisterData = {
      ...registerData,
      personPhoto,
      idCard,
      driverLicense,
    };

    const isValidMessage = isRegisterDataValid(fullRegisterData);
    if (isValidMessage) {
      toast.error(isValidMessage);
      return;
    }

    const licensePdf = await generatePDF(driverLicense[0], driverLicense[1]);
    const idPdf = await generatePDF(idCard[0], idCard[1]);

    if (licensePdf && idPdf) {
      // setDriverPdf(licensePdf);
      // setIdCardPdf(idPdf);

      const idFile = new File([idPdf], "idCard.pdf", {
        type: "application/pdf",
        lastModified: Date.now(),
      });

      const driverFile = new File([licensePdf], "license.pdf", {
        type: "application/pdf",
        lastModified: Date.now(),
      });

      const { data, error, isLoading } = useUploadFiles(
        [idFile, driverFile],
        "raw"
      );

      if (isLoading) toast.loading("Uploading files...");
      if (error) {
        toast.error(
          `Error uploading files: ${(error as AxiosError).response?.data}`
        );
        return;
      }

      if (!data) {
        toast.error("Response data is empty");
        return;
      }

      if (!Array.isArray(data)) {
        toast.error("Response data is not in expected format");
        return;
      }

      const pdfUrls = data.map((file: any) => file.secure_url);

      if (pdfUrls.length === 2) toast.success("Files uploaded successfully");
      else {
        toast.error("Error uploading both files");
        return;
      }
    }
  };

  return (
    <section>
      <h1>Register form</h1>

      <form onSubmit={handleSubmit}>
        <input
          id="firstName"
          name="firstName"
          value={registerData.firstName}
          onChange={handleChange}
          type="text"
          placeholder="first name"
        />
        <input
          id="lastName"
          name="lastName"
          value={registerData.lastName}
          onChange={handleChange}
          type="text"
          placeholder="last name"
        />
        <input
          id="dateOfBirth"
          name="dateOfBirth"
          value={registerData.dateOfBirth}
          onChange={handleChange}
          type="date"
        />
        <input
          id="email"
          name="email"
          value={registerData.email}
          onChange={handleChange}
          type="email"
          placeholder="email"
        />
        <input
          id="password"
          name="password"
          value={registerData.password}
          onChange={handleChange}
          type="password"
          placeholder="password"
        />
        <input
          id="confirmPassword"
          name="confirmPassword"
          value={registerData.confirmPassword}
          onChange={handleChange}
          type="password"
          placeholder="confirm password"
        />
        <input
          id="phoneNumber"
          name="phoneNumber"
          value={registerData.phoneNumber}
          onChange={handleChange}
          type="text"
          placeholder=""
        />
        <input
          id="address"
          name="address"
          value={registerData.address}
          onChange={handleChange}
          type="text"
          placeholder="address"
        />

        <label htmlFor="personPhoto">Person Photo</label>
        <input
          type="image"
          id="personPhoto"
          name="personPhoto"
          onChange={handlePersonPhotoChange}
        />

        <label htmlFor="driverLicense">Driver License</label>
        <input
          type="image"
          id="driverLicense"
          name="driverLicense"
          multiple
          onChange={handleDriverLicenseChange}
        />

        <label htmlFor="idCard"></label>
        <input
          type="image"
          id="idCard"
          name="idCard"
          multiple
          onChange={handleIdCardChange}
        />

        <button type="submit">Submit</button>
      </form>
    </section>
  );
};
