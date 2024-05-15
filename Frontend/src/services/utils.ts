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
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero based
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}
