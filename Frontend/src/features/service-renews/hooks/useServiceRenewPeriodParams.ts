import { useSearchParams } from "react-router-dom";

export function useServiceRenewPeriodParams() {
  const [searchParams] = useSearchParams();
  const daysBeforeExpiration =
    Number(searchParams.get("daysBeforeExpiration")) || 15;
  const monthsAfterExpiration =
    Number(searchParams.get("monthsAfterExpiration")) || 4;

  return { daysBeforeExpiration, monthsAfterExpiration };
}
