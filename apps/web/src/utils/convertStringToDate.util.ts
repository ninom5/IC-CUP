export const convertStringToDate = (string: string) => {
  return new Date(string).toISOString().split("T")[0];
};
