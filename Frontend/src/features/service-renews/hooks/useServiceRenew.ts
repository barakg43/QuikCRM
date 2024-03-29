import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ServiceRenewRecord } from "../serviceRenews";
import { getAllServiceRenewForPeriodTime } from "../../../services/apiServiceRenew";

type useServiceRemindersReturnType = {
  serviceReminderList: ServiceRenewRecord[] | [];
  isLoading: boolean;
  error: Error | null;
};
export function useServiceReminders({
  daysBeforeExpiration,
  monthsAfterExpiration,
}: {
  daysBeforeExpiration: number;
  monthsAfterExpiration: number;
}): useServiceRemindersReturnType {
  const {
    data: serviceReminderList = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["service-renews", daysBeforeExpiration, monthsAfterExpiration],
    queryFn: () =>
      getAllServiceRenewForPeriodTime({
        daysBeforeExpiration,
        monthsAfterExpiration,
      }),
  });
  if (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.status);
      console.error(error.response);
    }
  }
  return { serviceReminderList, isLoading, error };
}
