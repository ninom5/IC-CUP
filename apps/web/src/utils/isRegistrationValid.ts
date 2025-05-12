export const isRegistrationValid = (plate: string): boolean => {
  const regex = /^[A-ZČĆŽŠĐ]{2}-\d{3,4}-[A-ZČĆŽŠĐ]{2}$/;
  return regex.test(plate.toUpperCase());
};
