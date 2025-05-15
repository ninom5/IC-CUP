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

  const phonePattern = /^\+?[0-9\s\-]{7,15}$/;

  const message = validateTextFields({
    Ime: firstName,
    Prezime: lastName,
    " email": email,
    " lozinka": password,
    "potvrdi lozinku": confirmPassword,
    "broj mobitela": phoneNumber,
    " adresa": address,
  });
  if (message) return message;

  if (password !== confirmPassword) return "Lozinke se ne podudaraju";

  if (!dateOfBirth) return "Morate unijeti datum rođenja";

  if (!phonePattern.test(phoneNumber.trim()))
    return "Unesite validan broj mobitela";

  if (dateOfBirth > new Date().toISOString().split("T")[0])
    return "Datum rođenja ne može biti u budućnosti";

  if (
    new Date(dateOfBirth).getTime() >
    new Date().getTime() - 18 * 365 * 24 * 60 * 60 * 1000
  )
    return "Morate imati bar 18 godina za registrirati se";

  return null;
};
