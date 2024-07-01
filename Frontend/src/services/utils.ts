export function calculateForwardDateByMonthsAndDays({
  startDate,
  months = 0,
  days = 0,
}: {
  startDate: Date;
  months?: number;
  days?: number;
}): Date {
  const forwardDate = new Date(startDate);
  forwardDate.setDate(forwardDate.getDate() + days - 1);
  forwardDate.setMonth(forwardDate.getMonth() + months);
  return forwardDate;
}
export function getStringDate(date: Date) {
  const localDate = new Date(date);
  const day = String(localDate.getDate()).padStart(2, "0");
  const month = String(localDate.getMonth() + 1).padStart(2, "0"); // Months are zero based
  const year = localDate.getFullYear();
  return `${day}/${month}/${year}`;
}
export const getPagesAmount = (
  totalItemsAmount: number,
  itemsPerPage: number
) => Math.ceil(totalItemsAmount / itemsPerPage);
