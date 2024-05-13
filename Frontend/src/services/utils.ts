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
  return date.toISOString().substring(0, 10);
}
