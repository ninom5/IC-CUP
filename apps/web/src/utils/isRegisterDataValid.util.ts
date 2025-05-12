import { RegisterDataType } from "types";
import { validateTextFields } from "./validateTextFields.util";

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
  } = fullRegisterData;

  const message = validateTextFields({
    "first name": firstName,
    "last name": lastName,
    " email": email,
    " password": password,
    "confirm password": confirmPassword,
    "phone number": phoneNumber,
    " address": address,
  });
  if (message) return message;

  if (!dateOfBirth) return "You must pick a date of birth";

  if (dateOfBirth > new Date().toISOString().split("T")[0])
    return "Date of birth can not be in the future";
  if (
    new Date(dateOfBirth).getTime() >
    new Date().getTime() - 18 * 365 * 24 * 60 * 60 * 1000
  )
    return "You must be at least 18 years old to register";

  if (password !== confirmPassword) return "Passwords must match";

  return null;
};
