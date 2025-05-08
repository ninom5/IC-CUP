import { RegisterDataType } from "types/registerDataType";
import { validateTextFields } from "./validateTextFields";

export const isRegisterDataValid = (fullRegisterData: RegisterDataType) => {
  const {
    firstName,
    lastName,
    dateOfBirth,
    email,
    password,
    confirmPassword,
    phoneNumber,
    address,
    personPhoto,
    idCard,
    driverLicense,
  } = fullRegisterData;

  const message = validateTextFields({
    "first name": firstName,
    "last name": lastName,
    email: email,
    password: password,
    "confirm password": confirmPassword,
    "phone number": phoneNumber,
    address: address,
  });
  if (message) return message;

  if (dateOfBirth > new Date().toISOString().split("T")[0])
    return "Date of birth can not be in the future";
  if (
    new Date(dateOfBirth).getTime() <
    new Date().getTime() - 18 * 365 * 24 * 60 * 60 * 1000
  )
    return "You must be at least 18 years old to register";

  if (personPhoto === null)
    return "Person photo is required and can not be empty";

  if (idCard === null || idCard.length < 2)
    return "ID card is required and you must upload front and back side";

  if (driverLicense === null || driverLicense.length < 2)
    return "Driver license is required and you must upload front and back side";

  return null;
};
