import { isRegisterDataValid, generatePDF } from "@utils/index";
import { routes } from "@routes/routes";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useRegister,
  useUploadFiles,
  getUserByEmail,
  useUploadImages,
} from "@api/index";

export const RegisterForm = () => {
  const { mutate: register } = useRegister();
  const { mutateAsync: uploadImages } = useUploadImages();
  const { mutateAsync: uploadFiles } = useUploadFiles();

  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    address: "",
    personPhoto: "",
    driverLicense: "",
    idCard: "",
  });

  const [personPhotoFile, setPersonPhotoFile] = useState<File | null>(null);
  const [idCardFile, setIdCardFile] = useState<File[]>([]);
  const [driverLicenseFile, setDriverLicenseFile] = useState<File[]>([]);
  const [pdfFiles, setPdfFiles] = useState<string[]>([]);

  const navigate = useNavigate();

  const handlePersonPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (!file) return;

    setPersonPhotoFile(file);
  };

  const handleIdCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const images = Array.from(e.target.files || []);
    if (images.length > 2) {
      toast.error("You can only upload 2 images for ID card.");
      return;
    }

    setIdCardFile(images);
  };

  const handleDriverLicenseChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const images = Array.from(e.target.files || []);
    if (images.length > 2) {
      toast.error("You can only upload 2 images for Driver License card.");
      return;
    }

    setDriverLicenseFile(images);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!personPhotoFile) {
      toast.error("You must upload your photo");
      return;
    }

    if (!driverLicenseFile || driverLicenseFile.length !== 2) {
      toast.error("You must upload front and back side of driver license");
      return;
    }

    if (!idCardFile || idCardFile.length !== 2) {
      toast.error("You must upload front and back side of id card");
      return;
    }

    const isValidMessage = isRegisterDataValid(registerData);
    if (isValidMessage) {
      toast.error(isValidMessage);
      return;
    }

    const user = await getUserByEmail(registerData.email);
    if (user) {
      toast.error("User with provided email already exists");
      return;
    }

    const licensePdf = await generatePDF(
      driverLicenseFile[0],
      driverLicenseFile[1]
    );
    const idPdf = await generatePDF(idCardFile[0], idCardFile[1]);

    if (licensePdf && idPdf) {
      const idFile = new File([idPdf], "idCard.pdf", {
        type: "application/pdf",
        lastModified: Date.now(),
      });

      const driverFile = new File([licensePdf], "license.pdf", {
        type: "application/pdf",
        lastModified: Date.now(),
      });

      const response = await uploadFiles([idFile, driverFile]);
      console.log(response);
      if (!response) {
        toast.error("Response data is empty");
        return;
      }

      const pdfUrls = Object.values(response).map(
        (value: any) => value.secure_url
      );

      setPdfFiles(pdfUrls);

      if (pdfUrls.length !== 2) {
        toast.error("Error uploading both files");
        return;
      }

      toast.success("Files uploaded successfully");
    }

    const personPhotoResponse = await uploadImages(personPhotoFile);

    if (!personPhotoResponse) {
      toast.error("Response link is empty");
      return;
    }
    if (Array.isArray(personPhotoResponse)) {
      toast.error("Unexpected person photo cloudinary response");
      return;
    }

    const personPhotoLink = personPhotoResponse.secure_url;

    setRegisterData((prev) => ({
      ...prev,
      idCard: pdfFiles[0],
      driverLicense: pdfFiles[1],
      personPhoto: personPhotoLink,
    }));

    const updatedRegisterData = {
      ...registerData,
      idCard: pdfFiles[0],
      driverLicense: pdfFiles[1],
      personPhoto: personPhotoLink,
    };

    try {
      register(updatedRegisterData, {
        onSuccess: () => {
          toast.success("Successfully registered. Now you can login.");

          setRegisterData({
            firstName: "",
            lastName: "",
            dateOfBirth: "",
            email: "",
            password: "",
            confirmPassword: "",
            phoneNumber: "",
            address: "",
            personPhoto: "",
            driverLicense: "",
            idCard: "",
          });

          navigate(routes.LOGIN);
        },
        onError: (error) => {
          toast.error(error.message || "Registration failed");
        },
      });
    } catch (error: Error | any) {
      console.error(`Error registering: ${error}`);
      toast.error(`Error while registering: ${error?.response?.data?.message}`);
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
          type="file"
          id="personPhoto"
          name="personPhoto"
          onChange={handlePersonPhotoChange}
        />

        <label htmlFor="driverLicense">Driver License</label>
        <input
          type="file"
          id="driverLicense"
          name="driverLicense"
          multiple
          onChange={handleDriverLicenseChange}
        />

        <label htmlFor="idCard"></label>
        <input
          type="file"
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
