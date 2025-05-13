export const getMinDate = (days: number) => {
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + days);
  return minDate.toISOString().split("T")[0];
};
