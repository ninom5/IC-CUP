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

  if (password !== confirmPassword) return "Lozinke se ne podudaraju";

  if (!dateOfBirth) return "Morate unijeti datum rođenja";

  if (dateOfBirth > new Date().toISOString().split("T")[0])
    return "Date of birth can not be in the future";

  if (
    new Date(dateOfBirth).getTime() >
    new Date().getTime() - 18 * 365 * 24 * 60 * 60 * 1000
  )
    return "Morate imati bar 18 godina za registrirati se";

  return null;
};
