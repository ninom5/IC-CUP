import { isRegisterDataValid } from "@utils/isRegisterDataValid";
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
  const [idCard, setIdCard] = useState<File[] | null>([]);
  const [driverLicense, setDriverLicense] = useState<File[] | null>([]);

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
