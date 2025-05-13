export const isIntervalAtLeastOneDay = (
  startDate: string,
  endDate: string
): boolean => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const oneDayInMillis = 24 * 60 * 60 * 1000;

  return end.getTime() - start.getTime() >= oneDayInMillis;
};
