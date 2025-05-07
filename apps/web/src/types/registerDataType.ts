export type RegisterDataType = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  address: string;
  personPhoto: File | null;
  idCard: File[] | null;
  driverLicense: File[] | null;
};
